"use client";

import React from "react";
import { Sparkles, Loader2, Play } from "lucide-react";
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
  const currentEx = exercises[currentIndex];
  const allAnswered = exercises.length > 0 && Object.keys(answers).length >= exercises.length;

  return (
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

      {/* RIGHT COLUMN: AI Tutor Companion (4/12) */}
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
  );
}
