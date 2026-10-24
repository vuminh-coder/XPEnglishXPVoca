"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { PracticeWord } from "../types";

interface PracticeWordLabDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentWord: PracticeWord;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (text: string) => void;
}

export function PracticeWordLabDrawer({
  isOpen,
  onClose,
  currentWord,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
}: PracticeWordLabDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-50 w-full max-w-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 overflow-hidden flex flex-col gap-4 max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/40">
                  <BookOpen className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black font-display text-slate-900 dark:text-white leading-tight">
                    Thông Tin & Ngữ Cảnh Từ Vựng
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Sổ tay ghi nhớ sâu ngữ nghĩa & phản xạ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={onToggleBookmark}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
                    isCurrentBookmarked
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0059bb]"
                  }`}
                  title={isCurrentBookmarked ? "Bỏ lưu từ" : "Lưu vào Sổ tay từ vựng (+5 XP)"}
                >
                  {isCurrentBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  <span>{isCurrentBookmarked ? "Đã lưu" : "Lưu từ"}</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-95"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Word Profile Card */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white capitalize">
                    {currentWord.word}
                  </h2>
                  <button
                    type="button"
                    onClick={() => onPlayAudio(currentWord.word)}
                    className="p-1 rounded-full text-[#0059bb] hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-transform active:scale-90 cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {currentWord.type && (
                    <span className="px-2 py-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                      {currentWord.type}
                    </span>
                  )}
                  {currentWord.level && (
                    <span className="px-2 py-0.5 rounded-lg bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-[#0059bb]/20">
                      {currentWord.level}
                    </span>
                  )}
                </div>
              </div>

              {currentWord.ipa && (
                <p className="text-sm font-mono text-slate-600 dark:text-slate-400 font-bold">
                  {currentWord.ipa}
                </p>
              )}

              <div className="pt-1 border-t border-blue-200/40 dark:border-blue-900/30">
                <p className="text-base font-bold text-[#0059bb] dark:text-sky-300 leading-snug">
                  {currentWord.meaning}
                </p>
              </div>
            </div>

            {/* Context Example */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>Ví dụ ngữ cảnh thực tế</span>
                {currentWord.topic && (
                  <span className="text-[#0059bb] dark:text-sky-400">
                    Chủ đề: {currentWord.topic}
                  </span>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                    "{currentWord.example || "She used the new vocabulary in a clear sentence."}"
                  </p>
                  <button
                    type="button"
                    onClick={() => onPlayAudio(currentWord.example || currentWord.word)}
                    className="p-1 text-slate-400 hover:text-[#0059bb] transition-colors shrink-0 cursor-pointer active:scale-95"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                {currentWord.exampleVi && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentWord.exampleVi}
                  </p>
                )}
              </div>
            </div>

            {/* Spaced Repetition SRS Tip */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 dark:bg-amber-950/30 dark:border-amber-900/40 flex items-start gap-2.5 text-xs">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                Ôn tập lại từ vựng theo chu kỳ <strong>1 ngày, 3 ngày, 7 ngày</strong> để khắc sâu vào bộ nhớ vĩnh viễn!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
