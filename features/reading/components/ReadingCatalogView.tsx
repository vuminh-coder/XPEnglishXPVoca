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

  const [listingSearch, setListingSearch] = useState("");
  const [completedPassageIds, setCompletedPassageIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("xp_reading_completed_passages");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch user reading progress from server and merge with localStorage
  useEffect(() => {
    let isMounted = true;
    async function fetchProgress() {
      try {
        const res = await fetch("/api/reading/progress");
        if (res.ok) {
          const data = await res.json();
          if (data.success && isMounted) {
            setCompletedPassageIds((prev) => {
              const combined = Array.from(new Set([...prev, ...(data.completedPassages || [])]));
              try {
                localStorage.setItem("xp_reading_completed_passages", JSON.stringify(combined));
              } catch {}
              return combined;
            });
          }
        }
      } catch {}
    }
    fetchProgress();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const [displayedBasicPassages, setDisplayedBasicPassages] = useState<ReadingPassage[]>(() => {
    const easyPool = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic =
      basicPool.length > 0
        ? basicPool
        : READING_PASSAGES_DATA.slice(0, Math.ceil(READING_PASSAGES_DATA.length / 2));
    return safeBasic.slice(0, 8);
  });

  const [displayedAdvancedPassages, setDisplayedAdvancedPassages] = useState<ReadingPassage[]>(() => {
    const hardPool = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0
        ? advPool
        : READING_PASSAGES_DATA.slice(Math.ceil(READING_PASSAGES_DATA.length / 2));
    return safeAdv.slice(0, 8);
  });

  const pickRandomPassages = (pool: ReadingPassage[], count: number) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const easyPool = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const hardPool = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic =
      basicPool.length > 0
        ? basicPool
        : READING_PASSAGES_DATA.slice(0, Math.ceil(READING_PASSAGES_DATA.length / 2));
    const safeAdv =
      advPool.length > 0
        ? advPool
        : READING_PASSAGES_DATA.slice(Math.ceil(READING_PASSAGES_DATA.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicPassages(
        safeBasic
          .filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
      setDisplayedAdvancedPassages(
        safeAdv
          .filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
    } else {
      setDisplayedBasicPassages(pickRandomPassages(safeBasic, 8));
      setDisplayedAdvancedPassages(pickRandomPassages(safeAdv, 8));
    }
  }, [listingSearch]);

  const handleShuffleBasic = () => {
    const easyPool = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic =
      basicPool.length > 0
        ? basicPool
        : READING_PASSAGES_DATA.slice(0, Math.ceil(READING_PASSAGES_DATA.length / 2));
    setDisplayedBasicPassages(pickRandomPassages(safeBasic, 8));
  };

  const handleShuffleAdvanced = () => {
    const hardPool = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter(
      (p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0
        ? advPool
        : READING_PASSAGES_DATA.slice(Math.ceil(READING_PASSAGES_DATA.length / 2));
    setDisplayedAdvancedPassages(pickRandomPassages(safeAdv, 8));
  };

  const handleOpenPassage = (passageId: string) => {
    router.push(`/study/reading/${passageId}`);
  };

  const totalWordsAvailable = READING_PASSAGES_DATA.reduce(
    (acc, p) => acc + (p.wordCount || 0),
    0
  );

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
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3.5 sm:pt-4">
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
      </div>

      {/* 3. DUAL ROW PASSAGE BROWSE */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-8">
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
            {displayedBasicPassages.map((passage) => {
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
            })}
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
            {displayedAdvancedPassages.map((passage) => {
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
