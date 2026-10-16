"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Loader2, Volume2 } from "lucide-react";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { FormattedAiText } from "@/shared/components/FormattedAiText";

interface DashboardAiTutorWidgetProps {
  aiQuestion: string;
  setAiQuestion: (q: string) => void;
  isAiLoading: boolean;
  aiAnswer: string | null;
  handleQuickAskSubmit: (e: React.FormEvent) => Promise<void>;
}

export function DashboardAiTutorWidget({
  aiQuestion,
  setAiQuestion,
  isAiLoading,
  aiAnswer,
  handleQuickAskSubmit,
}: DashboardAiTutorWidgetProps) {
  const hasActiveResponse = Boolean(aiAnswer || isAiLoading);

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3 transition-all duration-300 ${
        hasActiveResponse
          ? "lg:flex-1 lg:min-h-[300px] flex flex-col justify-between"
          : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Hỏi Đáp Nhanh Cùng AI Tutor
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 font-mono">
          +10 XP / câu hỏi
        </span>
      </div>

      {/* Form Input */}
      <form onSubmit={handleQuickAskSubmit} className="space-y-2 shrink-0">
        <label
          htmlFor="ai-prompt-input"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 block"
        >
          Đặt câu hỏi từ vựng, ngữ pháp hoặc dịch thuật:
        </label>
        <div className="flex gap-2">
          <input
            id="ai-prompt-input"
            type="text"
            className="flex-1 h-10 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#0059bb] transition-all placeholder:text-slate-400"
            placeholder="VD: Phân biệt 'affect' và 'effect' khi viết essay?"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
          />
          <button
            type="submit"
            disabled={isAiLoading || !aiQuestion.trim()}
            className="h-10 px-4 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer disabled:opacity-40 transition-all active:scale-95"
          >
            {isAiLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi câu hỏi</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading & Answer Area: Tự động kéo dài xuống đúng đáy của khối nhiệm vụ */}
      <AnimatePresence>
        {isAiLoading && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 space-y-2.5 shadow-inner flex-1 flex flex-col justify-center min-h-[160px]"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#0059bb] dark:text-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                AI Tutor đang tư duy & giải nghĩa...
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="h-3.5 w-4/5 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="h-3.5 w-2/3 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
          </motion.div>
        )}

        {aiAnswer && !isAiLoading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed shadow-inner flex-1 min-h-[180px] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 pb-2 shrink-0">
              <span className="font-extrabold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 text-xs font-display">
                <Bot className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span>Phản hồi từ AI Tutor</span>
              </span>
              <button
                type="button"
                onClick={() => speakLessonText(aiAnswer, { rate: 1.0 })}
                className="px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                title="Nghe phát âm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe</span>
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 pt-2 space-y-1">
              <FormattedAiText content={aiAnswer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
