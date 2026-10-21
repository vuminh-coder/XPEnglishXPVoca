"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  Video,
} from "lucide-react";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { formatLevelBadge } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { VideoCatalogBrowseView } from "@/features/listening/components/VideoCatalogBrowseView";
import { StudyMediaHubTabs } from "@/features/listening/components/StudyMediaHubTabs";
import {
  LessonCardShimmer,
  ShadowingListingHeroStatsSkeleton,
} from "@/features/shadowing/components/LoadingSkeletons";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { useAudioCatalogStore, useVideoCatalogStore, type AudioCategoryTab } from "@/stores";

export type ShadowingCategoryTab = "all" | "basic" | "intermediate" | "advanced" | "completed";

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
  activeHubMode?: "audio" | "video";
  basePath?: string;
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
  activeHubMode,
  basePath = "/study/shadowing/audio",
}: ShadowingListingViewProps) {
  const activeCategoryTab = useAudioCatalogStore((s) => s.filters.activeCategoryTab as ShadowingCategoryTab);
  const setActiveCategoryTab = useAudioCatalogStore((s) => s.setActiveCategoryTab);
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  const [mainHubMode, setMainHubMode] = useState<"standard" | "video_catalog">("standard");

  const effectiveHubMode =
    activeHubMode ||
    (basePath?.includes("/video")
      ? "video"
      : mainHubMode === "video_catalog"
      ? "video"
      : "audio");

  const handleSelectCategoryTab = (tabId: ShadowingCategoryTab) => {
    if (tabId === activeCategoryTab) return;
    setIsSwitchingCategory(true);
    setActiveCategoryTab(tabId as AudioCategoryTab);
    setTimeout(() => {
      setIsSwitchingCategory(false);
    }, 180);
  };

  const handleForceRefresh = async () => {
    useAudioCatalogStore.getState().invalidateCache("all");
    await useAudioCatalogStore.getState().fetchAudioLessons({ forceRefresh: true, mode: "audio" });
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

  const allIntermediateLessons = useMemo(() => {
    return lessonsList.filter((l) => {
      const lvl = (l.level || "").toUpperCase();
      return (
        lvl.includes("INTERMEDIATE") ||
        lvl === "B1" ||
        lvl === "B2" ||
        lvl === "B1-B2"
      );
    });
  }, [lessonsList]);

  const allAdvancedLessons = useMemo(() => {
    return lessonsList.filter((l) => {
      const lvl = (l.level || "").toUpperCase();
      return (
        lvl.includes("HARD") ||
        lvl.includes("ADVANCED") ||
        lvl === "C1" ||
        lvl === "C2" ||
        lvl === "C1-C2"
      );
    });
  }, [lessonsList]);

  const intermediateSeed = useAudioCatalogStore((s) => s.filters.shuffleSeedIntermediate);
  const setIntermediateSeed = useAudioCatalogStore((s) => s.setShuffleSeedIntermediate);
  const [isShufflingIntermediate, setIsShufflingIntermediate] = useState(false);

  const displayedIntermediateLessons = useMemo(() => {
    if (allIntermediateLessons.length === 0) return [];
    const pool = allIntermediateLessons;
    const offset = (intermediateSeed * 8) % Math.max(1, pool.length);
    const sliced = pool.slice(offset, offset + 8);
    if (sliced.length < 8 && pool.length >= 8) {
      return [...sliced, ...pool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [allIntermediateLessons, intermediateSeed]);

  const handleShuffleIntermediate = () => {
    setIsShufflingIntermediate(true);
    setTimeout(() => {
      setIntermediateSeed((prev) => prev + 1);
      setIsShufflingIntermediate(false);
    }, 180);
  };

  const filterTabs: { id: ShadowingCategoryTab; label: string }[] = [
    { id: "all", label: "Tất cả bài học" },
    { id: "basic", label: "Cơ bản • A1-A2" },
    { id: "intermediate", label: "Trung cấp • B1-B2" },
    { id: "advanced", label: "Nâng cao • C1-C2" },
    { id: "completed", label: "Đã hoàn thành" },
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
        className={`rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col group select-none ${
          isSelected
            ? "bg-white dark:bg-slate-900 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
            : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 hover:shadow-lg shadow-2xs"
        }`}
      >
        {/* 1. VISUAL COVER BANNER: Full-Bleed 16/10 Header (Chuẩn trang Thi thử đề & Dictation) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-950 border-b border-slate-100 dark:border-slate-800/80">
          <LessonCoverImage
            lesson={lesson}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            showBadge={false}
          />

          {/* Soft Directional Scrim (Leaves top & center bright, protects readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Subtle Ambient Light Tone on Hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

          {/* Top Header Bar trên ảnh (Ethereal Frosted Glassmorphism twin badges) */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
            {/* Top-Left: Active Selection Badge OR CEFR Level Badge */}
            {isSelected ? (
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#0059bb]/90 text-white backdrop-blur-md border border-white/30 shadow-2xs flex items-center gap-1.5 whitespace-nowrap">
                <Play className="w-3 h-3 fill-white" />
                <span>Đang chọn</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap">
                {formatLevelBadge(lesson.level)}
              </span>
            )}

            {/* Top-Right: Completed Status Badge OR Duration Badge */}
            {isCompleted ? (
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/30 text-emerald-100 backdrop-blur-md border border-emerald-400/40 shadow-2xs flex items-center gap-1 whitespace-nowrap">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Đã học</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs tabular-nums flex items-center gap-1 shrink-0">
                <Clock className="w-2.5 h-2.5 text-white/95 stroke-[2.2]" />
                <span>{lesson.duration || "5 min"}</span>
              </span>
            )}
          </div>

          {/* Center Glass Play Orb: Smooth Fade & Subtle Scale on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Mic className="w-4.5 h-4.5 text-white" />
            </div>
          </div>
        </div>

        {/* 2. CARD BODY & FOOTER CONTAINER */}
        <div className="px-3 pt-2 pb-2.5 sm:px-3.5 sm:pt-2 sm:pb-2.5 flex-1 flex flex-col justify-between space-y-1.5 min-w-0 bg-white dark:bg-slate-900">
          <div>
            {/* Metadata Row: Category Name (Left) & Sentence Count (Right) */}
            <div className="flex items-center justify-between gap-2 text-xs mb-0.5 min-w-0">
              <span className="truncate font-semibold text-slate-500 dark:text-slate-400 text-[11px]">
                {lesson.category || "Tiếng Anh Giao Tiếp"}
              </span>
              <span className="font-mono tabular-nums shrink-0 whitespace-nowrap text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Mic className="w-3 h-3 text-slate-400" />
                <span>{lesson.totalSentences || lesson.transcript?.length || 10} câu</span>
              </span>
            </div>

            {/* Title with Dynamic 2-Line Clamp */}
            <h3
              className={`text-[13.5px] font-bold font-sans line-clamp-2 leading-snug transition-colors ${
                isSelected
                  ? "text-[#0059bb] dark:text-sky-400"
                  : "text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400"
              }`}
              title={lesson.title}
            >
              {lesson.title}
            </h3>
          </div>

          {/* Card Footer: Balanced Action Targets */}
          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 stroke-[2.2] shrink-0" />
              <span>{lesson.duration || "5 min"}</span>
            </span>

            <div className="h-8 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 select-none group/btn">
              <span>Luyện Nói</span>
              <Mic className="w-3 h-3 text-white group-hover/btn:scale-110 transition-transform" />
            </div>
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
        showGamificationStats={false}
        hideMobileSearch={true}
        searchProps={{
          value: listingSearch,
          onChange: (val) => {
            setListingSearch(val);
            if (effectiveHubMode === "video") {
              useVideoCatalogStore.getState().setFilter("searchQuery", val);
            }
          },
          placeholder:
            effectiveHubMode === "video"
              ? "Tìm video YouTube..."
              : "Tìm kiếm bài nói...",
          onClear: () => {
            setListingSearch("");
            if (effectiveHubMode === "video") {
              useVideoCatalogStore.getState().setFilter("searchQuery", "");
            }
          },
        }}
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenExplorerModal}
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Khám phá bài học</span>
              <span className="sm:hidden">Khám phá</span>
            </button>
          </div>
        }
      >
        <StudySuiteNavTabs showPracticeTab={true} />
      </AppTopHeader>

      {/* 2. MAIN LISTING CONTENT CANVAS WITH STAGGER ENTRANCE */}
      <PageEntranceWrapper className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* VIEW MODE PILL TOGGLE (Standard Audio vs Curated Video Hub) */}
        <StudyMediaHubTabs
          branch="shadowing"
          activeMode={effectiveHubMode}
          onModeChange={(mode) =>
            setMainHubMode(mode === "video" ? "video_catalog" : "standard")
          }
        />

        {effectiveHubMode === "video" ? (
          <VideoCatalogBrowseView
            practiceMode="shadowing"
            onSelectVideoLesson={(video) => {
              onSelectLesson(video.id);
            }}
          />
        ) : (
          <>
            {/* 2.1 CATEGORY TABS & FORCE REFRESH CONTROLS (MATCHING DICTATION PARITY) */}
            <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {filterTabs.map((tab) => {
                  const isActive = activeCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectCategoryTab(tab.id)}
                      className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
                        isActive
                          ? "bg-[#0059bb] text-white shadow-xs"
                          : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleForceRefresh}
                className="h-8 px-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors shadow-2xs shrink-0"
                title="Làm mới danh mục bài học từ máy chủ"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span>Làm mới</span>
              </button>
            </div>

            {/* 2.2 MICRO-HERO PRACTICE STATS BENTO GRID (Rule 8 Wadhah Aloui & /analytics Standard) */}
        {isLoadingStats ? (
          <ShadowingListingHeroStatsSkeleton />
        ) : (
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
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

        {/* Search Results Feedback (If Searching) */}
        {searchFilteredLessons && (
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
            <span>Tìm thấy {searchFilteredLessons.length} bài</span>
          </div>
        )}

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
                    Tất cả bài học cơ bản
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {allBasicLessons.map(renderLessonCard)}
              </div>
            </motion.div>
          ) : activeCategoryTab === "intermediate" ? (
            /* Tab: Tất cả bài học trung cấp B1-B2 */
            <motion.div
              key="shadowing-intermediate-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40 shadow-2xs">
                    B1 - B2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Tất cả bài học trung cấp
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {allIntermediateLessons.map(renderLessonCard)}
              </div>
            </motion.div>
          ) : activeCategoryTab === "advanced" ? (
            /* Tab: Tất cả bài học nâng cao C1-C2 */
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
                    C1 - C2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Tất cả bài học nâng cao
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
                    Bài học đã hoàn thành
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
            /* Tab "all": Tri-Tier Curated Grid (Basic + Intermediate + Advanced) */
            <motion.div
              key="shadowing-curated-rows-all"
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

              {/* HÀNG 2: BÀI HỌC TRUNG CẤP (B1 - B2) */}
              <div className="space-y-4 pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40 shadow-2xs">
                      B1 - B2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                      Bài học trung cấp{" "}
                      <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                        (Giao tiếp công việc & Đời sống hàng ngày)
                      </span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleShuffleIntermediate}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Đổi bài ngẫu nhiên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {displayedIntermediateLessons.map(renderLessonCard)}
                </div>
              </div>

              {/* HÀNG 3: BÀI HỌC NÂNG CAO (C1 - C2) */}
              <div className="space-y-4 pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                      C1 - C2
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
          </>
        )}
      </PageEntranceWrapper>
    </div>
  );
}
