"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  RefreshCw,
  Clock,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Compass,
} from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  READING_PASSAGES_DATA,
  ReadingPassage,
} from "@/features/reading/data/readingMockData";
import {
  useReadingCatalogStore,
  type ReadingCategoryTab,
} from "@/stores/readingCatalogStore";

// Module-scope constants
const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

function PassageCardCover({
  src,
  alt,
  icon,
}: {
  src?: string;
  alt: string;
  icon: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-3xl select-none">
        {icon}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 640px) 45vw, 25vw"
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  );
}

export function ReadingCatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdFromUrl = searchParams.get("id") || searchParams.get("lessonId");

  // Redirect legacy ?id= queries to dedicated route
  useEffect(() => {
    if (rawIdFromUrl) {
      router.replace(`/study/reading/${rawIdFromUrl}`);
    }
  }, [rawIdFromUrl, router]);

  // SWR & Zustand In-Memory Store Integration (0ms Frame-0 Hydration)
  const listingSearch = useReadingCatalogStore((s) => s.filters.listingSearch);
  const setListingSearch = useReadingCatalogStore((s) => s.setListingSearch);
  const activeCategoryTab = useReadingCatalogStore((s) => s.filters.activeCategoryTab);
  const setActiveCategoryTab = useReadingCatalogStore((s) => s.setActiveCategoryTab);
  const shuffleSeedBasic = useReadingCatalogStore((s) => s.filters.shuffleSeedBasic);
  const setShuffleSeedBasic = useReadingCatalogStore((s) => s.setShuffleSeedBasic);
  const shuffleSeedAdvanced = useReadingCatalogStore((s) => s.filters.shuffleSeedAdvanced);
  const setShuffleSeedAdvanced = useReadingCatalogStore((s) => s.setShuffleSeedAdvanced);
  const completedPassageIds = useReadingCatalogStore((s) => s.completedPassageIds);
  const fetchReadingProgress = useReadingCatalogStore((s) => s.fetchReadingProgress);

  // Background SWR Progress Sync (Non-blocking)
  useEffect(() => {
    fetchReadingProgress();
  }, [fetchReadingProgress]);

  const getLevelLabel = (level?: string): string => {
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

  // 1. Basic Pool
  const basicPool = React.useMemo(() => {
    const easy = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const mid = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const combined = [...easy, ...mid.slice(0, Math.ceil(mid.length / 2))];
    return combined.length > 0 ? combined : READING_PASSAGES_DATA.slice(0, 20);
  }, []);

  // 2. Advanced Pool
  const advancedPool = React.useMemo(() => {
    const hard = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const mid = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const combined = [...hard, ...mid.slice(Math.ceil(mid.length / 2))];
    return combined.length > 0 ? combined : READING_PASSAGES_DATA.slice(20);
  }, []);

  // Deterministic seed-based shuffling (Preserves card display across page navigations)
  const displayedBasicPassages = React.useMemo(() => {
    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      return basicPool
        .filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
        .slice(0, 8);
    }
    const offset = (shuffleSeedBasic * 8) % Math.max(1, basicPool.length);
    const sliced = basicPool.slice(offset, offset + 8);
    if (sliced.length < 8 && basicPool.length >= 8) {
      return [...sliced, ...basicPool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [basicPool, shuffleSeedBasic, listingSearch]);

  const displayedAdvancedPassages = React.useMemo(() => {
    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      return advancedPool
        .filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
        .slice(0, 8);
    }
    const offset = (shuffleSeedAdvanced * 8) % Math.max(1, advancedPool.length);
    const sliced = advancedPool.slice(offset, offset + 8);
    if (sliced.length < 8 && advancedPool.length >= 8) {
      return [...sliced, ...advancedPool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [advancedPool, shuffleSeedAdvanced, listingSearch]);

  // Tab Filtered Passages (when filtering by Category/Level Tabs)
  const tabFilteredPassages = React.useMemo(() => {
    if (activeCategoryTab === "all") return null;
    if (activeCategoryTab === "basic") {
      return READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    }
    if (activeCategoryTab === "intermediate") {
      return READING_PASSAGES_DATA.filter(
        (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
      );
    }
    if (activeCategoryTab === "advanced") {
      return READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    }
    if (activeCategoryTab === "completed") {
      return READING_PASSAGES_DATA.filter((p) => completedPassageIds.includes(p.id));
    }
    return null;
  }, [activeCategoryTab, completedPassageIds]);

  // Search Filtered Passages
  const searchFilteredPassages = React.useMemo(() => {
    if (!listingSearch.trim()) return null;
    const q = listingSearch.toLowerCase();
    return READING_PASSAGES_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.level && p.level.toLowerCase().includes(q))
    );
  }, [listingSearch]);

  const handleShuffleBasic = () => {
    setShuffleSeedBasic((prev) => prev + 1);
  };

  const handleShuffleAdvanced = () => {
    setShuffleSeedAdvanced((prev) => prev + 1);
  };

  const categoryTabs: { id: ReadingCategoryTab; label: string }[] = [
    { id: "all", label: "Tất cả bài đọc" },
    { id: "basic", label: "Cơ bản (A1-A2)" },
    { id: "intermediate", label: "Trung cấp (B1-B2)" },
    { id: "advanced", label: "Nâng cao (C1-C2)" },
    { id: "completed", label: "Đã hoàn thành" },
  ];

  const totalWordsAvailable = READING_PASSAGES_DATA.reduce(
    (acc, p) => acc + (p.wordCount || 0),
    0
  );

  const renderPassageCard = (passage: ReadingPassage) => {
    const isCompleted = completedPassageIds.includes(passage.id);

    return (
      <Link
        key={passage.id}
        href={`/study/reading/${passage.id}`}
        prefetch={true}
        className="p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-[#0059bb]/70 dark:hover:border-sky-500/70 bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-2.5 group shadow-2xs select-none block active:scale-[0.99]"
      >
        {/* Media Cover - Concentric Radius Rule 10 */}
        <div className="relative w-[45%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
          <PassageCardCover
            src={passage.coverImage}
            alt={passage.title}
            icon={passage.icon}
          />

          {/* Level Badge */}
          <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/90 text-white backdrop-blur-xs z-20 shadow-xs border border-white/15 tracking-wide">
            {getLevelLabel(passage.level)}
          </span>

          {/* Completed Badge */}
          {isCompleted && (
            <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Đã đọc</span>
            </span>
          )}
        </div>

        {/* Passage Info */}
        <div className="py-0.5 sm:py-0 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
          <div>
            {passage.category && (
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 block truncate mb-1">
                {passage.category}
              </span>
            )}
            <h3 className="text-[13.5px] sm:text-[14px] font-bold font-sans line-clamp-2 leading-[1.35] transition-colors text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
              {passage.title}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs text-slate-600 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[2.2] shrink-0" />
              {passage.duration || "4 min"}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#0059bb] dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
              <span>Đọc ngay</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-20">
      {/* 1. TOP HEADER WITH NAV TABS & SEARCH */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-48 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm bài đọc theo tên hoặc chủ đề"
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 transition-all"
              />
            </div>
          </div>
        }
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. STATS & HERO BANNER (CHUẨN 60-30-10 & AGENCY MINIMALISM) */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3.5 sm:pt-4 space-y-4">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#0059bb]/20">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
                Kho Bài Đọc Hiểu Ngữ Cảnh
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate max-w-xl">
                Kho bài đọc phân cấp chuẩn quốc tế, tra từ vựng ngữ cảnh một chạm và trắc nghiệm chuyên sâu.
              </p>
            </div>
          </div>

          {/* Minimal Inline Metric Cluster */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Tổng bài đọc:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">
                {READING_PASSAGES_DATA.length} bài
              </span>
            </div>
            <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Vốn từ:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">
                ~{totalWordsAvailable.toLocaleString()} từ
              </span>
            </div>
          </div>
        </div>

        {/* 2.2 CATEGORY FILTER TABS (Preserved in Zustand Store) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-[#0059bb] text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#0059bb]/50 hover:text-[#0059bb] dark:hover:text-sky-400"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PASSAGES CANVAS */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-8">
        {/* CASE A: SEARCH RESULTS */}
        {searchFilteredPassages ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Kết quả tìm kiếm cho: &ldquo;{listingSearch}&rdquo; ({searchFilteredPassages.length} bài)
              </h2>
            </div>
            {searchFilteredPassages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                <p className="font-semibold text-sm">Không tìm thấy bài đọc nào phù hợp</p>
                <p className="mt-1">Hãy thử tìm với từ khóa khác hoặc xóa ô tìm kiếm</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {searchFilteredPassages.map(renderPassageCard)}
              </div>
            )}
          </div>
        ) : tabFilteredPassages ? (
          /* CASE B: TAB FILTERED VIEW (Basic, Intermediate, Advanced, Completed) */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Danh sách bài đọc: {categoryTabs.find((t) => t.id === activeCategoryTab)?.label} ({tabFilteredPassages.length} bài)
              </h2>
            </div>
            {tabFilteredPassages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                <p className="font-semibold text-sm">Chưa có bài đọc nào trong danh mục này</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {tabFilteredPassages.map(renderPassageCard)}
              </div>
            )}
          </div>
        ) : (
          /* CASE C: DEFAULT DUAL ROW BROWSE (All mode) */
          <>
            {/* HÀNG 1: BÀI ĐỌC CƠ BẢN (A1 - A2) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono font-bold text-xs border border-blue-200/70 dark:border-blue-800/60 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài đọc cơ bản
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleBasic}
                  className="px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:border-[#0059bb]/50 dark:hover:border-sky-500/50 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {displayedBasicPassages.map(renderPassageCard)}
              </div>
            </div>

            {/* HÀNG 2: BÀI ĐỌC NÂNG CAO (B1 - C2) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs border border-indigo-200/70 dark:border-indigo-800/60 shadow-2xs">
                    B1 - C2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài đọc nâng cao
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleAdvanced}
                  className="px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:border-[#0059bb]/50 dark:hover:border-sky-500/50 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {displayedAdvancedPassages.map(renderPassageCard)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
