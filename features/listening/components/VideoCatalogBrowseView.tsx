"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Search,
  Sparkles,
  Play,
  Clock,
  PlusCircle,
  X,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ListChecks,
} from "lucide-react";
import { VideoRequestModal } from "./VideoRequestModal";
import { VideoComprehensionQuizModal } from "./VideoComprehensionQuizModal";
import { ShimmerBox } from "./LoadingSkeletons";
import {
  useVideoCatalogStore,
  buildLessonQueryKey,
  VideoCatalogCategory,
  VideoCatalogLessonItem,
} from "@/stores";

export type { VideoCatalogCategory, VideoCatalogLessonItem };

interface VideoCatalogBrowseViewProps {
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
}

const CEFR_LEVELS = ["Tất cả", "A1", "A2", "B1", "B2", "C1", "C2"];

export const VideoCatalogBrowseView: React.FC<VideoCatalogBrowseViewProps> = ({
  onSelectVideoLesson,
}) => {
  // Global SWR Cache & Filter Store
  const categories = useVideoCatalogStore((s) => s.categories);
  const filters = useVideoCatalogStore((s) => s.filters);
  const setFilter = useVideoCatalogStore((s) => s.setFilter);
  const isLessonsLoading = useVideoCatalogStore((s) => s.isLessonsLoading);
  const fetchCategories = useVideoCatalogStore((s) => s.fetchCategories);
  const fetchLessons = useVideoCatalogStore((s) => s.fetchLessons);
  const invalidateCache = useVideoCatalogStore((s) => s.invalidateCache);

  const selectedCategory = filters.selectedCategory;
  const selectedLevel = filters.selectedLevel;
  const searchQuery = filters.searchQuery;
  const sortBy = filters.sortBy;

  const setSelectedCategory = (cat: string) => setFilter("selectedCategory", cat);
  const setSelectedLevel = (lvl: string) => setFilter("selectedLevel", lvl);
  const setSearchQuery = (q: string) => setFilter("searchQuery", q);

  // Synchronous Frame 0 Cache Hit (0ms instant UI return)
  const queryKey = buildLessonQueryKey(filters);
  const cachedLessons = useVideoCatalogStore((s) => s.lessonsCache[queryKey]?.data);
  const [lessons, setLessons] = useState<VideoCatalogLessonItem[]>(() => cachedLessons || []);

  useEffect(() => {
    if (cachedLessons) {
      setLessons(cachedLessons);
    }
  }, [cachedLessons]);

  // Loading indicator only displays when there is ZERO data in cache
  const isLoadingLessons = isLessonsLoading && lessons.length === 0;

  // Category horizontal scroll state
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  };

  useEffect(() => {
    checkCategoryScroll();
    window.addEventListener("resize", checkCategoryScroll);
    return () => window.removeEventListener("resize", checkCategoryScroll);
  }, [categories]);

  const handleScrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkCategoryScroll, 350);
    }
  };

  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedQuizLesson, setSelectedQuizLesson] = useState<{ id: string; title: string } | null>(
    null
  );

  // 1. Load Categories via SWR (0ms if cached, background revalidate if stale)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 2. Load Lessons via SWR with query debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLessons();
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedLevel, searchQuery, sortBy, fetchLessons]);

  // Manual force refresh handler
  const handleForceRefresh = async () => {
    invalidateCache("all");
    await Promise.all([
      fetchCategories({ forceRefresh: true }),
      fetchLessons(undefined, { forceRefresh: true }),
    ]);
  };

  return (
    <div className="space-y-5">
      {/* 1. HERO SPOTLIGHT & RECOMMENDATION BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden">
        {/* Ambient subtle light-blue gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/70 via-sky-50/20 to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Luyện Nghe & Đọc Hiểu Đa Giác Quan Qua YouTube
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-1 leading-relaxed">
              Phụ đề song ngữ căn chỉnh chuẩn theo từng giây, phát hiện danh từ riêng và bộ bài tập trắc nghiệm đọc hiểu do AI tạo lập.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleForceRefresh}
              disabled={isLessonsLoading}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
              title="Làm mới danh sách video từ máy chủ"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLessonsLoading ? "animate-spin text-[#0059bb]" : "text-slate-500 dark:text-slate-400"}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Đề Xuất Video Mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <div className="space-y-3">
        {/* Category Chips Bar with Edge Gradient Masks & Scroll Arrows */}
        <div className="relative group/categories">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScrollCategories("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0059bb] transition-all cursor-pointer"
              aria-label="Cuộn danh mục sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScrollCategories("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0059bb] transition-all cursor-pointer"
              aria-label="Cuộn danh mục sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Subtle gradient masks preventing cut-off text */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 to-transparent z-10" />
          )}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50/90 dark:from-slate-950/90 to-transparent z-10" />
          )}

          <div
            ref={categoryScrollRef}
            onScroll={checkCategoryScroll}
            className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar px-1"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer select-none ${
                selectedCategory === "all"
                  ? "bg-[#0059bb] border-[#0059bb] text-white shadow-2xs font-bold"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              Tất cả chủ đề
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer select-none ${
                  selectedCategory === cat.slug
                    ? "bg-[#0059bb] border-[#0059bb] text-white shadow-2xs font-bold"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Filters: Search + Level + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input (Standardized h-10) */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm video theo tiêu đề, kênh YouTube, chủ đề..."
              className="w-full h-10 pl-10 pr-9 rounded-xl text-xs sm:text-sm border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto">
            {/* CEFR Level filter with Apple-grade motion sliding indicator */}
            <div className="h-10 flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs relative">
              {CEFR_LEVELS.map((lvl) => {
                const isActive = selectedLevel === lvl;
                return (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`relative px-2.5 sm:px-3 h-full rounded-lg text-xs font-bold transition-colors cursor-pointer select-none z-10 ${
                      isActive
                        ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="videoCefrFilterIndicator"
                        className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{lvl}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter feedback */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isLoadingLessons ? "Đang tải video..." : "Danh sách video"}
            </span>
            {selectedLevel !== "Tất cả" && (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 font-bold font-mono text-[11px] border border-blue-200/60 dark:border-blue-800/40">
                Level {selectedLevel}
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px] border border-slate-200 dark:border-slate-700">
                {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              </span>
            )}
          </div>

          {searchQuery && (
            <span className="text-[11px] text-slate-400 font-medium">
              Khớp với &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* 3. VIDEO CARDS GRID WITH SKELETON LOADING (Rule 1: Shimmer Skeleton) */}
      {isLoadingLessons ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }, (_, i) => (
            <VideoCardShimmer key={i} />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-2xs">
          <Video className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
          <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
            Không tìm thấy video nào phù hợp với bộ lọc hiện tại.
          </p>
          <p className="text-slate-500 mt-1">
            Hãy thử tìm từ khóa khác hoặc gửi đề xuất video mới cho cộng đồng!
          </p>
          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            Đề Xuất Video Mới
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectVideoLesson?.(lesson)}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 hover:shadow-lg shadow-2xs transition-all cursor-pointer flex flex-col group relative overflow-hidden select-none"
            >
              {/* 1. VISUAL COVER BANNER: Full-Bleed 16/10 Header (Chuẩn trang Thi thử đề & Kho từ vựng) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-950 border-b border-slate-100 dark:border-slate-800/80">
                <img
                  src={lesson.thumbnailUrl}
                  alt={lesson.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />

                {/* Soft Directional Scrim (Leaves top & center bright, protects readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Subtle Ambient Light Tone on Hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

                {/* Top Header Bar trên ảnh (Ethereal Frosted Glassmorphism twin badges) */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
                  {/* Top-Left: CEFR Level Badge */}
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap flex items-center gap-1">
                    <span>Level {lesson.cefrLevel}</span>
                  </span>

                  {/* Top-Right: Duration Badge */}
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs tabular-nums flex items-center gap-1 shrink-0">
                    <Clock className="w-2.5 h-2.5 text-white/95 stroke-[2.2]" />
                    <span>{lesson.durationFormatted}</span>
                  </span>
                </div>

                {/* Center Glass Play Orb: Smooth Fade & Subtle Scale on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-4.5 h-4.5 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* 2. CARD BODY & FOOTER CONTAINER */}
              <div className="px-3 pt-2 pb-2.5 sm:px-3.5 sm:pt-2 sm:pb-2.5 flex-1 flex flex-col justify-between space-y-1.5 min-w-0 bg-white dark:bg-slate-900">
                <div>
                  {/* Metadata Row: Category Name (Left) & Sentence Count (Right) */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-0.5 min-w-0">
                    <span className="truncate font-semibold text-slate-500 dark:text-slate-400 text-[11px]">
                      {lesson.category?.name || "Tiếng Anh"}
                    </span>
                    <span className="font-mono tabular-nums shrink-0 whitespace-nowrap text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <ListChecks className="w-3 h-3 text-slate-400" />
                      <span>{lesson.totalSentences} câu</span>
                    </span>
                  </div>

                  {/* Title with Dynamic 2-Line Clamp */}
                  <h4
                    className="text-[13.5px] font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors"
                    title={lesson.title}
                  >
                    {lesson.title}
                  </h4>
                </div>

                {/* Card Footer: Balanced Action Targets (ExamPaperCard Style - Rule #18 Clean Primary CTA) */}
                <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <Link
                    href={`/study/dictation/video/comprehension/${lesson.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="group/ai h-8 px-3 rounded-xl text-xs font-bold text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300 bg-slate-50 hover:bg-violet-50/70 dark:bg-slate-800/80 dark:hover:bg-violet-950/40 border border-slate-200/90 dark:border-slate-700/80 hover:border-violet-300 dark:hover:border-violet-600/60 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 shadow-2xs"
                    title="Làm bài trắc nghiệm đọc hiểu AI (+25 XP)"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 group-hover/ai:scale-110 transition-transform shrink-0" />
                    <span>Đọc hiểu AI</span>
                  </Link>

                  <div className="h-8 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 select-none group/btn">
                    <span>Học Ngay</span>
                    <Play className="w-3 h-3 fill-white group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. MODALS */}
      <VideoRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {selectedQuizLesson && (
        <VideoComprehensionQuizModal
          isOpen={!!selectedQuizLesson}
          lessonId={selectedQuizLesson.id}
          lessonTitle={selectedQuizLesson.title}
          onClose={() => setSelectedQuizLesson(null)}
        />
      )}
    </div>
  );
};

function VideoCardShimmer() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none">
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-800">
        <ShimmerBox className="w-full h-full" />
        <div className="absolute top-2.5 left-2.5 w-14 h-5 rounded-lg bg-slate-900/40" />
        <div className="absolute top-2.5 right-2.5 w-12 h-5 rounded-lg bg-slate-900/40" />
      </div>
      <div className="px-3 pt-2 pb-2.5 sm:px-3.5 sm:pt-2 sm:pb-2.5 flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <ShimmerBox className="h-3.5 w-24 rounded" />
            <ShimmerBox className="h-3.5 w-12 rounded" />
          </div>
          <ShimmerBox className="h-4 w-full rounded mb-1" />
          <ShimmerBox className="h-4 w-3/4 rounded" />
        </div>
        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <ShimmerBox className="h-8 w-24 rounded-xl" />
          <ShimmerBox className="h-8 w-24 rounded-xl bg-blue-600/30" />
        </div>
      </div>
    </div>
  );
}
