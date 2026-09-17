"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Headphones,
  BookOpen,
  FileText,
  Search,
  RefreshCw,
  Clock,
  Check,
  Play,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { formatLevelBadge } from "@/features/listening/components/InteractiveTranscriptSidebar";
import {
  LessonCardShimmer,
  ShadowingListingHeroStatsSkeleton,
} from "@/features/shadowing/components/LoadingSkeletons";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";

export type ShadowingCategoryTab = "all" | "basic" | "advanced" | "completed";

export interface ShadowingStats {
  sentencesPracticed: number;
  averageFluency: number;
  studyMinutes: number;
  completedLessonsCount: number;
}

interface ShadowingListingViewProps {
  lessonsList: any[];
  completedLessonIds: (string | number)[];
  selectedLessonId: string | null;
  listingSearch: string;
  setListingSearch: (q: string) => void;
  onSelectLesson: (id: string | number) => void;
  onOpenExplorerModal: () => void;
  displayedBasicLessons: any[];
  displayedAdvancedLessons: any[];
  handleShuffleBasic: () => void;
  handleShuffleAdvanced: () => void;
  stats?: ShadowingStats;
  isLoadingStats?: boolean;
}

export function ShadowingListingView({
  lessonsList,
  completedLessonIds,
  selectedLessonId,
  listingSearch,
  setListingSearch,
  onSelectLesson,
  onOpenExplorerModal,
  displayedBasicLessons,
  displayedAdvancedLessons,
  handleShuffleBasic,
  handleShuffleAdvanced,
  stats,
  isLoadingStats = false,
}: ShadowingListingViewProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<ShadowingCategoryTab>("all");
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const handleSelectCategoryTab = (tabId: ShadowingCategoryTab) => {
    if (tabId === activeCategoryTab) return;
    setIsSwitchingCategory(true);
    setActiveCategoryTab(tabId);
    setTimeout(() => {
      setIsSwitchingCategory(false);
    }, 180);
  };

  const completedLessons = useMemo(() => {
    return lessonsList.filter(
      (l) =>
        l.userStatus === "COMPLETED" ||
        completedLessonIds.includes(l.id) ||
        completedLessonIds.includes(String(l.id))
    );
  }, [lessonsList, completedLessonIds]);

  const allBasicLessons = useMemo(() => {
    const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
    return lessonsList.filter((l) => {
      const lvl = (l.level || "A1").toUpperCase();
      return (
        BASIC_LEVELS.has(l.level) ||
        lvl.includes("A1") ||
        lvl.includes("A2") ||
        lvl.includes("EASY") ||
        lvl.includes("BEGINNER")
      );
    });
  }, [lessonsList]);

  const allAdvancedLessons = useMemo(() => {
    const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);
    return lessonsList.filter((l) => {
      const lvl = (l.level || "B1").toUpperCase();
      return (
        ADVANCED_LEVELS.has(l.level) ||
        lvl.includes("B1") ||
        lvl.includes("B2") ||
        lvl.includes("C1") ||
        lvl.includes("C2") ||
        lvl.includes("HARD") ||
        lvl.includes("ADVANCED")
      );
    });
  }, [lessonsList]);

  const filterTabs: { id: ShadowingCategoryTab; label: string; count: number }[] = [
    { id: "all", label: "Tất cả bài học", count: lessonsList.length },
    { id: "basic", label: "Cơ bản (A1-A2)", count: allBasicLessons.length },
    { id: "advanced", label: "Nâng cao (B1-C2)", count: allAdvancedLessons.length },
    { id: "completed", label: "Đã hoàn thành", count: completedLessons.length },
  ];

  // Search filtered lessons
  const searchFilteredLessons = useMemo(() => {
    if (!listingSearch.trim()) return null;
    const q = listingSearch.toLowerCase();
    return lessonsList.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.category && l.category.toLowerCase().includes(q)) ||
        (l.level && l.level.toLowerCase().includes(q))
    );
  }, [lessonsList, listingSearch]);

  const renderLessonCard = (lesson: any) => {
    const isSelected = lesson.id === selectedLessonId;
    const isCompleted =
      lesson.userStatus === "COMPLETED" ||
      completedLessonIds.includes(lesson.id) ||
      completedLessonIds.includes(String(lesson.id));

    return (
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        key={lesson.id}
        onClick={() => onSelectLesson(lesson.id)}
        className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
          isSelected
            ? "bg-white dark:bg-slate-900 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
            : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 hover:shadow-md shadow-2xs"
        }`}
      >
        {/* Thumbnail Box */}
        <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
          <LessonCoverImage
            lesson={lesson}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            showBadge={false}
          />

          <span className="absolute bottom-2 left-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/85 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/15">
            {formatLevelBadge(lesson.level)}
          </span>

          {isCompleted && (
            <span className="absolute top-2 right-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600/90 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs backdrop-blur-xs z-20 border border-emerald-400/20">
              <Check className="w-3 h-3 stroke-[3]" />{" "}
              <span className="hidden xs:inline sm:inline">Đã học</span>
            </span>
          )}

          {isSelected && (
            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#0059bb] text-white hidden sm:flex items-center gap-1 shadow-2xs z-20">
              <Play className="w-3 h-3 fill-white" /> Đang chọn
            </span>
          )}
        </div>

        {/* Content Box */}
        <div className="py-0.5 sm:py-0 sm:mt-3 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
          <div>
            {lesson.category && (
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 block truncate mb-1 sm:hidden">
                {lesson.category}
              </span>
            )}
            <h3
              className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                isSelected
                  ? "text-[#0059bb] dark:text-sky-400"
                  : "text-slate-900 dark:text-white group-hover:text-[#0059bb]"
              }`}
            >
              {lesson.title}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
              <Clock className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.5] shrink-0" />{" "}
              {lesson.duration || "5 min"}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
              {lesson.totalSentences || lesson.transcript?.length || 10} câu
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const computedStats = useMemo(() => {
    if (stats) return stats;
    let sentences = 0;
    completedLessons.forEach((l) => {
      sentences += l.totalSentences || l.transcript?.length || 10;
    });
    return {
      sentencesPracticed: sentences > 0 ? sentences : completedLessons.length * 10,
      averageFluency: 92,
      studyMinutes: Math.max(15, completedLessons.length * 8),
      completedLessonsCount: completedLessons.length,
    };
  }, [stats, completedLessons]);

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. CONTINUOUS FULL-WIDTH TOP BAR (AppTopHeader) */}
      <AppTopHeader
        searchProps={{
          value: listingSearch,
          onChange: setListingSearch,
          placeholder: "Tìm bài nói theo tên, chủ đề...",
          onClear: () => setListingSearch(""),
        }}
        showGamificationStats={true}
        rightDesktopContent={
          <button
            type="button"
            onClick={onOpenExplorerModal}
            className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Khám phá 100+ bài</span>
            <span className="sm:hidden">100+ bài</span>
          </button>
        }
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. MAIN LISTING CONTENT CANVAS WITH STAGGER ENTRANCE */}
      <PageEntranceWrapper className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* 2.1 MICRO-HERO PRACTICE STATS BENTO GRID (Rule 8 Wadhah Aloui & /analytics Standard) */}
        {isLoadingStats ? (
          <ShadowingListingHeroStatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            {/* CARD 1: CÂU ĐÃ LUYỆN */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-700/50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Mic className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                  {computedStats.sentencesPracticed}{" "}
                  <span className="text-xs font-bold text-slate-500 font-sans">câu</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Đã luyện Shadowing
                </div>
              </div>
            </div>

            {/* CARD 2: ĐỘ TRÔI CHẢY */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Target className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                  {computedStats.averageFluency}%
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Chuẩn phát âm AI
                </div>
              </div>
            </div>

            {/* CARD 3: BÀI HOÀN THÀNH */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-700/50">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                  {computedStats.completedLessonsCount}{" "}
                  <span className="text-xs font-bold text-slate-500 font-sans">bài</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Bài học hoàn thành
                </div>
              </div>
            </div>

            {/* CARD 4: THỜI GIAN THỰC HÀNH */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-purple-300 dark:hover:border-purple-700/50">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                  {computedStats.studyMinutes}{" "}
                  <span className="text-xs font-bold text-slate-500 font-sans">phút</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Thời gian thực hành
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. LEVEL / CATEGORY FILTER DOCK (Apple-Grade Spring Sliding Pill) */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 hide-scrollbar">
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 shrink-0 relative">
            {filterTabs.map((tab) => {
              const isActive = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectCategoryTab(tab.id)}
                  className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer z-10 whitespace-nowrap select-none ${
                    isActive
                      ? "text-slate-900 dark:text-white font-extrabold"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="shadowingCategoryFilterIndicator"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
                        : "bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
            {searchFilteredLessons ? (
              <span>Tìm thấy {searchFilteredLessons.length} bài</span>
            ) : (
              <span>Tổng cộng {lessonsList.length} bài học</span>
            )}
          </span>
        </div>

        {/* 4. LESSONS GRID WITH ANIMATE PRESENCE & SHIMMER TRANSITION */}
        <AnimatePresence mode="wait">
          {isSwitchingCategory ? (
            /* Fast 180ms Shimmer Sweep between Category Tabs (0px CLS) */
            <motion.div
              key="shadowing-category-shimmer-sweep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <LessonCardShimmer key={i} />
              ))}
            </motion.div>
          ) : searchFilteredLessons ? (
            /* Search Results Grid */
            <motion.div
              key="shadowing-search-results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Kết quả tìm kiếm cho: &ldquo;{listingSearch}&rdquo;
                </h3>
              </div>

              {searchFilteredLessons.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  <p className="font-semibold text-sm">Không tìm thấy bài học nào phù hợp</p>
                  <p className="mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc xóa ô tìm kiếm</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {searchFilteredLessons.map(renderLessonCard)}
                </div>
              )}
            </motion.div>
          ) : activeCategoryTab === "basic" ? (
            /* Tab: Tất cả bài học cơ bản A1-A2 */
            <motion.div
              key="shadowing-basic-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Tất cả bài học cơ bản{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1">
                      ({allBasicLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {allBasicLessons.map(renderLessonCard)}
              </div>
            </motion.div>
          ) : activeCategoryTab === "advanced" ? (
            /* Tab: Tất cả bài học nâng cao B1-C2 */
            <motion.div
              key="shadowing-advanced-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                    B1 - C2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Tất cả bài học nâng cao{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1">
                      ({allAdvancedLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {allAdvancedLessons.map(renderLessonCard)}
              </div>
            </motion.div>
          ) : activeCategoryTab === "completed" ? (
            /* Tab: Bài học đã hoàn thành */
            <motion.div
              key="shadowing-completed-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                    COMPLETED
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học đã hoàn thành{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1">
                      ({completedLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              {completedLessons.length === 0 ? (
                <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Chưa có bài học nào được hoàn thành
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Hãy chọn một bài học trong mục Cơ bản hoặc Nâng cao để bắt đầu luyện tập Shadowing!
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryTab("all")}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all inline-flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Xem danh sách bài học</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {completedLessons.map(renderLessonCard)}
                </div>
              )}
            </motion.div>
          ) : (
            /* Tab "all": Dual-Row Curated Grid (Basic + Advanced) */
            <motion.div
              key="shadowing-dual-rows-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-7"
            >
              {/* HÀNG 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                      A1 - A2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                      Bài học cơ bản{" "}
                      <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                        (Mẫu câu ngắn, giao tiếp nền tảng)
                      </span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleShuffleBasic}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                    <span>Đổi bài ngẫu nhiên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {displayedBasicLessons.map(renderLessonCard)}
                </div>
              </div>

              {/* HÀNG 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
              <div className="space-y-4 pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                      B1 - C2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                      Bài học nâng cao{" "}
                      <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                        (Phỏng vấn & Diễn thuyết)
                      </span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleShuffleAdvanced}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Đổi bài ngẫu nhiên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {displayedAdvancedLessons.map(renderLessonCard)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageEntranceWrapper>
    </div>
  );
}
