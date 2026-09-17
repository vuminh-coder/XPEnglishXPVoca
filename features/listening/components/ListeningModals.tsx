"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, Volume2, Flag } from "lucide-react";
import type { DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";

// ==========================================
// 1. DEEP WORD DEFINITION DICTIONARY MODAL
// ==========================================

export interface DeepDictionaryModalProps {
  selectedWord: DeepWordDefinition | null;
  onClose: () => void;
  onSpeak: (word: string) => void;
}

export const DeepDictionaryModal: React.FC<DeepDictionaryModalProps> = ({
  selectedWord,
  onClose,
  onSpeak,
}) => {
  return (
    <AnimatePresence>
      {selectedWord && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="fixed bottom-[72px] sm:bottom-6 right-4 sm:right-6 z-50 w-[86vw] max-w-[290px] sm:w-[400px] sm:max-w-[400px] p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 font-sans max-h-[55vh] sm:max-h-[80vh] overflow-y-auto"
        >
          {/* Header: Word + Close */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display capitalize truncate">
                  {selectedWord.word}
                </h4>
                <span className="text-xs font-semibold text-slate-400">
                  {selectedWord.pos || "Từ vựng"}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* IPA + Pronounce */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <span className="font-mono text-blue-600 dark:text-sky-400 font-bold text-xs sm:text-sm">
              {selectedWord.ipa}
            </span>
            <button
              onClick={() => onSpeak(selectedWord.word)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              <Volume2 className="w-3.5 h-3.5 fill-white" /> Phát âm
            </button>
          </div>

          {/* Clean Structured Definition Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2.5">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {selectedWord.meaning || "Chưa có bản dịch"}
              </p>
            </div>

            {selectedWord.detailMeaning && (
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed not-italic">
                  &ldquo;{selectedWord.detailMeaning}&rdquo;
                </p>
              </div>
            )}

            {selectedWord.example && (
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400 font-normal">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Ex:
                </span>{" "}
                {selectedWord.example}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 2. SENTENCE REPORT MODAL
// ==========================================

export interface SentenceReportModalProps {
  isOpen: boolean;
  sentenceIndex: number;
  reportReason: string;
  onReasonChange: (val: string) => void;
  reportDescription: string;
  onDescriptionChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const SentenceReportModal: React.FC<SentenceReportModalProps> = ({
  isOpen,
  sentenceIndex,
  reportReason,
  onReasonChange,
  reportDescription,
  onDescriptionChange,
  onSubmit,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="w-full max-w-md p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-4 font-sans"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base font-display">
                <Flag className="w-4 h-4 text-rose-500" />
                <span>Báo Cáo Lỗi Câu #{sentenceIndex + 1}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. Vấn đề bạn gặp phải:
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => onReasonChange(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:border-blue-500"
                >
                  <option value="spelling">Lỗi chính tả / dấu câu trong text</option>
                  <option value="audio">Lỗi phát âm / audio không khớp</option>
                  <option value="translation">Bản dịch tiếng Việt chưa chuẩn</option>
                  <option value="other">Vấn đề khác</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. Mô tả chi tiết (Tùy chọn):
                </label>
                <textarea
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  placeholder="Mô tả cụ thể lỗi bạn thấy để ban biên tập sửa nhanh hơn..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:border-blue-500 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  Gửi Báo Cáo 🚩
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
