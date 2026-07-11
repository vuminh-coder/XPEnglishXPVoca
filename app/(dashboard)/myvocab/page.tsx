"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Heart,
  RefreshCw,
  Crown,
  Volume2,
  Zap,
  Inbox,
  ArrowRight,
} from "lucide-react";

const statsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
} as const;

const statsItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
} as const;

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
} as const;

const cardVariants = {
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

export default function MyVocabularyPage() {
  const [filter, setFilter] = useState<"all" | "favorite" | "learning" | "mastered">("all");
  const { learned, toggleFavorite, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();
  const vocabs = MOCK_VOCABULARIES;

  const { favoriteWords, masteredWords, learningWords } = React.useMemo(() => {
    return {
      favoriteWords: learned.filter((l) => l.isFavorite),
      masteredWords: learned.filter((l) => l.proficiency === 5),
      learningWords: learned.filter((l) => l.proficiency > 0 && l.proficiency < 5),
    };
  }, [learned]);

  const filteredList = React.useMemo(() => {
    if (filter === "all") return learned;
    if (filter === "favorite") return favoriteWords;
    if (filter === "learning") return learningWords;
    if (filter === "mastered") return masteredWords;
    return [];
  }, [filter, learned, favoriteWords, learningWords, masteredWords]);

  const speak = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const statCards = [
    {
      key: "all" as const,
      label: "Tổng số",
      sublabel: "Từ vựng đã bắt đầu học",
      count: learned.length,
      icon: <FolderOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />,
      accent: "blue",
    },
    {
      key: "favorite" as const,
      label: "Yêu thích",
      sublabel: "Từ vựng đánh dấu thích",
      count: favoriteWords.length,
      icon: <Heart className="w-[18px] h-[18px]" strokeWidth={1.8} />,
      accent: "emerald",
    },
    {
      key: "learning" as const,
      label: "Đang học",
      sublabel: "Từ vựng đang rèn luyện",
      count: learningWords.length,
      icon: <RefreshCw className="w-[18px] h-[18px]" strokeWidth={1.8} />,
      accent: "amber",
    },
    {
      key: "mastered" as const,
      label: "Làm chủ",
      sublabel: "Đã thành thạo cấp tối đa",
      count: masteredWords.length,
      icon: <Crown className="w-[18px] h-[18px]" strokeWidth={1.8} />,
      accent: "purple",
    },
  ];

  const accentMap: Record<
    string,
    {
      iconBg: string;
      badgeBg: string;
      badgeText: string;
      activeBorder: string;
      glowBg: string;
    }
  > = {
    blue: {
      iconBg: "bg-blue-50 dark:bg-blue-950/30",
      badgeBg: "bg-blue-50 dark:bg-blue-950/50",
      badgeText: "text-blue-500",
      activeBorder: "border-blue-400 dark:border-blue-700 ring-1 ring-blue-400/30",
      glowBg: "rgba(59, 130, 246, 0.03)",
    },
    emerald: {
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
      badgeText: "text-emerald-500",
      activeBorder: "border-emerald-400 dark:border-emerald-700 ring-1 ring-emerald-400/30",
      glowBg: "rgba(16, 185, 129, 0.03)",
    },
    amber: {
      iconBg: "bg-amber-50 dark:bg-amber-950/30",
      badgeBg: "bg-amber-50 dark:bg-amber-950/50",
      badgeText: "text-amber-500",
      activeBorder: "border-amber-400 dark:border-amber-700 ring-1 ring-amber-400/30",
      glowBg: "rgba(245, 158, 11, 0.03)",
    },
    purple: {
      iconBg: "bg-purple-50 dark:bg-purple-950/30",
      badgeBg: "bg-purple-50 dark:bg-purple-950/50",
      badgeText: "text-purple-500",
      activeBorder: "border-purple-400 dark:border-purple-700 ring-1 ring-purple-400/30",
      glowBg: "rgba(139, 92, 246, 0.03)",
    },
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Bộ từ vựng của tôi
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Theo dõi, ôn tập và quản lý các từ vựng bạn đang học, yêu thích hoặc đã làm chủ.
        </p>
      </motion.div>

      {/* Statistics filters - Double Bezel cards container */}
      <motion.div
        variants={statsContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((s) => {
          const a = accentMap[s.accent];
          const isActive = filter === s.key;
          return (
            <motion.div
              key={s.key}
              variants={statsItemVariants}
              onClick={() => setFilter(s.key)}
              className={`bezel cursor-pointer group hover:shadow-sm ${
                isActive ? a.activeBorder : "border-slate-200/50 dark:border-neutral-900"
              }`}
              style={{
                transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                className="bezel-inner p-5 h-full relative"
                style={{
                  background: isActive ? a.glowBg : "var(--bg-card)",
                  transition: "background 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`icon-well ${a.iconBg} ${a.badgeText} flex items-center justify-center rounded-xl`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`text-[9px] ${a.badgeText} ${a.badgeBg} px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-current/10`}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  {s.count}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 leading-normal">
                  {s.sublabel}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation tabs selector with layoutId sliding indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.1 }}
        className="relative flex bg-slate-100 dark:bg-neutral-950 p-1 rounded-full border border-slate-200/50 dark:border-neutral-900 w-full sm:w-fit overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {(["all", "favorite", "learning", "mastered"] as const).map((key) => {
          const labels: Record<string, string> = {
            all: "Tất cả",
            favorite: "Yêu thích",
            learning: "Đang học",
            mastered: "Đã thuộc",
          };
          const counts: Record<string, number> = {
            all: learned.length,
            favorite: favoriteWords.length,
            learning: learningWords.length,
            mastered: masteredWords.length,
          };
          const isActive = filter === key;
          return (
            <button
              key={key}
              className={`flex-1 sm:flex-initial relative px-2.5 sm:px-4 py-2 text-[10px] sm:text-xs font-black rounded-full transition-colors duration-250 select-none z-10 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
              onClick={() => setFilter(key)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                />
              )}
              <span className="relative z-10">
                {labels[key]} ({counts[key]})
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Content layout display block */}
      <AnimatePresence mode="wait">
        {filteredList.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bezel"
          >
            <div className="bezel-inner flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-neutral-900">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-12 h-12 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 bg-slate-50 dark:bg-neutral-950 rounded-2xl border border-slate-200/50 dark:border-neutral-850 shadow-sm"
              >
                <Inbox className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
              <div className="text-base font-black text-slate-900 dark:text-white font-display mb-1">
                Thư mục đang trống
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mb-6 leading-relaxed font-medium">
                Bạn chưa lưu từ vựng nào thuộc bộ lọc này. Hãy bắt đầu khám phá và ôn luyện từ vựng mới ngay!
              </p>
              <Link
                href="/vocabulary"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-black px-6 py-2.5 shadow-md tactile hover:shadow-lg select-none cursor-pointer"
              >
                Khám phá từ mới{" "}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-grid"
            variants={listVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredList.map((item) => {
              const v = vocabs.find((vocab) => vocab.id === item.vocabId);
              if (!v) return null;
              return (
                <motion.div key={item.vocabId} variants={cardVariants}>
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
                            onClick={() => toggleFavorite(v.id)}
                            aria-label="Đánh dấu yêu thích"
                          >
                            <Heart
                              className={`w-4 h-4 transition-all duration-200 ${
                                item.isFavorite
                                  ? "text-red-500 fill-red-500"
                                  : "text-slate-400"
                              }`}
                              strokeWidth={2}
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
                        {/* Level Proficiency dot elements */}
                        <div className="flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  i < item.proficiency
                                    ? "bg-emerald-500 shadow-sm"
                                    : "bg-slate-200 dark:bg-neutral-800"
                                }`}
                              />
                            ))}
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-850 rounded-full tactile cursor-pointer"
                            onClick={() => speak(v.word)}
                          >
                            <Volume2 className="w-3.5 h-3.5" strokeWidth={2} /> Nghe
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full tactile cursor-pointer shadow-sm hover:shadow"
                            onClick={() => {
                              practiceWord(v.id, true);
                              awardXp(15);
                            }}
                          >
                            <Zap className="w-3.5 h-3.5" strokeWidth={2} /> Ôn tập
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
      </AnimatePresence>
    </div>
  );
}
