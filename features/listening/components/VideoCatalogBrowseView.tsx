"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Video,
  Search,
  Sparkles,
  Clock,
  PlusCircle,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ListChecks,
  Heart,
  Flame,
  Tv,
  Brain,
  Layers,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";
import { VideoRequestModal } from "./VideoRequestModal";
import { VideoYouTubeImportModal } from "./VideoYouTubeImportModal";
import { VideoComprehensionQuizModal } from "./VideoComprehensionQuizModal";
import { VideoCategoryIcon } from "./VideoCategoryIcon";
import { getLessonCoverImage } from "../utils/lessonImageMapper";
import { ShimmerBox } from "./LoadingSkeletons";
import {
  MOCK_VIDEO_LESSONS,
  MOCK_VIDEO_CATEGORIES,
} from "@/features/listening/data/videoCatalogMockData";
import {
  useVideoCatalogStore,
  buildLessonQueryKey,
  VideoCatalogCategory,
  VideoCatalogLessonItem,
} from "@/stores";

export type { VideoCatalogCategory, VideoCatalogLessonItem };

interface VideoCatalogBrowseViewProps {
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
  practiceMode?: "dictation" | "shadowing";
}

const CEFR_LEVELS = ["Tất cả", "A1", "A2", "B1", "B2", "C1", "C2"];

const INITIAL_VIDEO_FALLBACK_LESSONS: VideoCatalogLessonItem[] = MOCK_VIDEO_LESSONS.map((l) => ({
  id: l.id,
  slug: l.slug,
  title: l.title,
  description: l.description,
  sourceType: l.sourceType,
  externalId: l.externalId,
  thumbnailUrl: l.thumbnailUrl,
  durationSeconds: l.durationSeconds,
  durationFormatted: l.durationFormatted,
  cefrLevel: l.cefrLevel,
  supportedTypes: l.supportedTypes,
  accent: l.accent,
  wpmSpeed: l.wpmSpeed,
  viewCount: l.viewCount,
  studyCount: l.studyCount,
  isCommunityCurated: false,
  hasFullData: !l.id.startsWith("mov_"),
  segmentCount: l.segments.length > 2 ? l.segments.length : 8,
  totalSentences: l.segments.length > 2 ? l.segments.length : 8,
  category: {
    id: l.categoryId,
    slug: l.categorySlug,
    name: l.categoryName,
  },
  playlist: null,
  createdAt: "2026-01-01T00:00:00.000Z",
}));

const INITIAL_VIDEO_FALLBACK_CATEGORIES: VideoCatalogCategory[] = MOCK_VIDEO_CATEGORIES.map(
  (c, idx) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description || "",
    icon: c.icon,
    orderIndex: idx,
    lessonCount: INITIAL_VIDEO_FALLBACK_LESSONS.filter((l) => l.category?.slug === c.slug).length,
    playlistCount: 1,
    playlists: [],
  })
);

