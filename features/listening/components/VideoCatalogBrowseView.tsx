"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ListChecks,
  Film,
  Heart,
  Flame,
  Tv,
  Brain,
  Layers,
  Briefcase,
  Globe,
} from "lucide-react";
import { VideoRequestModal } from "./VideoRequestModal";
import { VideoComprehensionQuizModal } from "./VideoComprehensionQuizModal";
import { VideoCategoryIcon } from "./VideoCategoryIcon";
import { getLessonCoverImage } from "../utils/lessonImageMapper";
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

  // Check if user is browsing the comprehensive "All Topics" hub overview
  const isBrowsingAll =
    selectedCategory === "all" &&
    !searchQuery.trim() &&
    selectedLevel === "Tất cả";

  // Filter lessons per featured topic for horizontal scrolling display
  const romanceLessons = useMemo(() => {
    return lessons.filter(
      (l) =>
        l.category?.slug === "romance-cinema" ||
        l.category?.id === "cat_romance_cinema"
    );
  }, [lessons]);

  const inspirationalLessons = useMemo(() => {
    return lessons.filter(
      (l) =>
        l.category?.slug === "inspirational-life" ||
        l.category?.id === "cat_inspirational_life"
    );
  }, [lessons]);

  const sitcomLessons = useMemo(() => {
    return lessons.filter(
      (l) =>
        l.category?.slug === "classic-sitcoms" ||
        l.category?.id === "cat_classic_sitcoms"
    );
  }, [lessons]);

  const animationLessons = useMemo(() => {
    return lessons.filter(
      (l) =>
        l.category?.slug === "animation-pixar-disney" ||
        l.category?.id === "cat_animation_pixar_disney"
    );
  }, [lessons]);

  // Modular lessons that already have full verbatim data, subtitles, and AI quiz
  const hasDataLessons = useMemo(() => {
    return lessons.filter((l) => l.hasFullData || !l.id.startsWith("mov_"));
  }, [lessons]);

  const tedLessons = useMemo(() => {
    const tedSlugs = new Set(["ted-ed", "ielts-listening"]);
    return lessons.filter(
      (l) =>
        (l.hasFullData || !l.id.startsWith("mov_")) &&
        (tedSlugs.has(l.category?.slug || "") ||
          l.id.includes("julian_treasure") ||
          l.id.includes("simon_sinek") ||
          l.id.includes("matt_walker") ||
          l.id.includes("bilingual_brain") ||
          l.id.includes("alex_gendler") ||
          l.id.includes("habits") ||
          l.id.includes("steve_jobs"))
    );
  }, [lessons]);

  const businessTechLessons = useMemo(() => {
    const techSlugs = new Set(["science-tech", "finance-wealth", "career-business", "toeic-listening"]);
    return lessons.filter(
      (l) =>
        (l.hasFullData || !l.id.startsWith("mov_")) &&
        (techSlugs.has(l.category?.slug || "") ||
          l.id.includes("jensen_huang") ||
          l.id.includes("psychology_of_money") ||
          l.id.includes("careervidz") ||
          l.id.includes("meeting") ||
          l.id.includes("phone_call") ||
          l.id.includes("interstellar"))
    );
  }, [lessons]);

  const dailyLifeLessons = useMemo(() => {
    const excludedIds = new Set([
      ...tedLessons.map((l) => l.id),
      ...businessTechLessons.map((l) => l.id),
    ]);
    return lessons.filter(
      (l) => (l.hasFullData || !l.id.startsWith("mov_")) && !excludedIds.has(l.id)
    );
  }, [lessons, tedLessons, businessTechLessons]);

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* 1. HERO SPOTLIGHT & RECOMMENDATION BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden">
        {/* Ambient subtle light-blue gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/70 via-sky-50/20 to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800/40 text-rose-700 dark:text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Film className="w-3 h-3 text-rose-600 dark:text-rose-400" />
              <span>Kho Phim Điện Ảnh & Video Kéo Dài Trên 5 Phút</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Luyện Nghe & Đọc Hiểu Đa Giác Quan Qua YouTube
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-1 leading-relaxed">
              Trích đoạn phim lãng mạn, sitcom hài hước, hoạt hình Pixar và bài học truyền cảm hứng đạt hàng triệu view, phân câu rõ ràng và bài tập đọc hiểu AI.
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
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isLessonsLoading
                    ? "animate-spin text-[#0059bb]"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              />
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer select-none flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-[#0059bb] border-[#0059bb] text-white shadow-2xs font-bold"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <Layers className={`w-3.5 h-3.5 shrink-0 ${selectedCategory === "all" ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>Tất cả chủ đề</span>
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer select-none flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? "bg-[#0059bb] border-[#0059bb] text-white shadow-2xs font-bold"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <VideoCategoryIcon
                  slug={cat.slug}
                  iconName={cat.icon}
                  isActive={selectedCategory === cat.slug}
                  className="w-3.5 h-3.5 shrink-0"
                />
                <span>{cat.name}</span>
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
              placeholder="Tìm video theo phim, trích đoạn, nhân vật, kênh..."
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

      {/* 3. VIDEO CONTENT CANVAS */}
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
            Hãy thử tìm từ khóa khác hoặc bấm &ldquo;Tất cả chủ đề&rdquo; để khám phá kho phim!
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedLevel("Tất cả");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            Xem Tất Cả Video
          </button>
        </div>
      ) : isBrowsingAll ? (
        /* ==================================================================== */
        /* MULTI-ROW TOPIC SHOWCASE (Thay thế cấu trúc hàng cơ bản như bên Audio) */
        /* ==================================================================== */
        <div className="space-y-7 sm:space-y-8">
          {/* ROW 1: PHIM LÃNG MẠN & CẢM XÚC */}
          <HorizontalVideoTopicRow
            title="Phim Lãng Mạn & Cảm Xúc"
            icon={<Heart className="w-5 h-5 text-rose-500 fill-rose-500/15 shrink-0" />}
            categorySlug="romance-cinema"
            themeColor="rose"
            lessons={romanceLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 2: PHIM TRUYỀN CẢM HỨNG & TRIẾT LÝ SỐNG */}
          <HorizontalVideoTopicRow
            title="Phim Truyền Cảm Hứng & Triết Lý Sống"
            icon={<Flame className="w-5 h-5 text-amber-500 fill-amber-500/15 shrink-0" />}
            categorySlug="inspirational-life"
            themeColor="amber"
            lessons={inspirationalLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 3: SITCOM KINH ĐIỂN & HÀI KỊCH ĐỜI SỐNG */}
          <HorizontalVideoTopicRow
            title="Sitcom Kinh Điển & Hài Kịch Đời Sống"
            icon={<Tv className="w-5 h-5 text-[#0059bb] dark:text-sky-400 shrink-0" />}
            categorySlug="classic-sitcoms"
            themeColor="blue"
            lessons={sitcomLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 4: HOẠT HÌNH PIXAR & DISNEY */}
          <HorizontalVideoTopicRow
            title="Hoạt Hình Pixar & Disney"
            icon={<Sparkles className="w-5 h-5 text-purple-500 fill-purple-500/15 shrink-0" />}
            categorySlug="animation-pixar-disney"
            themeColor="purple"
            lessons={animationLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 5: DIỄN THUYẾT TED-ED & PHÁT TRIỂN BẢN THÂN (BÀI HỌC CÓ ĐỦ DATA) */}
          <HorizontalVideoTopicRow
            title="Diễn Thuyết TED-Ed & Phát Triển Bản Thân"
            icon={<Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            categorySlug="ted-ed"
            themeColor="emerald"
            lessons={tedLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 6: CÔNG NGHỆ, TÀI CHÍNH & PHỎNG VẤN QUỐC TẾ */}
          <HorizontalVideoTopicRow
            title="Công Nghệ, Tài Chính & Phỏng Vấn Quốc Tế"
            icon={<Briefcase className="w-5 h-5 text-[#0059bb] dark:text-sky-400 shrink-0" />}
            categorySlug="career-business"
            themeColor="blue"
            lessons={businessTechLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* ROW 7: GIAO TIẾP ĐỜI THỰC, DU LỊCH & KHÁM PHÁ BBC */}
          <HorizontalVideoTopicRow
            title="Giao Tiếp Đời Thực, Du Lịch & Khám Phá BBC"
            icon={<Globe className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />}
            categorySlug="daily-conversations"
            themeColor="emerald"
            lessons={dailyLifeLessons}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />
        </div>
      ) : (
        /* ==================================================================== */
        /* SINGLE TOPIC / FILTERED GRID (Khi người dùng chọn 1 chủ đề hoặc search)*/
        /* ==================================================================== */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {lessons.map((lesson) => (
            <VideoCardItem
              key={lesson.id}
              lesson={lesson}
              onSelectVideoLesson={onSelectVideoLesson}
            />
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

/**
 * REUSABLE VIDEO CARD ITEM COMPONENT
 * Clean UI/UX adhering to Rule #18 (Single Primary CTA) & Rule #20 (60-30-10 palette)
 */
const VideoCardItem: React.FC<{
  lesson: VideoCatalogLessonItem;
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
  className?: string;
}> = ({ lesson, onSelectVideoLesson, className = "" }) => {
  return (
    <motion.div
      key={lesson.id}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectVideoLesson?.(lesson)}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 hover:shadow-lg shadow-2xs transition-all cursor-pointer flex flex-col group relative overflow-hidden select-none ${className}`}
    >
      {/* 1. VISUAL COVER BANNER */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-950 border-b border-slate-100 dark:border-slate-800/80">
        <img
          src={lesson.thumbnailUrl}
          alt={lesson.title}
          onLoad={(e) => {
            const img = e.currentTarget;
            // YouTube returns a 120x90 JPEG placeholder when video ID is missing/private
            if (img.naturalWidth === 120 && img.naturalHeight === 90) {
              img.src = getLessonCoverImage({
                id: lesson.id,
                title: lesson.title,
                category: lesson.category?.name || lesson.category?.slug,
              });
            }
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = getLessonCoverImage({
              id: lesson.id,
              title: lesson.title,
              category: lesson.category?.name || lesson.category?.slug,
            });
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        />

        {/* Soft Directional Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap flex items-center gap-1">
            <span>Level {lesson.cefrLevel}</span>
          </span>

          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs tabular-nums flex items-center gap-1 shrink-0">
            <Clock className="w-2.5 h-2.5 text-white/95 stroke-[2.2]" />
            <span>{lesson.durationFormatted}</span>
          </span>
        </div>

        {/* Center Play Orb */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-4.5 h-4.5 fill-white translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* 2. CARD BODY & FOOTER */}
      <div className="px-3 pt-2 pb-2.5 sm:px-3.5 sm:pt-2 sm:pb-2.5 flex-1 flex flex-col justify-between space-y-1.5 min-w-0 bg-white dark:bg-slate-900">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs mb-0.5 min-w-0">
            <span className="truncate font-semibold text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5">
              <VideoCategoryIcon
                slug={lesson.category?.slug}
                className="w-3 h-3 shrink-0"
              />
              <span className="truncate">{lesson.category?.name || "Tiếng Anh"}</span>
            </span>
            <span className="font-mono tabular-nums shrink-0 whitespace-nowrap text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <ListChecks className="w-3 h-3 text-slate-400" />
              <span>{lesson.totalSentences} câu</span>
            </span>
          </div>

          <h4
            className="text-[13.5px] font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors"
            title={lesson.title}
          >
            {lesson.title}
          </h4>
        </div>

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
  );
};

interface HorizontalVideoTopicRowProps {
  title: string;
  icon: React.ReactNode;
  categorySlug: string;
  themeColor: "rose" | "amber" | "blue" | "purple" | "emerald";
  lessons: VideoCatalogLessonItem[];
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
  onViewCategory: (categorySlug: string) => void;
}

function HorizontalVideoTopicRow({
  title,
  icon,
  categorySlug,
  themeColor,
  lessons,
  onSelectVideoLesson,
  onViewCategory,
}: HorizontalVideoTopicRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll, lessons]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth + 20;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getThemeClasses = () => {
    switch (themeColor) {
      case "rose":
        return "bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-200/70 dark:border-rose-800/50";
      case "amber":
        return "bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50";
      case "blue":
        return "bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-[#0059bb] dark:text-sky-300 border-blue-200/70 dark:border-blue-800/50";
      case "purple":
        return "bg-purple-50 hover:bg-purple-100/80 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/50";
      case "emerald":
        return "bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50";
      default:
        return "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700";
    }
  };

  if (lessons.length === 0) return null;

  return (
    <div className="space-y-3.5 pt-1">
      {/* Row Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          {icon}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight truncate">
            {title}
          </h3>
        </div>

        {/* Row Header Actions: Navigation & View All */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Cuộn sang trái"
            aria-label="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Cuộn sang phải"
            aria-label="Cuộn sang phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewCategory(categorySlug)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border ${getThemeClasses()}`}
          >
            <span>Xem Video Chủ Đề</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Viewport (Khử hoàn toàn mờ mờ, hiển thị sắc nét trọn vẹn 4 bài đầu) */}
      <div className="relative group/carousel">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-3 pt-1 snap-x snap-mandatory"
        >
          {lessons.map((lesson) => (
            <VideoCardItem
              key={lesson.id}
              lesson={lesson}
              onSelectVideoLesson={onSelectVideoLesson}
              className="w-[85vw] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)] shrink-0 snap-start"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
