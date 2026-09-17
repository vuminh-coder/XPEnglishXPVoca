"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookMarked, Volume2, BookmarkCheck, X } from "lucide-react";
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
          className="fixed left-3 right-3 bottom-20 sm:left-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-84 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-[#0059bb]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-display">
                Tra Từ Vựng Nhanh
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Word details */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#0059bb] dark:text-sky-400 capitalize font-display">
                {wordData.word}
              </h3>
              <button
                type="button"
                onClick={() => onSpeak(wordData.word)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-sky-950/40 text-[#0059bb] dark:text-sky-300 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-sky-900/50 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe
              </button>
            </div>

            {wordData.ipa && (
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                {wordData.ipa}
              </p>
            )}

            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              {wordData.meaning}
            </p>

            {wordData.example && (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                {wordData.example}
              </p>
            )}
          </div>

          {/* Save to vocab button */}
          <button
            type="button"
            onClick={onSaveWord}
            className="w-full py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all active:scale-95"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Lưu vào Sổ tay từ vựng (+5 XP)</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
