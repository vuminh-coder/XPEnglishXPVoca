"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  Plane,
  ArrowUpRight,
  Sparkles,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Layers,
  Filter
} from "lucide-react";

interface ClientTheme {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  totalVocabs: number;
  difficulty: number;
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  t1: <BookOpen className="w-5 h-5 text-[#1d6ee6]" />,
  t2: <GraduationCap className="w-5 h-5 text-purple-500" />,
  t3: <Briefcase className="w-5 h-5 text-amber-500" />,
  t4: <Plane className="w-5 h-5 text-emerald-500" />,
};

// O(K) Fisher-Yates sampling algorithm for fast random sampling
function getRandomSample<T>(arr: T[], limit: number): T[] {
  const len = arr.length;
  if (len <= limit) return arr;
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < limit && used.size < len) {
    const idx = Math.floor(Math.random() * len);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export default function VocabularyThemesClientList({
  initialThemes,
}: {
  initialThemes: ClientTheme[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    // Deterministic SSR initial slice to prevent React Hydration Mismatch
    return initialThemes.slice(0, 8).map((t) => t.id);
  });

  React.useEffect(() => {
    // Randomize on client after hydration completes
    if (initialThemes.length > 0) {
      setDisplayedIds(getRandomSample(initialThemes, 8).map((t) => t.id));
    }
  }, [initialThemes]);

  const loadMoreThemes = () => {
    const remaining = initialThemes.filter((t) => !displayedIds.includes(t.id));
    if (remaining.length > 0) {
      const nextBatch = getRandomSample(remaining, 8).map((t) => t.id);
      setDisplayedIds((prev) => [...prev, ...nextBatch]);
    }
  };

  const filteredThemes = useMemo(() => {
    let list = initialThemes;
    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameEn.toLowerCase().includes(q)
      );
    }
    return displayedIds
      .map((id) => initialThemes.find((t) => t.id === id))
      .filter((t): t is ClientTheme => !!t);
  }, [search, displayedIds, initialThemes]);

  const totalVocabsCount = useMemo(() => {
    return initialThemes.reduce((sum, t) => sum + (t.totalVocabs || 0), 0);
  }, [initialThemes]);

  const renderIcon = (theme: ClientTheme) => {
    if (THEME_ICONS[theme.id]) return THEME_ICONS[theme.id];
    return (
      <span className="text-lg select-none" role="img" aria-label={theme.name}>
        {theme.icon || "📚"}
      </span>
    );
  };

  return (
    <div className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans">
      
      {/* 1. TOP MICRO-HERO TOOLBAR (DASHBOARD BENTO STYLE) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 min-w-0"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 dark:text-white font-display truncate">
                Kho Từ Vựng Tiếng Anh
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#1d6ee6]/10 text-[#1d6ee6] shrink-0">
                {totalVocabsCount > 0 ? `${totalVocabsCount}+ từ vựng` : "4,000+ từ vựng"}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              Luyện tập theo từng chủ đề thiết yếu với thuật toán ghi nhớ SRS ngắt quãng.
            </p>
          </div>
        </div>

        {/* Search Input Dock */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên chủ đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs font-bold rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1d6ee6] transition-colors"
          />
        </div>
      </motion.div>

      {/* 2. TOP BENTO STATS BAR (4-COLUMN CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {[
          {
            title: "Tổng số chủ đề",
            value: `${initialThemes.length} Bộ từ`,
            subtitle: "Cập nhật liên tục",
            icon: Layers,
            color: "text-[#1d6ee6]",
            bg: "bg-[#1d6ee6]/10",
          },
          {
            title: "Mục tiêu bài học",
            value: "12 Từ / ngày",
            subtitle: "Nhịp độ khuyến nghị",
            icon: Target,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            title: "Thời gian mỗi bài",
            value: "8 phút / buổi",
            subtitle: "Học mọi lúc mọi nơi",
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            title: "Tỷ lệ ghi nhớ SRS",
            value: "86% Bền vững",
            subtitle: "Thuật toán lặp lại",
            icon: Zap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3 min-w-0"
            >
              <div className={`p-2 rounded-md ${item.bg} ${item.color} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">
                  {item.title}
                </span>
                <p className="text-xs font-black text-slate-900 dark:text-white font-display truncate">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MAIN BENTO THEMES GRID */}
      {filteredThemes.length === 0 ? (
        <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-center space-y-2">
          <p className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Không tìm thấy chủ đề nào phù hợp
          </p>
          <p className="text-xs font-medium text-slate-400">
            Hãy thử tìm lại với từ khóa khác như "Work", "Travel", hoặc "Daily".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredThemes.map((t) => {
            const percentage = Math.min(100, 20 + (t.difficulty || 1) * 12);
            return (
              <Link key={t.id} href={`/vocabulary/${t.id}`} className="group block min-w-0">
                <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-sm hover:border-[#1d6ee6]/50 transition-all flex flex-col justify-between space-y-3 h-full cursor-pointer">
                  
                  {/* Card Header */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shrink-0">
                        {renderIcon(t)}
                      </div>
                      <span className="p-1 rounded text-slate-400 group-hover:text-[#1d6ee6] group-hover:bg-[#1d6ee6]/10 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-1 group-hover:text-[#1d6ee6] transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 line-clamp-1">
                        {t.nameEn} · {t.totalVocabs} từ vựng
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Difficulty & Progress */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>Độ khó:</span>
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < (t.difficulty || 1)
                                  ? "bg-[#1d6ee6]"
                                  : "bg-slate-200 dark:bg-slate-800"
                              }`}
                            />
                          ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-slate-400">Tiến trình</span>
                        <span className="text-[#1d6ee6]">{percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1d6ee6] transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Load More Button (Aligned to Bottom-Right Corner) */}
      {search === "" && displayedIds.length < initialThemes.length && (
        <div className="flex justify-end pt-2 pb-1">
          <button
            onClick={loadMoreThemes}
            className="px-5 py-2.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] text-slate-800 dark:text-slate-200 hover:text-[#1d6ee6] text-xs font-black shadow-xs hover:shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-[#1d6ee6]" />
            <span>Khám phá thêm bộ từ</span>
          </button>
        </div>
      )}

    </div>
  );
}
