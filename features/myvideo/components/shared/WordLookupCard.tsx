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
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          className="sticky top-0 z-10 p-3.5 rounded-xl bg-[#0059bb] text-white shadow-lg space-y-2 border border-sky-400/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black tracking-wide font-display text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-300" /> {wordLookupData.word}
              </h4>
              <span className="text-[11px] font-mono opacity-90 px-1.5 py-0.5 rounded bg-white/20">
                {wordLookupData.phonetic}
              </span>
              <button
                type="button"
                onClick={() => onSpeakWord(wordLookupData.word)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-all"
                title="Phát âm từ này"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onSaveWord}
                className="px-2.5 py-1 rounded-lg bg-white text-[#0059bb] hover:bg-sky-50 text-[11px] font-black transition-all flex items-center gap-1 shadow-2xs cursor-pointer font-sans"
              >
                <BookmarkPlus className="w-3.5 h-3.5" /> + Lưu Notebook
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                title="Đóng tra từ"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-xs font-bold opacity-95">
            Nghĩa: {wordLookupData.definitionVn}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
