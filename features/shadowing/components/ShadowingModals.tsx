"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  GraduationCap,
  Flag,
  BookOpen,
  Check,
} from "lucide-react";
import { DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";

// Level label helper
export const getLevelLabel = (level?: string): string => {
  const map: Record<string, string> = {
    Easy: "A1-A2",
    Beginner: "A1",
    A1: "A1",
    A2: "A2",
    Intermediate: "B1-B2",
    B1: "B1",
    B2: "B2",
    Hard: "C1-C2",
    Advanced: "C1",
    C1: "C1",
    C2: "C2",
  };
  return map[level || ""] || level || "A1";
};

/**
 * 1. Deep Dictionary Modal
 */
interface DeepDictionaryModalProps {
  selectedWord: DeepWordDefinition | null;
  onClose: () => void;
  lessonId?: string;
}

export function DeepDictionaryModal({
  selectedWord,
  onClose,
  lessonId,
}: DeepDictionaryModalProps) {
  return (
    <AnimatePresence>
      {selectedWord && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
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
              onClick={() =>
                speakLessonText(selectedWord.word, { lessonId, rate: 1.0 })
              }
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
                  "{selectedWord.detailMeaning}"
                </p>
              </div>
            )}

            {selectedWord.example && (
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400 font-normal not-italic">
                <span className="font-bold text-slate-700 dark:text-slate-300 not-italic">
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
}

/**
 * 2. Sentence Report Modal
 */
interface SentenceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentenceIndex: number;
  onSubmit: (e: React.FormEvent, reason: string, description: string) => void;
}

export function SentenceReportModal({
  isOpen,
  onClose,
  sentenceIndex,
  onSubmit,
}: SentenceReportModalProps) {
  const [reportReason, setReportReason] = useState<string>("spelling");
  const [reportDescription, setReportDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, reportReason, reportDescription);
    setReportDescription("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
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

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. Vấn đề bạn gặp phải:
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
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
                  onChange={(e) => setReportDescription(e.target.value)}
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
}

/**
 * 3. Lesson Explorer Modal (Khám phá 100+ bài)
 */
interface LessonExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonsList: any[];
  selectedLessonId: string | null;
  onSelectLesson: (id: string | number) => void;
}

export function LessonExplorerModal({
  isOpen,
  onClose,
  lessonsList,
  selectedLessonId,
  onSelectLesson,
}: LessonExplorerModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = lessonsList.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.title?.toLowerCase().includes(q) ||
      l.category?.toLowerCase().includes(q) ||
      l.level?.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shadow-2xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                    Tất Cả Bài Luyện Nói (Shadowing Lessons)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Tổng số: {lessonsList.length} bài nghe & nói chuẩn TOEIC Part 3 & Part 4
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search within Modal */}
            <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh bài học trong danh sách..."
                className="w-full h-9 px-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
              />
            </div>

            {/* Scrollable List */}
            <div className="p-4 overflow-y-auto max-h-[55vh] space-y-2">
              {filteredLessons.map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson.id);
                      onClose();
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-700">
                        <LessonCoverImage
                          lesson={lesson}
                          className="w-full h-full object-cover"
                          showBadge={false}
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {getLevelLabel(lesson.level)}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {lesson.totalSentences || lesson.transcript?.length || 10} câu ·{" "}
                            {lesson.duration || "5 min"}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold font-sans truncate text-slate-900 dark:text-white">
                          {lesson.title}
                        </h4>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white flex items-center gap-1 shadow-2xs shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Đang chọn
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 px-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
