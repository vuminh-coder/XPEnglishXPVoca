"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Volume2, BookmarkPlus, X } from "lucide-react";

export interface WordLookupData {
  word: string;
  phonetic: string;
  pos: string;
  definitionVn: string;
}

export interface WordLookupCardProps {
  wordLookupData: WordLookupData | null;
  onSpeakWord: (word: string) => void;
  onSaveWord: () => void;
  onClose: () => void;
}

export function WordLookupCard({
  wordLookupData,
  onSpeakWord,
  onSaveWord,
  onClose,
}: WordLookupCardProps) {
  return (
    <AnimatePresence>
      {wordLookupData && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          className="sticky top-0 z-10 p-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white shadow-md space-y-1.5 border border-slate-200/90 dark:border-slate-700"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="text-sm font-black tracking-wide font-display text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                <span>{wordLookupData.word}</span>
              </h4>
              <button
                type="button"
                onClick={() => onSpeakWord(wordLookupData.word)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-600 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer transition-all shrink-0"
                title="Phát âm từ này"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onSaveWord}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-400 hover:bg-[#0059bb] hover:text-white border border-blue-200/80 dark:border-blue-800 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer font-sans"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Lưu sổ tay</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
                title="Đóng tra từ"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 shrink-0">
              {wordLookupData.phonetic}
            </span>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              <span className="text-slate-400 dark:text-slate-500 font-bold mr-1">Nghĩa:</span>
              {wordLookupData.definitionVn}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
