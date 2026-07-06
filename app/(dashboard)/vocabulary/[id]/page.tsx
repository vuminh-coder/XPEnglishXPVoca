"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import { MOCK_THEMES } from "@/lib/constants";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  List,
  Heart,
  Volume2,
  Zap,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const listItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
} as const;

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const theme = React.useMemo(() => MOCK_THEMES.find((t) => t.id === id), [id]);
  const vocabs = React.useMemo(() => MOCK_VOCABULARIES.filter((v) => v.themeId === id), [id]);
  const { toggleFavorite, learned, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  const [toast, setToast] = useState<{ title: string; body: string } | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeVocab = vocabs[currentIndex];
  const activeState = React.useMemo(() => activeVocab
    ? learned.find((l) => l.vocabId === activeVocab.id)
    : null, [activeVocab, learned]);
  const isCurrentFav = activeState?.isFavorite || false;

  if (!theme)
    return <div className="p-8 text-center text-red-500 font-bold">Chủ đề không tồn tại</div>;

  const showToastMsg = (title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 3000);
  };

  const speak = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      showToastMsg("Lỗi phát âm", "Trình duyệt không hỗ trợ!");
    }
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-6 right-6 z-[600] bezel"
          >
            <div className="bezel-inner bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/50 dark:border-emerald-900/30 p-4 flex items-center gap-3">
              <CheckCircle2
                className="w-5 h-5 text-emerald-500 shrink-0"
                strokeWidth={1.3}
              />
              <div>
                <div className="text-xs font-black text-slate-900 dark:text-white">
                  {toast.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                  {toast.body}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section with back shortcut and dynamic tabs */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/vocabulary"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-neutral-850 hover:border-cyan-300 dark:hover:border-cyan-800 bg-white dark:bg-neutral-900 tactile shrink-0"
            aria-label="Quay lại danh sách từ vựng"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" strokeWidth={1.3} />
          </Link>
          <div>
            <h2 className="font-black text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white font-display">
              {theme.name}
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
              {theme.nameEn} · Độ khó: {theme.difficulty}/5
            </p>
          </div>
        </div>

        {/* View Mode Switching Tab with Slider Layout animation */}
        <div className="relative flex bg-slate-100 dark:bg-neutral-950 p-1 rounded-full border border-slate-200/50 dark:border-neutral-900 w-fit">
          <button
            className={`relative flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-full transition-colors duration-250 select-none z-10 ${
              viewMode === "flashcard"
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setViewMode("flashcard")}
          >
            {viewMode === "flashcard" && (
              <motion.div
                layoutId="activeViewIndicator"
                className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              />
            )}
            <Layers className="w-3.5 h-3.5 relative z-10" strokeWidth={1.3} />
            <span className="relative z-10">Flashcard 3D</span>
          </button>
          <button
            className={`relative flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-full transition-colors duration-250 select-none z-10 ${
              viewMode === "list"
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setViewMode("list")}
          >
            {viewMode === "list" && (
              <motion.div
                layoutId="activeViewIndicator"
                className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              />
            )}
            <List className="w-3.5 h-3.5 relative z-10" strokeWidth={1.3} />
            <span className="relative z-10">Danh sách</span>
          </button>
        </div>
      </motion.div>

      {/* Mode View Content Panel */}
      {viewMode === "flashcard" && activeVocab && (
        <div className="max-w-md mx-auto animate-scale-in space-y-6">
          {/* Outer Bezel Wrapper */}
          <div className="bezel shadow-md">
            {/* 3D Perspective container */}
            <div
              className="perspective-[1500px] w-full"
              style={{ borderRadius: "calc(var(--radius-3xl) - 6px)" }}
            >
              {/* Inner card containing flipping state */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
                className="relative w-full h-80 rounded-[calc(var(--radius-3xl)-6px)] cursor-pointer select-none [transform-style:preserve-3d]"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* FRONT SIDE (Statically hidden on rotateY(180)) */}
                <div
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-100 dark:border-neutral-850 [backface-visibility:hidden]"
                  style={{ transform: "rotateY(0deg)" }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-black text-cyan-600 dark:text-cyan-400 mb-6 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/10">
                    <RotateCcw className="w-3 h-3 animate-spin-slow" /> Bấm để lật
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-cyan-600 dark:text-cyan-400 mb-2 tracking-tight font-display">
                    {activeVocab.word}
                  </h3>
                  <span className="text-[10px] bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 px-3 py-0.5 rounded-full font-black uppercase mb-3">
                    {activeVocab.pos}
                  </span>
                  <div className="text-slate-400 dark:text-slate-500 text-xs font-bold font-mono">
                    {activeVocab.phonetic}
                  </div>
                </div>

                {/* BACK SIDE (Rotated initially) */}
                <div
                  className="absolute inset-0 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-100 dark:border-neutral-850 [backface-visibility:hidden]"
                  style={{
                    transform: "rotateY(180deg)",
                    background:
                      "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%), var(--bg-card)",
                  }}
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] font-black text-emerald-600 dark:text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">
                    Định nghĩa từ
                  </span>
                  <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                    {activeVocab.definitionVn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-5 leading-relaxed font-medium">
                    {activeVocab.definition}
                  </p>
                  <div className="bg-slate-50/50 dark:bg-neutral-950/40 px-4 py-3 rounded-xl border border-slate-200/40 dark:border-neutral-850 text-xs text-slate-500 dark:text-slate-400 font-bold italic w-full max-w-xs leading-relaxed">
                    &quot;{activeVocab.examples[0]}&quot;
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Flashcard operations bezel control block */}
          <div className="bezel">
            <div className="bezel-inner p-3.5 flex items-center justify-between bg-white dark:bg-neutral-900">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-neutral-850 bg-slate-50 dark:bg-neutral-950 text-slate-500 hover:border-cyan-300 dark:hover:border-cyan-800 tactile shrink-0 cursor-pointer"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) =>
                      prev > 0 ? prev - 1 : vocabs.length - 1
                    );
                  }, 120);
                }}
                aria-label="Từ trước"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.3} />
              </motion.button>

              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 select-none">
                  {currentIndex + 1} / {vocabs.length} từ
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200/50 dark:border-neutral-850 bg-slate-50/60 dark:bg-neutral-950 tactile cursor-pointer text-slate-500"
                    onClick={() => {
                      toggleFavorite(activeVocab.id);
                      showToastMsg(
                        "Yêu thích",
                        !isCurrentFav
                          ? "Đã thêm từ vào mục yêu thích"
                          : "Đã bỏ từ khỏi mục yêu thích"
                      );
                    }}
                    aria-label="Thêm vào yêu thích"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        isCurrentFav
                          ? "text-red-500 fill-red-500"
                          : "text-slate-400"
                      }`}
                      strokeWidth={1.3}
                    />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200/50 dark:border-neutral-850 bg-slate-50/60 dark:bg-neutral-950 tactile cursor-pointer text-slate-500"
                    onClick={() => speak(activeVocab.word)}
                    aria-label="Phát âm từ"
                  >
                    <Volume2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200/50 dark:border-neutral-850 bg-slate-50/60 dark:bg-neutral-950 tactile cursor-pointer text-slate-500"
                    onClick={() => {
                      practiceWord(activeVocab.id, true);
                      awardXp(15);
                      showToastMsg("Rèn luyện", "Đã ghi nhận ôn tập từ! +15 XP");
                    }}
                    aria-label="Ôn tập từ"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.3} />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-neutral-850 bg-slate-50 dark:bg-neutral-950 text-slate-500 hover:border-cyan-300 dark:hover:border-cyan-800 tactile shrink-0 cursor-pointer"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) =>
                      prev < vocabs.length - 1 ? prev + 1 : 0
                    );
                  }, 120);
                }}
                aria-label="Từ tiếp theo"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.3} />
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* List Mode View */}
      {viewMode === "list" && (
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="vocab-list grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {vocabs.map((v) => {
            const state = learned.find((l) => l.vocabId === v.id);
            const isFav = state?.isFavorite || false;
            const prof = state?.proficiency || 0;

            return (
              <motion.div key={v.id} variants={listItemVariants}>
                <div className="bezel lift group h-full">
                  <div className="bezel-inner p-5 h-full flex flex-col justify-between bg-white dark:bg-neutral-900">
                    <div>
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-black text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors duration-300 font-display">
                            {v.word}
                          </h3>
                          <span className="inline-block text-[10px] font-black px-2.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 rounded-full uppercase mt-1">
                            {v.pos}
                          </span>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-bold font-mono mt-1">
                            {v.phonetic}
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200/50 dark:border-neutral-850 bg-slate-50 dark:bg-neutral-950 text-slate-500 tactile cursor-pointer shrink-0"
                          onClick={() => {
                            toggleFavorite(v.id);
                            showToastMsg(
                              "Yêu thích",
                              !isFav
                                ? "Đã thêm từ vào mục yêu thích"
                                : "Đã bỏ từ khỏi mục yêu thích"
                            );
                          }}
                          aria-label="Thêm vào yêu thích"
                        >
                          <Heart
                            className={`w-4 h-4 transition-all duration-200 ${
                              isFav
                                ? "text-red-500 fill-red-500"
                                : "text-slate-400"
                            }`}
                            strokeWidth={1.3}
                          />
                        </motion.button>
                      </div>

                      <div className="text-sm font-black text-slate-900 dark:text-white mb-1">
                        {v.definitionVn}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                        {v.definition}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-neutral-950/30 p-3 rounded-xl border border-slate-250/20 dark:border-neutral-850 italic leading-relaxed font-bold">
                        &quot;{v.examples[0]}&quot;
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-neutral-850">
                      {/* Proficiency Dot Matrix */}
                      <div className="flex gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < prof
                                  ? "bg-emerald-500 shadow-sm"
                                  : "bg-slate-200 dark:bg-neutral-800"
                              }`}
                            />
                          ))}
                      </div>

                      {/* Action Triggers */}
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-850 rounded-full tactile cursor-pointer"
                          onClick={() => speak(v.word)}
                        >
                          <Volume2 className="w-3.5 h-3.5" strokeWidth={1.3} />{" "}
                          Nghe
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full tactile cursor-pointer shadow-sm hover:shadow"
                          onClick={() => {
                            practiceWord(v.id, true);
                            awardXp(15);
                            showToastMsg(
                              "Rèn luyện",
                              "Đã ghi nhận luyện từ! +15 XP"
                            );
                          }}
                        >
                          <Zap className="w-3.5 h-3.5" strokeWidth={1.3} /> Luyện
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}