export const VideoCatalogBrowseView: React.FC<VideoCatalogBrowseViewProps> = ({
  onSelectVideoLesson,
  practiceMode = "dictation",
}) => {
  // Global SWR Cache & Filter Store
  const storeCategories = useVideoCatalogStore((s) => s.categories);
  const categories =
    storeCategories && storeCategories.length > 0
      ? storeCategories
      : INITIAL_VIDEO_FALLBACK_CATEGORIES;
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

  // Synchronous Frame 0 Cache Hit with in-memory fallback (0ms instant UI return)
  const queryKey = buildLessonQueryKey(filters);
  const cachedLessons = useVideoCatalogStore((s) => s.lessonsCache[queryKey]?.data);
  const [rawLessons, setRawLessons] = useState<VideoCatalogLessonItem[]>(() =>
    cachedLessons && cachedLessons.length > 0 ? cachedLessons : INITIAL_VIDEO_FALLBACK_LESSONS
  );

  useEffect(() => {
    if (cachedLessons && cachedLessons.length > 0) {
      setRawLessons(cachedLessons);
    }
  }, [cachedLessons]);

  const lessons = useMemo(() => {
    if (cachedLessons && cachedLessons.length > 0) return cachedLessons;
    return rawLessons.filter((l) => {
      if (selectedCategory !== "all" && l.category?.slug !== selectedCategory) return false;
      if (
        selectedLevel !== "Tất cả" &&
        l.cefrLevel.toUpperCase() !== selectedLevel.toUpperCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        if (
          !l.title.toLowerCase().includes(q) &&
          !(l.category?.name || "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [cachedLessons, rawLessons, selectedCategory, selectedLevel, searchQuery]);

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
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedQuizLesson, setSelectedQuizLesson] = useState<{ id: string; title: string } | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLessons();
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedLevel, searchQuery, sortBy, fetchLessons]);

  const handleForceRefresh = async () => {
    invalidateCache("all");
    await Promise.all([
      fetchCategories({ forceRefresh: true }),
      fetchLessons(undefined, { forceRefresh: true }),
    ]);
  };

  const isBrowsingAll =
    selectedCategory === "all" &&
    !searchQuery.trim() &&
    selectedLevel === "Tất cả";

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
    <div className="space-y-7">
      {/* 1. COMPACT FILTER & SEARCH TOOLBAR (Removed bulky hero banner) */}
      <div className="space-y-3">
        {/* Category Chips Bar with Scroll Arrows (Desktop Gradient Fade, Mobile Touch Swipe) */}
        <div className="relative group/categories">
          {canScrollLeft && (
            <div className="hidden sm:flex items-center justify-start pr-5 absolute left-0 inset-y-0 z-20 bg-gradient-to-r from-[#fffefb] via-[#fffefb]/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 pointer-events-none">
              <button
                type="button"
                onClick={() => handleScrollCategories("left")}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0059bb] transition-all cursor-pointer"
                aria-label="Cuộn danh mục sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {canScrollRight && (
            <div className="hidden sm:flex items-center justify-end pl-5 absolute right-0 inset-y-0 z-20 bg-gradient-to-l from-[#fffefb] via-[#fffefb]/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 pointer-events-none">
              <button
                type="button"
                onClick={() => handleScrollCategories("right")}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0059bb] transition-all cursor-pointer"
                aria-label="Cuộn danh mục sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div
            ref={categoryScrollRef}
            onScroll={checkCategoryScroll}
            className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar px-0.5 sm:pr-9"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer select-none flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-[#0059bb] border-[#0059bb] text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/70"
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
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer select-none flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? "bg-[#0059bb] border-[#0059bb] text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/70"
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

        {/* Sub-Filters: Search + Level + Suggest Video CTA */}
        <div className="hidden sm:flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm video theo phim, trích đoạn, kênh..."
                aria-label="Tìm video theo phim, trích đoạn, kênh"
                className="w-full h-9 pl-9 pr-8 rounded-xl text-xs border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* CEFR Level filter */}
            <div className="h-9 flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 relative">
              {CEFR_LEVELS.map((lvl) => {
                const isActive = selectedLevel === lvl;
                return (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`relative px-2.5 h-full rounded-lg text-xs font-bold transition-colors cursor-pointer select-none z-10 ${
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

          {/* Right Actions: Refresh + Suggest Video (Secondary) + Import YouTube (Single Primary CTA - Rule 18) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleForceRefresh}
              disabled={isLessonsLoading}
              className="h-9 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Làm mới danh sách video"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isLessonsLoading ? "animate-spin text-[#0059bb]" : "text-slate-500"
                }`}
              />
              <span className="hidden lg:inline">Làm mới</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="h-9 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Đề xuất video</span>
            </button>

            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Video className="w-4 h-4 stroke-[2.2]" />
              <span>Thêm Video YouTube</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Action Strip for Importing YouTube Video */}
        <div className="flex sm:hidden items-center justify-between gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="h-9 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Đề xuất</span>
          </button>
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex-1 h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Thêm Video YouTube</span>
          </button>
        </div>
      </div>

      {/* 2. VIDEO CONTENT CANVAS */}
      {isLoadingLessons ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }, (_, i) => (
            <VideoCardShimmer key={i} />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8">
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
            Xem tất cả video
          </button>
        </div>
      ) : isBrowsingAll ? (
        <div className="space-y-9">
          <HorizontalVideoTopicRow
            title="Phim Lãng Mạn & Cảm Xúc"
            icon={<Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500/15 shrink-0" />}
            categorySlug="romance-cinema"
            lessons={romanceLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Phim Truyền Cảm Hứng & Triết Lý Sống"
            icon={<Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500/15 shrink-0" />}
            categorySlug="inspirational-life"
            lessons={inspirationalLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Sitcom Kinh Điển & Hài Kịch Đời Sống"
            icon={<Tv className="w-4.5 h-4.5 text-[#0059bb] dark:text-sky-400 shrink-0" />}
            categorySlug="classic-sitcoms"
            lessons={sitcomLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Hoạt Hình Pixar & Disney"
            icon={<Sparkles className="w-4.5 h-4.5 text-purple-500 fill-purple-500/15 shrink-0" />}
            categorySlug="animation-pixar-disney"
            lessons={animationLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Diễn Thuyết TED-Ed & Phát Triển Bản Thân"
            icon={<Brain className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            categorySlug="ted-ed"
            lessons={tedLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Công Nghệ, Tài Chính & Phỏng Vấn Quốc Tế"
            icon={<Briefcase className="w-4.5 h-4.5 text-[#0059bb] dark:text-sky-400 shrink-0" />}
            categorySlug="career-business"
            lessons={businessTechLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />

          <HorizontalVideoTopicRow
            title="Giao Tiếp Đời Thực, Du Lịch & Khám Phá BBC"
            icon={<Globe className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400 shrink-0" />}
            categorySlug="daily-conversations"
            lessons={dailyLifeLessons}
            practiceMode={practiceMode}
            onSelectVideoLesson={onSelectVideoLesson}
            onViewCategory={(slug) => setSelectedCategory(slug)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lessons.map((lesson) => (
            <VideoCardItem
              key={lesson.id}
              lesson={lesson}
              practiceMode={practiceMode}
              onSelectVideoLesson={onSelectVideoLesson}
            />
          ))}
        </div>
      )}

      {/* 3. MODALS */}
      <VideoRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      <VideoYouTubeImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        practiceMode={practiceMode}
        onImportedLesson={(lessonId) => {
          onSelectVideoLesson?.({
            id: lessonId,
            slug: lessonId,
            title: "Bài học Video YouTube mới",
            description: null,
            externalId: "",
            thumbnailUrl: "",
            durationSeconds: 180,
            durationFormatted: "03:00",
            cefrLevel: "B1",
            supportedTypes: "BOTH",
            accent: "en-US",
            category: null,
            totalSentences: 1,
            viewCount: 0,
            hasFullData: true,
          });
        }}
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

function formatShortVideoCategoryName(name?: string, slug?: string): string {
  const s = (slug || "").toLowerCase();
  if (s.includes("romance")) return "Phim Lãng Mạn";
  if (s.includes("inspirational")) return "Phim Cảm Hứng";
  if (s.includes("sitcom")) return "Sitcom Hài Kịch";
  if (s.includes("animation")) return "Hoạt Hình Pixar";
  if (s.includes("ted")) return "Diễn Thuyết TED";
  if (s.includes("business") || s.includes("career") || s.includes("finance")) return "Kinh Doanh";
  if (s.includes("science") || s.includes("tech")) return "Công Nghệ";
  if (s.includes("daily")) return "Đời Sống Thực Tế";
  if (!name) return "Video Tiếng Anh";
  return name.split("&")[0].trim();
}

const VideoCardItem: React.FC<{
  lesson: VideoCatalogLessonItem;
  practiceMode?: "dictation" | "shadowing";
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
  className?: string;
}> = ({ lesson, practiceMode = "dictation", onSelectVideoLesson, className = "" }) => {
  return (
    <motion.div
      key={lesson.id}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelectVideoLesson?.(lesson)}
      className={`group relative rounded-2xl bg-white dark:bg-slate-900 shadow-xs lg:hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden select-none h-full ${className}`}
    >
      {/* Crisp 4-Corner & 4-Edge Border Overlay (Rendered above image GPU layer) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-200 dark:border-slate-800 lg:group-hover:border-[#0059bb]/70 dark:lg:group-hover:border-sky-500/60 transition-colors z-30" />

      {/* 1. VISUAL COVER BANNER */}
      <div className="relative h-36 sm:h-[120px] w-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800/80">
        <img
          src={lesson.thumbnailUrl}
          alt={lesson.title}
          onLoad={(e) => {
            const img = e.currentTarget;
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
          className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-500"
        />

        {/* Soft Directional Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/65 text-white backdrop-blur-md border border-white/15 whitespace-nowrap">
            {lesson.cefrLevel}
          </span>

          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-slate-900/60 text-white backdrop-blur-md tabular-nums flex items-center gap-1 shrink-0">
            <Clock className="w-2.5 h-2.5 text-white/90" />
            <span>{lesson.durationFormatted}</span>
          </span>
        </div>
      </div>

      {/* 2. CARD BODY & FOOTER */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5 min-w-0 bg-white dark:bg-slate-900">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="truncate flex items-center gap-1.5">
              <VideoCategoryIcon
                slug={lesson.category?.slug}
                className="w-3 h-3 shrink-0"
              />
              <span className="truncate">
                {formatShortVideoCategoryName(lesson.category?.name, lesson.category?.slug)}
              </span>
            </span>
            <span className="font-mono tabular-nums shrink-0 flex items-center gap-1 text-slate-400">
              <ListChecks className="w-3 h-3" />
              <span>{lesson.totalSentences} câu</span>
            </span>
          </div>

          <h4
            className="text-sm font-bold text-slate-900 dark:text-white leading-[19px] line-clamp-2 overflow-hidden sm:h-[38px] lg:group-hover:text-[#0059bb] dark:lg:group-hover:text-sky-400 transition-colors"
            title={lesson.title}
          >
            {lesson.title}
          </h4>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <Link
            href={`/study/dictation/video/comprehension/${lesson.id}${
              practiceMode === "shadowing" ? "?from=shadowing" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-violet-700 dark:text-violet-300 bg-violet-50/80 dark:bg-violet-950/40 hover:bg-violet-100 transition-colors"
            title="Làm bài trắc nghiệm đọc hiểu AI • +25 XP"
          >
            <Sparkles className="w-3 h-3 text-violet-600 dark:text-violet-400 shrink-0" />
            <span>Đọc hiểu AI</span>
          </Link>

          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 lg:group-hover:bg-[#0059bb] lg:group-hover:text-white transition-colors">
            <span>Học Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

interface HorizontalVideoTopicRowProps {
  title: string;
  icon: React.ReactNode;
  categorySlug: string;
  themeColor?: "rose" | "amber" | "blue" | "purple" | "emerald";
  lessons: VideoCatalogLessonItem[];
  practiceMode?: "dictation" | "shadowing";
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
  onViewCategory: (categorySlug: string) => void;
}

function HorizontalVideoTopicRow({
  title,
  icon,
  categorySlug,
  lessons,
  practiceMode = "dictation",
  onSelectVideoLesson,
  onViewCategory,
}: HorizontalVideoTopicRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Group into pages of 4 lessons so each desktop swipe moves 4 full cards
  const pages = useMemo(() => {
    const result: VideoCatalogLessonItem[][] = [];
    for (let i = 0; i < lessons.length; i += 4) {
      let chunk = lessons.slice(i, i + 4);
      if (chunk.length < 4 && lessons.length >= 4) {
        const needed = 4 - chunk.length;
        const extras = lessons.filter((item) => !chunk.some((c) => c.id === item.id)).slice(0, needed);
        chunk = [...chunk, ...extras];
      }
      result.push(chunk);
    }
    return result;
  }, [lessons]);

  const totalPages = pages.length;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 12);
    if (clientWidth > 0) {
      setCurrentPage(Math.round(scrollLeft / clientWidth));
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, lessons]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth + 20;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (lessons.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Row Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800 gap-2">
        <button
          type="button"
          onClick={() => onViewCategory(categorySlug)}
          className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left group cursor-pointer hover:opacity-85 transition-opacity"
          title={`Xem tất cả video ${title}`}
        >
          {icon}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
            {title}
          </h3>
        </button>

        {/* Row Header Actions: Page indicator + Navigation chevrons */}
        <div className="flex items-center gap-2 shrink-0">
          {totalPages > 1 && (
            <span className="hidden sm:inline text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 mr-0.5 tabular-nums">
              {Math.min(currentPage + 1, totalPages)}/{totalPages}
            </span>
          )}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0059bb] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Lướt sang trái"
            aria-label={`Lướt trái ${title}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0059bb] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Lướt sang phải"
            aria-label={`Lướt phải ${title}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel: 4 full cards per slide on Desktop, 1 full card per swipe on Mobile */}
      <div
        ref={scrollRef}
        className="flex items-start sm:items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-1"
      >
        {pages.map((pageLessons, pageIdx) => (
          <div
            key={pageIdx}
            className="contents sm:grid sm:w-full sm:min-w-full sm:shrink-0 sm:snap-start sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
          >
            {pageLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="w-full min-w-full shrink-0 snap-start sm:w-auto sm:min-w-0 sm:shrink"
              >
                <VideoCardItem
                  lesson={lesson}
                  practiceMode={practiceMode}
                  onSelectVideoLesson={onSelectVideoLesson}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoCardShimmer() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none">
      <div className="relative h-36 sm:h-[120px] w-full overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-800">
        <ShimmerBox className="w-full h-full" />
      </div>
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <ShimmerBox className="h-3.5 w-24 rounded" />
            <ShimmerBox className="h-3.5 w-12 rounded" />
          </div>
          <ShimmerBox className="h-4 w-full rounded" />
          <ShimmerBox className="h-4 w-3/4 rounded" />
        </div>
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <ShimmerBox className="h-6 w-20 rounded-full" />
          <ShimmerBox className="h-7 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
