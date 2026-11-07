"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen,
  RefreshCw,
  Clock,
  Check,
  ArrowRight,
  FileText,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
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
const CARDS_PER_SECTION = 4;

const CATEGORY_LABELS_VI: Record<string, string> = {
  Workplace: "Công sở",
  Business: "Kinh doanh",
  Travel: "Du lịch",
  "Daily Life": "Đời sống",
  Science: "Khoa học",
  Technology: "Công nghệ",
  Health: "Sức khỏe",
  Education: "Giáo dục",
  Environment: "Môi trường",
  Culture: "Văn hóa",
  Psychology: "Tâm lý học",
  Economics: "Kinh tế",
  History: "Lịch sử",
  Art: "Nghệ thuật",
};

export function formatReadingCategoryVi(category?: string): string {
  if (!category) return "Đời sống";
  return CATEGORY_LABELS_VI[category] || category;
}

function PassageCardCover({
  src,
  alt,
}: {
  src?: string;
  alt: string;
  icon?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-slate-200 dark:from-slate-800 dark:to-slate-900 select-none">
        <div className="w-11 h-11 rounded-2xl bg-white/40 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 flex items-center justify-center shadow-2xs">
          <BookOpen className="w-5 h-5 text-[#0059bb] dark:text-sky-400" />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover lg:group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
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

  // Deterministic seed-based ordering for the full horizontal carousel (4 cards per view)
  const orderedBasicPassages = React.useMemo(() => {
    if (basicPool.length === 0) return [];
    const offset = (shuffleSeedBasic * CARDS_PER_SECTION) % basicPool.length;
    return [...basicPool.slice(offset), ...basicPool.slice(0, offset)];
  }, [basicPool, shuffleSeedBasic]);

  const orderedAdvancedPassages = React.useMemo(() => {
    if (advancedPool.length === 0) return [];
    const offset = (shuffleSeedAdvanced * CARDS_PER_SECTION) % advancedPool.length;
    return [...advancedPool.slice(offset), ...advancedPool.slice(0, offset)];
  }, [advancedPool, shuffleSeedAdvanced]);

  // Tab Filtered Passages
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
        formatReadingCategoryVi(p.category).toLowerCase().includes(q) ||
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

  const renderPassageCard = (passage: ReadingPassage, extraClassName = "") => {
    const isCompleted = completedPassageIds.includes(passage.id);

    return (
      <Link
        key={passage.id}
        href={`/study/reading/${passage.id}`}
        prefetch={true}
        className={`rounded-2xl bg-white dark:bg-slate-900 lg:hover:-translate-y-0.5 lg:hover:shadow-lg lg:hover:shadow-slate-900/[0.04] shadow-2xs transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col group select-none active:scale-[0.99] isolate ${extraClassName}`}
      >
        {/* Unbroken 4-corner & 4-edge 1px border overlay rendered above GPU image layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-200 dark:border-slate-800 lg:group-hover:border-[#0059bb]/70 dark:lg:group-hover:border-sky-500/70 transition-colors duration-300 z-30"
        />

        {/* 1. VISUAL COVER BANNER (No bg-slate-950 black bleed or double border-radius clip) */}
        <div className="relative h-36 sm:h-[120px] w-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800/80">
          <PassageCardCover
            src={passage.coverImage}
            alt={passage.title}
            icon={passage.icon}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 sm:top-2.5 inset-x-3 sm:inset-x-2.5 flex items-center justify-between gap-2 z-20">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/60 text-white backdrop-blur-md border border-white/20 shadow-2xs whitespace-nowrap">
              {getLevelLabel(passage.level)}
            </span>

            {isCompleted ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md shadow-2xs flex items-center gap-1 whitespace-nowrap">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Đã đọc</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-950/60 text-white/95 backdrop-blur-md border border-white/20 shadow-2xs tabular-nums flex items-center gap-1 shrink-0">
                <Clock className="w-2.5 h-2.5 text-white/90 stroke-[2]" />
                <span>{passage.duration || "4 min"}</span>
              </span>
            )}
          </div>
        </div>

        {/* 2. BALANCED CARD BODY & SINGLE-LINE FOOTER */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-2 sm:gap-2.5 min-w-0 bg-white dark:bg-slate-900">
          <div className="space-y-1">
            {/* Single Clean Eyebrow Metadata Row in Vietnamese */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="truncate">{formatReadingCategoryVi(passage.category)}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-mono tabular-nums shrink-0">{passage.wordCount || 150} từ</span>
            </div>

            {/* Title: natural height on single-card Mobile view, fixed 2-line min-height on multi-column Tablet/Desktop */}
            <h3
              className="text-[15px] font-bold font-sans line-clamp-2 sm:min-h-[2.6rem] leading-snug transition-colors text-slate-900 dark:text-white lg:group-hover:text-[#0059bb] dark:lg:group-hover:text-sky-400"
              title={passage.title}
            >
              {passage.title}
            </h3>
          </div>

          {/* Card Footer: Single-Line Non-Wrapping Metadata + Secondary Pill (Rule 18) */}
          <div className="pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>{passage.questions?.length || 5} câu hỏi</span>
            </span>

            <span className="h-7 px-3 rounded-full bg-slate-100 dark:bg-slate-800 lg:group-hover:bg-[#0059bb] text-slate-700 dark:text-slate-200 lg:group-hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shrink-0 whitespace-nowrap">
              <span>Đọc bài</span>
              <ArrowRight className="w-3 h-3 stroke-[2.2] lg:group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 flex flex-col font-sans select-none pb-16">
      {/* 1. MOBILE-ONLY TOP HEADER (Hidden on Desktop lg:hidden, Preserved on Mobile) */}
      <AppTopHeader
        className="lg:hidden"
        showGamificationStats={false}
        hideMobileSearch={false}
        searchProps={{
          value: listingSearch,
          onChange: setListingSearch,
          placeholder: "Tìm bài đọc, chủ đề...",
          onClear: () => setListingSearch(""),
        }}
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. SPACIOUS CENTERED READING CATALOG WORKSPACE */}
      <div className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pt-3.5 sm:pt-4 lg:pt-5 pb-8 space-y-4 sm:space-y-5">
        {/* CATEGORY FILTER PILLS + DESKTOP INLINE SEARCH */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar max-w-full">
            {categoryTabs.map((tab) => {
              const isActive = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer select-none ${
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

          {/* Desktop Search Box (Since AppTopHeader is hidden on Desktop) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="relative w-64 xl:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                placeholder="Tìm bài đọc, chủ đề..."
                className="w-full h-9 pl-9 pr-8 text-xs sm:text-sm font-medium rounded-full bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 transition-all shadow-2xs"
              />
              {listingSearch && (
                <button
                  type="button"
                  onClick={() => setListingSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CASE A: SEARCH RESULTS */}
        {searchFilteredPassages ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                Kết quả tìm kiếm cho: &ldquo;{listingSearch}&rdquo; ({searchFilteredPassages.length} bài)
              </h2>
            </div>
            {searchFilteredPassages.length === 0 ? (
              <div className="py-16 text-center text-slate-400 dark:text-slate-500 text-xs">
                <p className="font-semibold text-sm">Không tìm thấy bài đọc nào phù hợp</p>
                <p className="mt-1">Hãy thử tìm với từ khóa khác hoặc xóa ô tìm kiếm</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {searchFilteredPassages.map((p) => renderPassageCard(p))}
              </div>
            )}
          </div>
        ) : tabFilteredPassages ? (
          /* CASE B: TAB FILTERED VIEW (Basic, Intermediate, Advanced, Completed) */
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                {categoryTabs.find((t) => t.id === activeCategoryTab)?.label} ({tabFilteredPassages.length} bài)
              </h2>
            </div>
            {tabFilteredPassages.length === 0 ? (
              <div className="py-16 text-center text-slate-400 dark:text-slate-500 text-xs">
                <p className="font-semibold text-sm">Chưa có bài đọc nào trong danh mục này</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {tabFilteredPassages.map((p) => renderPassageCard(p))}
              </div>
            )}
          </div>
        ) : (
          /* CASE C: DEFAULT AIRY 2-ROW HORIZONTAL CAROUSEL (4 Cards per View, Slide 4 at a Time) */
          <div className="space-y-5 sm:space-y-6">
            {/* HÀNG 1: BÀI ĐỌC CƠ BẢN (A1 - A2) */}
            <HorizontalReadingRow
              badgeText="A1 - A2"
              badgeVariant="blue"
              title="Bài đọc cơ bản & giao tiếp"
              passages={orderedBasicPassages}
              renderCard={renderPassageCard}
            />

            {/* HÀNG 2: BÀI ĐỌC NÂNG CAO (B1 - C2) */}
            <HorizontalReadingRow
              badgeText="B1 - C2"
              badgeVariant="indigo"
              title="Bài đọc học thuật & chuyên sâu"
              passages={orderedAdvancedPassages}
              renderCard={renderPassageCard}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface HorizontalReadingRowProps {
  badgeText: string;
  badgeVariant: "blue" | "indigo";
  title: string;
  passages: ReadingPassage[];
  renderCard: (passage: ReadingPassage, extraClassName?: string) => React.ReactNode;
}

function HorizontalReadingRow({
  badgeText,
  badgeVariant,
  title,
  passages,
  renderCard,
}: HorizontalReadingRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isMobileView, setIsMobileView] = useState(false);

  // Group passages into pages of 4 cards so each horizontal slide displays 4 cards on Desktop
  const slides = React.useMemo(() => {
    const chunks: ReadingPassage[][] = [];
    for (let i = 0; i < passages.length; i += CARDS_PER_SECTION) {
      chunks.push(passages.slice(i, i + CARDS_PER_SECTION));
    }
    return chunks;
  }, [passages]);

  const totalPages = isMobileView ? passages.length : slides.length;

  const updateScrollBounds = useCallback(() => {
    if (!scrollRef.current) return;
    const mobile = typeof window !== "undefined" && window.innerWidth < 640;
    setIsMobileView(mobile);
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
    if (!isProgrammaticScrollRef.current && clientWidth > 0) {
      const gap = mobile ? 16 : 20;
      const maxSteps = mobile ? passages.length : slides.length;
      const page = Math.round(scrollLeft / (clientWidth + gap));
      setCurrentPage(Math.max(0, Math.min(maxSteps - 1, page)));
    }
  }, [passages.length, slides.length]);

  useEffect(() => {
    updateScrollBounds();
    window.addEventListener("resize", updateScrollBounds);
    return () => window.removeEventListener("resize", updateScrollBounds);
  }, [updateScrollBounds, passages]);

  const scrollToDirection = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const mobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxSteps = mobile ? passages.length : slides.length;
    const gap = mobile ? 16 : 20;
    const targetPage = direction === "left" ? currentPage - 1 : currentPage + 1;
    const clamped = Math.max(0, Math.min(maxSteps - 1, targetPage));
    setCurrentPage(clamped);
    setCanScrollLeft(clamped > 0);
    setCanScrollRight(clamped < maxSteps - 1);
    isProgrammaticScrollRef.current = true;

    let targetLeft = clamped * (scrollRef.current.clientWidth + gap);
    if (mobile) {
      const cards = scrollRef.current.querySelectorAll("a");
      const cardEl = cards[clamped] as HTMLElement | undefined;
      if (cardEl) targetLeft = cardEl.offsetLeft;
    } else {
      const slideEl = scrollRef.current.children[clamped] as HTMLElement | undefined;
      if (slideEl) targetLeft = slideEl.offsetLeft;
    }

    scrollRef.current.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      updateScrollBounds();
    }, 450);
  };

  if (passages.length === 0) return null;

  return (
    <section className="space-y-3 min-w-0">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs whitespace-nowrap shrink-0 border ${
              badgeVariant === "blue"
                ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border-blue-200/70 dark:border-blue-800/60"
                : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-800/60"
            }`}
          >
            {badgeText}
          </span>
          <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight truncate">
            {title}
          </h2>
        </div>

        {/* Horizontal Carousel Navigation Controls (Slide 4 Cards on Desktop, 1 Full Card on Mobile) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 mr-1 tabular-nums">
            {currentPage + 1}/{totalPages}
          </span>

          <button
            type="button"
            onClick={() => scrollToDirection("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 lg:hover:text-[#0059bb] dark:lg:hover:text-sky-400 lg:hover:border-[#0059bb]/50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Lướt sang trái"
            aria-label="Lướt sang trái"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={() => scrollToDirection("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 lg:hover:text-[#0059bb] dark:lg:hover:text-sky-400 lg:hover:border-[#0059bb]/50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Lướt sang phải"
            aria-label="Lướt sang phải"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container:
          - py-2 -my-2 prevents overflow-x-auto from slicing off top/bottom borders & hover lift!
          - On Mobile (< sm): 1 complete card per view (w-full min-w-full), zero half-cut cards on the right edge.
          - On Desktop (lg): 4 complete cards per view (lg:grid-cols-4). */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollBounds}
          className="flex items-start sm:items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 -my-2 snap-x snap-mandatory"
        >
          {slides.map((slidePassages, slideIdx) => (
            <div
              key={slideIdx}
              className="contents sm:grid sm:w-full sm:min-w-full sm:shrink-0 sm:snap-start sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
            >
              {slidePassages.map((passage) =>
                renderCard(
                  passage,
                  "w-full min-w-full sm:w-auto sm:min-w-0 shrink-0 snap-start sm:snap-align-none"
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
