"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X, Play, RotateCcw, Shuffle, Sparkles, Brain, BookOpen, ListVideo } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: "playback" | "navigation" | "study";
  icon?: React.ReactNode;
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["Space"],
    description: "Phát hoặc Tạm dừng video (Play / Pause)",
    category: "playback",
    icon: <Play className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
  },
  {
    keys: ["R"],
    description: "Bật / Tắt chế độ Lặp Câu (Repeat Loop)",
    category: "playback",
    icon: <RotateCcw className="w-3.5 h-3.5 text-amber-500" />,
  },
  {
    keys: ["S"],
    description: "Tráo câu ngẫu nhiên trong bài (Shuffle Subtitle)",
    category: "playback",
    icon: <Shuffle className="w-3.5 h-3.5 text-purple-500" />,
  },
  {
    keys: ["←", "hoặc", "J"],
    description: "Lùi về câu phụ đề trước (Previous Cue)",
    category: "navigation",
  },
  {
    keys: ["→", "hoặc", "L"],
    description: "Tiến sang câu phụ đề tiếp theo (Next Cue)",
    category: "navigation",
  },
  {
    keys: ["1"],
    description: "Mở Tab 1: Phụ đề song ngữ & Tra từ",
    category: "study",
    icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
  },
  {
    keys: ["2"],
    description: "Mở Tab 2: Dictation AI & Shadowing",
    category: "study",
    icon: <Brain className="w-3.5 h-3.5 text-purple-500" />,
  },
  {
    keys: ["3"],
    description: "Mở Tab 3: Danh sách Playlist video",
    category: "study",
    icon: <ListVideo className="w-3.5 h-3.5 text-emerald-500" />,
  },
  {
    keys: ["Enter"],
    description: "Kiểm tra đáp án / Chuyển câu tiếp theo (khi gõ Dictation)",
    category: "study",
  },
  {
    keys: ["Esc"],
    description: "Đóng cửa sổ phụ đề, tra từ hoặc modal",
    category: "navigation",
  },
  {
    keys: ["?"],
    description: "Mở / Đóng bảng hướng dẫn phím tắt này",
    category: "navigation",
  },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] select-none font-sans"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
                  <Keyboard className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      Bảng Phím Tắt Tiện Ích
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[10px] font-mono font-bold border border-blue-200/60 dark:border-blue-800/40">
                      PRO SHORTCUTS
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Học tiếng Anh siêu tốc với các phím tắt chuyên dụng
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SHORTCUTS.map((sc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2.5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {sc.icon}
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        {sc.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {sc.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold shadow-2xs ${
                            k === "hoặc"
                              ? "bg-transparent text-slate-400 text-[10px] px-0.5 shadow-none"
                              : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300/80 dark:border-slate-700"
                          }`}
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Tip Callout */}
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Mẹo nhỏ:</strong> Nhấn <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 font-mono font-bold text-[10px] border border-slate-300 dark:border-slate-700">Space</kbd> để dừng lại bất kỳ lúc nào để nhẩm lại câu hoặc click vào từ để tra từ điển tức thì!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="h-8.5 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer active:scale-95"
              >
                Đã Hiểu (Đóng)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
