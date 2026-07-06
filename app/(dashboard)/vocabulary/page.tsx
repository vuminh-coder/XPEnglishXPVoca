"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MOCK_THEMES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  Plane,
  ArrowUpRight,
  Sparkles,
  Clock3,
  Target,
} from "lucide-react";

const THEME_ICONS: Record<string, React.ReactNode> = {
  t1: <BookOpen className="h-6 w-6 text-cyan-500" strokeWidth={1.3} />,
  t2: <GraduationCap className="h-6 w-6 text-purple-500" strokeWidth={1.3} />,
  t3: <Briefcase className="h-6 w-6 text-amber-500" strokeWidth={1.3} />,
  t4: <Plane className="h-6 w-6 text-blue-500" strokeWidth={1.3} />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
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

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    // Return first 6 to match SSR and prevent hydration mismatches
    return MOCK_THEMES.slice(0, 6).map(t => t.id);
  });

  // Initialize with 6 random unique themes
  React.useEffect(() => {
    const shuffled = [...MOCK_THEMES].sort(() => 0.5 - Math.random());
    setDisplayedIds(shuffled.slice(0, 6).map(t => t.id));
  }, []);

  const loadMoreThemes = () => {
    const remaining = MOCK_THEMES.filter(t => !displayedIds.includes(t.id));
    if (remaining.length > 0) {
      // Shuffle remaining and add next 6 random unique sets
      const nextBatch = [...remaining].sort(() => 0.5 - Math.random()).slice(0, 6).map(t => t.id);
      setDisplayedIds(prev => [...prev, ...nextBatch]);
    }
  };

  const filteredThemes = React.useMemo(() => {
    if (search !== "") {
      // Search mode searches in all vocabulary sets
      return MOCK_THEMES.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.nameEn.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Normal mode displays only active random-paginated sets in selection order
    return displayedIds
      .map(id => MOCK_THEMES.find(t => t.id === id))
      .filter((t): t is typeof MOCK_THEMES[0] => !!t);
  }, [search, displayedIds]);

  const totalVocabs = React.useMemo(() => {
    return filteredThemes.reduce((sum, t) => sum + t.totalVocabs, 0);
  }, [filteredThemes]);

  const getThemeAccent = (id: string) => {
    switch (id) {
      case "t1":
        return {
          iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
          stripe: "from-cyan-400 to-sky-500",
        };
      case "t2":
        return {
          iconBg: "bg-purple-50 dark:bg-purple-950/30",
          stripe: "from-violet-400 to-fuchsia-500",
        };
      case "t3":
        return {
          iconBg: "bg-amber-50 dark:bg-amber-950/30",
          stripe: "from-amber-400 to-orange-500",
        };
      case "t4":
        return {
          iconBg: "bg-blue-50 dark:bg-blue-950/30",
          stripe: "from-blue-400 to-indigo-500",
        };
      default:
        return {
          iconBg: "bg-slate-50 dark:bg-slate-950/30",
          stripe: "from-slate-400 to-slate-500",
        };
    }
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
          Khám phá bộ từ vựng
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Chọn một chủ đề, học theo nhịp điệu riêng và giữ động lực bằng lộ trình rõ ràng.
        </p>
      </motion.div>

      {/* Hero Banner Feature: Today's Focus */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.05 }}
        className="bezel border-indigo-500/15 bg-indigo-550/5 dark:border-indigo-500/10 dark:bg-indigo-500/5 shadow-[0_4px_30px_rgba(99,102,241,0.12)] animate-fade-in-up"
      >
        <div className="bezel-inner overflow-hidden rounded-[calc(var(--radius-3xl)-6px)] bg-gradient-to-br from-[#141526] via-[#0d0e1b] to-[#040409] p-6 text-white md:p-8 relative">
          {/* Decorative mesh background orb - glowing neon blue/purple */}
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" strokeWidth={1.5} />
                Mục tiêu hôm nay
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight sm:text-3xl font-display text-white leading-tight">
                Bắt đầu từ một chủ đề quen thuộc nhất
              </h2>
              <p className="text-xs md:text-sm text-slate-100 sm:text-base leading-relaxed font-semibold max-w-xl">
                Tìm bộ từ phù hợp với mục tiêu của bạn, rồi học theo các gói ngắn, dễ hoàn thành.
              </p>
            </div>
            
            {/* Today status sub-card */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 p-4 shrink-0 shadow-lg flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-md shadow-orange-500/20 shrink-0">
                🎯
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Trong tuần này
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs font-black text-amber-300">
                  12 mục tiêu sắp hoàn thành
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Search and Statistics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
        className="bezel"
      >
        <div className="bezel-inner flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-neutral-900">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={1.3}
            />
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-neutral-800 dark:bg-neutral-950 transition-colors"
              placeholder="Tìm theo chủ đề (Ví dụ: Travel, Business, Academics, TOEIC...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Tìm kiếm chủ đề từ vựng"
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-500" strokeWidth={1.3} />
              <span>{filteredThemes.length} chủ đề</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" strokeWidth={1.3} />
              <span>
                {totalVocabs} từ
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Content */}
      {filteredThemes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bezel"
        >
          <div className="bezel-inner p-10 text-center bg-white dark:bg-neutral-900">
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              Không tìm thấy chủ đề phù hợp
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
              Hãy thử từ khóa khác như “travel”, “work”, hoặc “daily”.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredThemes.map((t) => {
            const style = getThemeAccent(t.id);
            const percentage = Math.min(100, 15 + t.difficulty * 8);
            return (
              <motion.div key={t.id} variants={itemVariants}>
                <Link
                  href={`/vocabulary/${t.id}`}
                  className="bezel lift tactile group block h-full cursor-pointer select-none"
                >
                  <div className="bezel-inner p-6 h-full flex flex-col justify-between bg-white dark:bg-neutral-900">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`icon-well ${style.iconBg} h-12 w-12 rounded-2xl border border-black/[0.03] shadow-sm dark:border-white/[0.03] flex items-center justify-center`}
                        >
                          {THEME_ICONS[t.id] || (
                            <BookOpen
                              className="h-5 w-5 text-slate-500"
                              strokeWidth={1.3}
                            />
                          )}
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 text-slate-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          strokeWidth={1.3}
                        />
                      </div>

                      <div className="mt-5">
                        <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white font-display">
                          {t.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 font-bold">
                          {t.nameEn} · {t.totalVocabs} từ vựng
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                        <Clock3 className="h-3.5 w-3.5" strokeWidth={1.3} />
                        8 phút / buổi
                      </div>

                      <div className="mt-4 flex items-center gap-1.5">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-1.5 rounded-full ${
                                i < t.difficulty
                                  ? "bg-cyan-500"
                                  : "bg-slate-200 dark:bg-neutral-800"
                              }`}
                            />
                          ))}
                      </div>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500">
                          <span>Tiến trình</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-850">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${style.stripe}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Add vocabulary sets button */}
          {search === "" && displayedIds.length < MOCK_THEMES.length && (
            <div className="flex justify-end pt-6 pb-2 col-span-full">
              <Button
                variant="bezel"
                onClick={loadMoreThemes}
                className="px-8 py-3.5 text-xs font-black tracking-wider uppercase flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-cyan-500 animate-pulse" />
                Thêm bộ từ khám phá
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
