"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Play, X, Bot } from "lucide-react";
import { GrammarExercise, GrammarChatMessage, GrammarTopic } from "../../types/grammarTypes";
import { GrammarQuizCard } from "./GrammarQuizCard";
import { GrammarResultReview } from "./GrammarResultReview";
import { GrammarAiCompanion } from "./GrammarAiCompanion";

interface GrammarPracticeStudioProps {
  topic: GrammarTopic;
  exercises: GrammarExercise[];
  currentIndex: number;
  answers: Record<number, string>;
  loading: boolean;
  submitted: boolean;
  onGenerateExercises: () => void;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onReviewTheory: () => void;
  chatMessages: GrammarChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  chatLoading: boolean;
  onSendMessage: (text: string) => void;
  prompts: string[];
}

export function GrammarPracticeStudio({
  topic,
  exercises,
  currentIndex,
  answers,
  loading,
  submitted,
  onGenerateExercises,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit,
  onReviewTheory,
  chatMessages,
  chatInput,
  setChatInput,
  chatLoading,
  onSendMessage,
  prompts,
}: GrammarPracticeStudioProps) {
  const [isMobileAiOpen, setIsMobileAiOpen] = useState(false);
  const currentEx = exercises[currentIndex];
  const allAnswered = exercises.length > 0 && Object.keys(answers).length >= exercises.length;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: AI Practice Studio (8/12) */}
        <div className="lg:col-span-8 space-y-4">
        {loading ? (
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 animate-pulse">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="space-y-2 py-4">
              <div className="h-7 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-5 w-1/2 bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
              <div className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
              <div className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
              <div className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
            </div>
          </div>
        ) : exercises.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                Phòng Luyện Thi Trắc Nghiệm AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Bấm bắt đầu để Gemini AI tự động sinh 5 câu trắc nghiệm chuyên sâu bám sát đề thi thật TOEIC & IELTS cho chuyên đề này.
              </p>
            </div>
            <button
              type="button"
              onClick={onGenerateExercises}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0059bb]/25 font-display inline-flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Bắt Đầu Làm Bài (+15 XP)</span>
            </button>
          </div>
        ) : !submitted && currentEx ? (
          <GrammarQuizCard
            exercise={currentEx}
            currentIndex={currentIndex}
            totalCount={exercises.length}
            topicName={topic.name}
            userAnswer={answers[currentEx.id]}
            onSelectOption={(opt) => onSelectOption(opt)}
            onNext={onNext}
            onPrev={onPrev}
            onSubmit={onSubmit}
            onRegenerate={onGenerateExercises}
            loading={loading}
            isLastQuestion={currentIndex === exercises.length - 1}
            allAnswered={allAnswered}
          />
        ) : (
          <GrammarResultReview
            exercises={exercises}
            answers={answers}
            topicName={topic.name}
            onRetry={onGenerateExercises}
            onReviewTheory={onReviewTheory}
            loading={loading}
          />
        )}
      </div>

      {/* RIGHT COLUMN: AI Tutor Companion (Desktop: 4/12; Mobile: inline at bottom) */}
      <div className="lg:col-span-4">
        <GrammarAiCompanion
          topicName={topic.name}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          chatLoading={chatLoading}
          onSendMessage={onSendMessage}
          prompts={prompts}
        />
      </div>
    </div>

    {/* Mobile Floating AI Tutor Pill (<lg screens) */}
    <div className="lg:hidden fixed bottom-5 right-4 z-40">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileAiOpen(true)}
        className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-purple-600 text-white font-display text-xs font-bold shadow-xl shadow-[#0059bb]/30 flex items-center gap-2 border border-white/20 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current animate-pulse" />
        <span>Hỏi AI Tutor</span>
        {chatMessages.length > 0 && (
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        )}
      </motion.button>
    </div>

    {/* Mobile AI Tutor Drawer Modal (<lg screens) */}
    <AnimatePresence>
      {isMobileAiOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileAiOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-4 max-h-[88vh] flex flex-col shadow-2xl space-y-3"
          >
            {/* Drawer Handle & Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    AI Tutor • {topic.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">Giải đáp ngữ pháp & hỗ trợ bài tập</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileAiOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="overflow-y-auto flex-1">
              <GrammarAiCompanion
                topicName={topic.name}
                chatMessages={chatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                chatLoading={chatLoading}
                onSendMessage={onSendMessage}
                prompts={prompts}
                className="p-0 border-0 shadow-none bg-transparent space-y-3"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
}
