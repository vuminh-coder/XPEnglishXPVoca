"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Bookmark, X } from "lucide-react";
import { WordLookupData } from "../types";

interface WordLookupModalProps {
  wordData: WordLookupData | null;
  onClose: () => void;
  onSpeak: (word: string) => void;
  onSaveWord: () => void;
}

export function WordLookupModal({
  wordData,
  onClose,
  onSpeak,
  onSaveWord,
}: WordLookupModalProps) {
  return (
    <AnimatePresence>
      {wordData && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed right-3 bottom-28 sm:right-6 sm:bottom-6 z-50 w-[275px] xs:w-[290px] sm:w-[310px] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-2 select-none"
        >
          {/* Top Row: Word, Phonetic, Meaning & Action Icons */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <h3 className="text-base font-bold text-[#0059bb] dark:text-sky-400 capitalize font-display leading-tight">
                  {wordData.word}
                </h3>
                {wordData.ipa && (
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                    {wordData.ipa}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                {wordData.meaning}
              </p>
            </div>

            {/* Action Buttons: Nghe, Lưu Sổ Tay (+5 XP), Đóng */}
            <div className="flex items-center gap-1 shrink-0 -mt-0.5">
              <button
                type="button"
                onClick={() => onSpeak(wordData.word)}
                className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/50 text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center transition-colors cursor-pointer active:scale-90 shadow-2xs"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onSaveWord}
                className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center transition-colors cursor-pointer active:scale-90 shadow-2xs"
                title="Lưu vào Sổ tay từ vựng (+5 XP)"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer active:scale-90"
                title="Đóng"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Example row (if available) */}
          {wordData.example && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1.5 border-t border-slate-100 dark:border-slate-800 line-clamp-2">
              {wordData.example}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
