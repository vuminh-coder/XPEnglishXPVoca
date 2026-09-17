"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Trophy,
  Sparkles,
  Target,
  CheckCircle,
  RotateCcw,
  Mic,
  Brain,
  ChevronRight,
} from "lucide-react";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import type { ListeningLesson } from "@/features/listening/utils/listeningParser";

export interface ListeningCompletionScreenProps {
  currentLesson: ListeningLesson;
  lessonsList: ListeningLesson[];
  totalSentencesCount: number;
  elapsedTime: number;
  onRestart: () => void;
  onNextLesson?: (nextLessonId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onBackToListing: () => void;
  onOpenQuiz?: () => void;
  formatElapsedTime: (sec: number) => string;
  formatLevelBadge: (lvl?: string) => string;
}

export const ListeningCompletionScreen: React.FC<ListeningCompletionScreenProps> = ({
  currentLesson,
  lessonsList,
  totalSentencesCount,
  elapsedTime,
  onRestart,
  onNextLesson,
  onSelectLesson,
  onBackToListing,
  onOpenQuiz,
  formatElapsedTime,
  formatLevelBadge,
}) => {
  const currentLessonIndex = lessonsList.findIndex((l) => l.id === currentLesson.id);
  const hasNextLesson =
    currentLessonIndex >= 0 && currentLessonIndex + 1 < lessonsList.length;
  const nextLesson = hasNextLesson ? lessonsList[currentLessonIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full min-h-[calc(100vh-60px)] flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-sans"
    >
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBackToListing}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs">
            {formatLevelBadge(currentLesson.level)}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate max-w-xl">
            {currentLesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold font-mono flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatElapsedTime(elapsedTime)}</span>
          </span>
        </div>
      </div>

      {/* 2. Center-Stage Hero Celebration Card */}
      <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

        {/* Trophy with Radiant Aura */}
        <div className="relative mb-3.5 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 ring-8 ring-amber-500/10">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
          </div>
          <span className="absolute -top-1 -right-1 text-2xl select-none">✨</span>
        </div>

        {/* Celebration Title & Description */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          🎉 Chúc Mừng! Bạn Đã Hoàn Thành Bài Nghe!
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 max-w-md">
          Bạn đã nghe và gõ chính xác toàn bộ các câu trong bài học này.
        </p>

        {/* 4 Bento Metric Cards (Rule 8 Wadhah Aloui) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-6">
          {/* Metric 1: XP Reward */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-amber-500 dark:text-amber-400 tabular-nums">
              +50 XP
            </span>
            <span className="text-[11.5px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 mt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thưởng kinh nghiệm</span>
            </span>
          </div>

          {/* Metric 2: Accuracy */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              100%
            </span>
            <span className="text-[11.5px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 mt-1">
              <Target className="w-3.5 h-3.5" />
              <span>Độ chính xác</span>
            </span>
          </div>

          {/* Metric 3: Sentences Count */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/40 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#0059bb] dark:text-sky-400 tabular-nums">
              {totalSentencesCount}/{totalSentencesCount}
            </span>
            <span className="text-[11.5px] font-bold text-blue-700 dark:text-sky-300 flex items-center gap-1 mt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Câu chép đúng</span>
            </span>
          </div>

          {/* Metric 4: Total Elapsed Time */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-slate-800 dark:text-slate-100 tabular-nums">
              {formatElapsedTime(elapsedTime)}
            </span>
            <span className="text-[11.5px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời gian hoàn thành</span>
            </span>
          </div>
        </div>

        {/* Action Buttons (Strict Rule 18 & 20 Hierarchy) */}
        <div className="flex items-center justify-center gap-3 pt-6 flex-wrap w-full">
          <button
            type="button"
            onClick={onRestart}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Luyện lại bài này</span>
          </button>

          <Link href={`/study/shadowing?lessonId=${currentLesson.id}`}>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Mic className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
              <span>Luyện Shadowing AI</span>
            </button>
          </Link>

          {currentLesson.quizzes && currentLesson.quizzes.length > 0 && onOpenQuiz && (
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Brain className="w-4 h-4 text-purple-600" />
              <span>Làm Quiz ({currentLesson.quizzes.length} câu)</span>
            </button>
          )}

          {nextLesson && onNextLesson && (
            <button
              type="button"
              onClick={() => onNextLesson(nextLesson.id)}
              className="px-6 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>Bài học tiếp theo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Bottom Section: Next Recommended Lessons Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Bài học đề xuất tiếp theo cho bạn:</span>
          </div>
          <button
            type="button"
            onClick={onBackToListing}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả danh mục</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          {lessonsList
            .filter((l) => l.id !== currentLesson.id)
            .slice(0, 3)
            .map((recLesson) => (
              <motion.div
                key={recLesson.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectLesson(recLesson.id)}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 dark:hover:border-sky-500/70 transition-all cursor-pointer shadow-2xs hover:shadow-md group flex gap-3.5 items-center relative overflow-hidden"
              >
                <div className="w-[96px] h-[70px] shrink-0 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                  <LessonCoverImage
                    lesson={recLesson}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    showBadge={false}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-slate-900/90 text-white backdrop-blur-xs z-10 shadow-2xs border border-white/15">
                    {formatLevelBadge(recLesson.level)}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 truncate">
                    {recLesson.category || "Giao tiếp"}
                  </span>
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-1 leading-snug">
                    {recLesson.title}
                  </h4>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{recLesson.duration || "3:00"}</span>
                    </span>
                    <div className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold text-[11px] flex items-center gap-1 group-hover:bg-[#0059bb] group-hover:text-white transition-all shadow-2xs">
                      <span>Học</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
