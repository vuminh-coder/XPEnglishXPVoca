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
} from "lucide-react";
import { VideoRequestModal } from "./VideoRequestModal";
import { VideoComprehensionQuizModal } from "./VideoComprehensionQuizModal";
import { ShimmerBox } from "./LoadingSkeletons";

interface VideoCatalogCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  lessonsCount?: number;
}

interface VideoCatalogLessonItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  externalId: string;
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string;
  supportedTypes: string;
  accent: string | null;
  category: {
    id: string;
    slug: string;
    name: string;
  } | null;
  totalSentences: number;
  viewCount: number;
}

interface VideoCatalogBrowseViewProps {
  onSelectVideoLesson?: (lesson: VideoCatalogLessonItem) => void;
}

const CEFR_LEVELS = ["Tất cả", "A1", "A2", "B1", "B2", "C1", "C2"];

export const VideoCatalogBrowseView: React.FC<VideoCatalogBrowseViewProps> = ({
  onSelectVideoLesson,
}) => {
  // Filters
  const [categories, setCategories] = useState<VideoCatalogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy] = useState<"newest" | "views" | "duration">("newest");

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

  // Data states
  const [lessons, setLessons] = useState<VideoCatalogLessonItem[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);

  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedQuizLesson, setSelectedQuizLesson] = useState<{ id: string; title: string } | null>(
    null
  );

  // Fetch Categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/video-catalog/categories");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
        }
      } catch (err) {
        console.warn("Failed to load video categories:", err);
      }
    }
    loadCategories();
  }, []);

  // Fetch Lessons based on filters
  useEffect(() => {
    async function loadLessons() {
      setIsLoadingLessons(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") params.append("category", selectedCategory);
        if (selectedLevel !== "Tất cả") params.append("level", selectedLevel);
        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        params.append("sort", sortBy);
        params.append("limit", "24");

        const res = await fetch(`/api/video-catalog/lessons?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.lessons)) {
            setLessons(data.lessons);
          }
        }
      } catch (err) {
        console.warn("Failed to load video catalog lessons:", err);
      } finally {
        setIsLoadingLessons(false);
      }
    }

    const debounce = setTimeout(loadLessons, 250);
    return () => clearTimeout(debounce);
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

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

          <div className="flex items-center gap-2.5 shrink-0">
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
              className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 hover:shadow-md shadow-2xs transition-all cursor-pointer flex flex-col group relative overflow-hidden"
            >
              {/* Double-Bezel Inner Thumbnail (Rule 10 Concentric Radii) */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                <img
                  src={lesson.thumbnailUrl}
                  alt={lesson.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Duration Badge (Bottom-Right) */}
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/85 text-white backdrop-blur-xs shadow-2xs border border-white/10 tabular-nums">
                  {lesson.durationFormatted}
                </span>
              </div>

              {/* Card Body */}
              <div className="pt-3 flex-1 flex flex-col justify-between space-y-2.5 min-w-0">
                <div>
                  {/* Metadata Row: Level Badge + Category Name (Left) & Sentence Count (Right) */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0 truncate">
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 text-[10px] font-bold font-mono shrink-0">
                        {lesson.cefrLevel}
                      </span>
                      <span className="truncate font-medium text-slate-500 dark:text-slate-400 text-[11px]">
                        {lesson.category?.name || "Tiếng Anh"}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums shrink-0 whitespace-nowrap text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      {lesson.totalSentences} câu
                    </span>
                  </div>

                  {/* Title with Uniform 2-Line Height for 100% Horizontal Alignment */}
                  <h4
                    className="text-[13.5px] font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors h-[2.5rem]"
                    title={lesson.title}
                  >
                    {lesson.title}
                  </h4>
                </div>

                {/* Card Footer: Balanced h-8 Action Targets */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <Link
                    href={`/study/dictation/video/${lesson.id}/comprehension`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="h-8 px-2.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50/70 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 border border-purple-200/70 dark:border-purple-800/60 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
                    title="Làm bài trắc nghiệm đọc hiểu AI (+25 XP)"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>Đọc hiểu AI</span>
                  </Link>

                  <div className="h-8 px-3 rounded-xl text-xs font-bold bg-[#0059bb] group-hover:bg-[#004899] text-white shadow-xs transition-all flex items-center gap-1.5 shrink-0 select-none">
                    <Play className="w-3 h-3 fill-white" />
                    <span>Học Ngay</span>
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
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col select-none">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden shrink-0">
        <ShimmerBox className="w-full h-full rounded-xl" />
        <div className="absolute bottom-2 right-2 w-10 h-4 rounded bg-slate-900/40" />
      </div>
      <div className="pt-3 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ShimmerBox className="h-4 w-7 rounded-md" />
              <ShimmerBox className="h-3 w-20 rounded" />
            </div>
            <ShimmerBox className="h-3 w-10 rounded shrink-0" />
          </div>
          <ShimmerBox className="h-4 w-full rounded" />
          <ShimmerBox className="h-4 w-3/4 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <ShimmerBox className="h-8 w-24 rounded-xl" />
          <ShimmerBox className="h-8 w-24 rounded-xl bg-blue-600/30" />
        </div>
      </div>
    </div>
  );
}
