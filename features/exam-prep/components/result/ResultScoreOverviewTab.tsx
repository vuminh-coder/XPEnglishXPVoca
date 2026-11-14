import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { ExamResultSummary } from "@/features/exam-prep/utils/examScoringEngine";

export interface ResultScoreOverviewTabProps {
  examResult: ExamResultSummary;
  formatTime: (sec: number) => string;
  onNavigateToReview: (partNumber?: number) => void;
}

export function ResultScoreOverviewTab({
  examResult,
  formatTime,
  onNavigateToReview,
}: ResultScoreOverviewTabProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Radial Meter Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-950 text-white shadow-lg relative overflow-hidden border border-blue-400/20"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          {/* Left: Score Gauge */}
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            {/* SVG Radial Gauge */}
            <div className="relative w-[92px] h-[92px] sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/15"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={
                    264 - (264 * (examResult.accuracyPercent || 1)) / 100
                  }
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs sm:text-sm font-black font-sans text-amber-300">
                  {examResult.accuracyPercent}%
                </span>
                <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-blue-200 font-bold">
                  Độ chuẩn
                </span>
              </div>
            </div>

            {/* Score Numbers */}
            <div className="space-y-1 min-w-0 flex-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
                KẾT QUẢ QUY ĐỔI CHÍNH THỨC
              </span>
              <div className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                {examResult.scaledScore}{" "}
                <span className="text-sm sm:text-lg text-blue-200 font-semibold font-sans">
                  / {examResult.maxScore}
                </span>
              </div>
              <p className="text-[10.5px] sm:text-[11px] text-blue-100/90 font-medium truncate font-sans">
                Trả lời đúng{" "}
                <span className="font-bold text-white font-mono">
                  {examResult.correctCount}/{examResult.totalQuestions}
                </span>{" "}
                câu
                <span className="hidden sm:inline">
                  {" "}• Làm bài trong{" "}
                  <span className="font-bold text-white font-mono">
                    {formatTime(examResult.timeSpentSeconds)}
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Subtle Separator on Mobile */}
          <div className="w-full h-px bg-white/10 md:hidden" />

          {/* Right Sub-Skills Glass Cards & Rewards */}
          <div className="flex flex-col gap-2 sm:gap-2.5 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
              {examResult.listeningScore !== undefined && (
                <div className="md:w-44 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-sky-300" strokeWidth={1.8} />
                    <span className="font-bold text-white">Listening</span>
                  </div>
                  <span className="font-sans font-black text-sky-200 text-xs font-mono">
                    {examResult.listeningScore}{" "}
                    {examResult.examType.includes("IELTS") ? "/ 9.0" : "/ 495"}
                  </span>
                </div>
              )}
              {examResult.readingScore !== undefined && (
                <div className="md:w-44 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-300" strokeWidth={1.8} />
                    <span className="font-bold text-white">Reading</span>
                  </div>
                  <span className="font-sans font-black text-emerald-200 text-xs font-mono">
                    {examResult.readingScore}{" "}
                    {examResult.examType.includes("IELTS") ? "/ 9.0" : "/ 495"}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
              <div className="flex-1 md:w-44 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black flex items-center justify-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                {examResult.xpAwarded} XP Thưởng
              </div>
              <div className="flex-1 md:w-44 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black flex items-center justify-center gap-1.5 font-mono">
                <Award className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                {examResult.coinsAwarded} Vàng Thưởng
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Double-Bezel Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Câu Làm Đúng
            </span>
            <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {examResult.correctCount}{" "}
              <span className="text-xs text-slate-400 font-normal font-sans">
                / {examResult.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <XCircle className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Câu Làm Sai
            </span>
            <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-mono">
              {examResult.incorrectCount}{" "}
              <span className="text-xs text-slate-400 font-normal font-sans">
                câu
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Câu Bỏ Qua
            </span>
            <div className="text-sm sm:text-base font-black text-slate-700 dark:text-slate-300 font-mono">
              {examResult.skippedCount}{" "}
              <span className="text-xs text-slate-400 font-normal font-sans">
                câu
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Tốc Độ Trung Bình
            </span>
            <div className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-400 font-mono">
              {examResult.avgTimePerQuestion}s{" "}
              <span className="text-xs text-slate-400 font-normal font-sans">
                / câu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Part Analysis Breakdown Cards */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
          <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0059bb] dark:text-sky-400" strokeWidth={2} />
            <span>Phân Tích Độ Chính Xác Theo Từng Part</span>
          </h3>
        </div>

        <div className="space-y-2 pt-1">
          {examResult.partAnalysis.map((part) => (
            <div
              key={part.partNumber}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-white/5 grid grid-cols-1 md:grid-cols-12 items-center gap-3 hover:border-slate-300 dark:hover:border-white/15 transition-all font-sans"
            >
              {/* Column 1: Grade & Title (md:col-span-4) */}
              <div className="md:col-span-4 flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-16 py-0.5 rounded-md text-[10px] font-black font-sans uppercase text-center shrink-0 ${
                    part.grade === "A+" || part.grade === "A"
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : part.grade === "B"
                        ? "bg-blue-500/20 text-[#0059bb] dark:text-sky-400 border border-blue-500/30"
                        : part.grade === "C"
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  }`}
                >
                  Grade {part.grade}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-display">
                  {part.partTitle}
                </span>
              </div>

              {/* Column 2: Progress Bar (md:col-span-5) */}
              <div className="md:col-span-5 w-full">
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      part.accuracyPercent >= 75
                        ? "bg-emerald-500"
                        : part.accuracyPercent >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500"
                    }`}
                    style={{
                      width: `${Math.max(4, part.accuracyPercent)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Column 3: Stats & Button (md:col-span-3) */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 min-w-0">
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  {part.correctCount}/{part.totalQuestions}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateToReview(part.partNumber)}
                  className="px-3 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 text-[11px] font-bold border border-slate-200 dark:border-white/10 shadow-2xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  Xem Part này <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Bottom Action Button */}
      <div className="pt-2 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={() => onNavigateToReview()}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer font-display transition-all active:scale-95 group"
        >
          <span>Chuyển Sang Xem Lời Giải Từng Câu Chi Tiết</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
