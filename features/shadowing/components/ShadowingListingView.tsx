"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  BookOpen,
  Search,
  RefreshCw,
  Clock,
  Check,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { formatLevelBadge } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { VideoCatalogBrowseView } from "@/features/listening/components/VideoCatalogBrowseView";
import { StudyMediaHubTabs } from "@/features/listening/components/StudyMediaHubTabs";
import { LessonCardShimmer } from "@/features/shadowing/components/LoadingSkeletons";
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

function translateCategoryLabel(cat?: string): string {
  if (!cat) return "Giao tiếp thực tế";
  const normalized = cat.trim().toLowerCase();
  if (normalized.includes("daily") || normalized.includes("everyday") || normalized.includes("conversation"))
    return "Đời sống hàng ngày";
  if (normalized.includes("travel") || normalized.includes("tourism") || normalized.includes("airport") || normalized.includes("hotel"))
    return "Du lịch & Khám phá";
  if (normalized.includes("business") || normalized.includes("work") || normalized.includes("office") || normalized.includes("career"))
    return "Kinh doanh & Công sở";
  if (normalized.includes("toeic") && normalized.includes("part 3")) return "TOEIC Nói • Part 3";
  if (normalized.includes("toeic") && normalized.includes("part 4")) return "TOEIC Nói • Part 4";
  if (normalized.includes("toeic")) return "Luyện chuẩn TOEIC";
  if (normalized.includes("ielts")) return "Học thuật IELTS";
  if (normalized.includes("tech") || normalized.includes("science") || normalized.includes("ai"))
    return "Khoa học & Công nghệ";
  if (normalized.includes("health") || normalized.includes("medical") || normalized.includes("lifestyle"))
    return "Sức khỏe & Đời sống";
  if (normalized.includes("education") || normalized.includes("school") || normalized.includes("study") || normalized.includes("campus"))
    return "Giáo dục & Học đường";
  if (normalized.includes("food") || normalized.includes("dining") || normalized.includes("restaurant") || normalized.includes("cooking"))
    return "Ẩm thực & Nhà hàng";
  if (normalized.includes("shopping") || normalized.includes("retail")) return "Mua sắm & Đời sống";
  if (normalized.includes("finance") || normalized.includes("economy") || normalized.includes("banking"))
    return "Tài chính & Kinh tế";
  if (normalized.includes("environment") || normalized.includes("nature")) return "Môi trường & Tự nhiên";
  if (normalized.includes("culture") || normalized.includes("art") || normalized.includes("entertainment"))
    return "Văn hóa & Giải trí";
  return cat;
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
  activeHubMode,
  basePath = "/study/shadowing/audio",
}: ShadowingListingViewProps) {
  const activeCategoryTab = useAudioCatalogStore(
    (s) => s.filters.activeCategoryTab as ShadowingCategoryTab
  );
  const setActiveCategoryTab = useAudioCatalogStore((s) => s.setActiveCategoryTab);
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  const [mainHubMode, setMainHubMode] = useState<"standard" | "video_catalog">("standard");
  const videoSearchQuery = useVideoCatalogStore((s) => s.filters.searchQuery);

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
    }, 150);
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
  const [isShufflingBasic, setIsShufflingBasic] = useState(false);
  const [isShufflingIntermediate, setIsShufflingIntermediate] = useState(false);
  const [isShufflingAdvanced, setIsShufflingAdvanced] = useState(false);

  const displayedIntermediateLessons = useMemo(() => {
    if (allIntermediateLessons.length === 0) return [];
    const pool = allIntermediateLessons;
    if (intermediateSeed === 0) return pool;
    const offset = (intermediateSeed * 4) % Math.max(1, pool.length);
    return [...pool.slice(offset), ...pool.slice(0, offset)];
  }, [allIntermediateLessons, intermediateSeed]);

  const handleShuffleBasicClick = () => {
    setIsShufflingBasic(true);
    setTimeout(() => {
      handleShuffleBasic();
      setIsShufflingBasic(false);
    }, 180);
  };

  const handleShuffleIntermediate = () => {
    setIsShufflingIntermediate(true);
    setTimeout(() => {
      setIntermediateSeed((prev) => prev + 1);
      setIsShufflingIntermediate(false);
    }, 180);
  };

  const handleShuffleAdvancedClick = () => {
    setIsShufflingAdvanced(true);
    setTimeout(() => {
      handleShuffleAdvanced();
      setIsShufflingAdvanced(false);
    }, 180);
  };

  const filterTabs: { id: ShadowingCategoryTab; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "basic", label: "Cơ bản (A1-A2)" },
    { id: "intermediate", label: "Trung cấp (B1-B2)" },
    { id: "advanced", label: "Nâng cao (C1-C2)" },
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

  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. MOBILE TOP HEADER (Hidden on Desktop >= 1024px per Rule) */}
      <AppTopHeader
        className="lg:hidden"
        showGamificationStats={false}
        hideMobileSearch={false}
        searchProps={{
          value: effectiveHubMode === "video" ? videoSearchQuery : listingSearch,
          onChange: (val) => {
            if (effectiveHubMode === "video") {
              useVideoCatalogStore.getState().setFilter("searchQuery", val);
            } else {
              setListingSearch(val);
            }
          },
          placeholder:
            effectiveHubMode === "video"
              ? "Tìm video YouTube..."
              : "Tìm kiếm bài nói...",
          onClear: () => {
            if (effectiveHubMode === "video") {
              useVideoCatalogStore.getState().setFilter("searchQuery", "");
            } else {
              setListingSearch("");
            }
          },
          hideDesktopInput: true,
        }}
        rightDesktopContent={
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenExplorerModal}
              className="h-9 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Khám phá</span>
            </button>
          </div>
        }
      >
        <StudySuiteNavTabs showPracticeTab={true} />
      </AppTopHeader>

      {/* 2. SPACIOUS CENTERED CATALOG CANVAS */}
      <PageEntranceWrapper className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7 pb-24">
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
            {/* CLEAN UNIFIED FILTER & DESKTOP SEARCH BAR */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-1">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {filterTabs.map((tab) => {
                  const isActive = activeCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectCategoryTab(tab.id)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 ${
                        isActive
                          ? "bg-[#0059bb] text-white shadow-xs"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      {tab.label}
                      {tab.id === "completed" && completedLessons.length > 0 && (
                        <span
                          className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {completedLessons.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Inline Search Input on Desktop */}
                <div className="hidden lg:block relative w-48 xl:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    placeholder="Tìm chủ đề, tên bài nói..."
                    aria-label="Tìm chủ đề, tên bài nói"
                    className="w-full h-9 pl-8.5 pr-7 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                  />
                  {listingSearch && (
                    <button
                      type="button"
                      onClick={() => setListingSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title="Xóa tìm kiếm"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Single Primary CTA on Toolbar (Rule 18) */}
                <button
                  type="button"
                  onClick={onOpenExplorerModal}
                  className="hidden lg:inline-flex h-9 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Khám phá bài học</span>
                </button>
              </div>
            </div>

            {/* 3. LESSONS GRID WITH ANIMATE PRESENCE & SHIMMER TRANSITION */}
            <AnimatePresence mode="wait">
              {isSwitchingCategory ? (
                <motion.div
                  key="shadowing-category-shimmer-sweep"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {Array.from({ length: 8 }, (_, i) => (
                    <LessonCardShimmer key={i} />
                  ))}
                </motion.div>
              ) : searchFilteredLessons ? (
                <motion.div
                  key="shadowing-search-results"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Kết quả tìm kiếm cho &ldquo;{listingSearch}&rdquo; ({searchFilteredLessons.length})
                    </h3>
                  </div>

                  {searchFilteredLessons.length === 0 ? (
                    <div className="py-16 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                      <p className="font-semibold text-sm text-slate-600 dark:text-slate-300">
                        Không tìm thấy bài nói nào phù hợp
                      </p>
                      <p className="mt-1">Hãy thử tìm kiếm với từ khóa khác</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {searchFilteredLessons.map((lesson) => (
                        <ShadowingCardItem
                          key={lesson.id}
                          lesson={lesson}
                          isSelected={lesson.id === selectedLessonId}
                          isCompleted={
                            lesson.userStatus === "COMPLETED" ||
                            completedLessonIds.includes(lesson.id) ||
                            completedLessonIds.includes(String(lesson.id))
                          }
                          onSelect={() => onSelectLesson(lesson.id)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : activeCategoryTab === "basic" ? (
                <motion.div
                  key="shadowing-basic-all"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                      A1 - A2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Bài nói cơ bản ({allBasicLessons.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allBasicLessons.map((lesson) => (
                      <ShadowingCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={
                          lesson.userStatus === "COMPLETED" ||
                          completedLessonIds.includes(lesson.id) ||
                          completedLessonIds.includes(String(lesson.id))
                        }
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "intermediate" ? (
                <motion.div
                  key="shadowing-intermediate-all"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40">
                      B1 - B2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Bài nói trung cấp ({allIntermediateLessons.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allIntermediateLessons.map((lesson) => (
                      <ShadowingCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={
                          lesson.userStatus === "COMPLETED" ||
                          completedLessonIds.includes(lesson.id) ||
                          completedLessonIds.includes(String(lesson.id))
                        }
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "advanced" ? (
                <motion.div
                  key="shadowing-advanced-all"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40">
                      C1 - C2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Bài nói nâng cao ({allAdvancedLessons.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allAdvancedLessons.map((lesson) => (
                      <ShadowingCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={
                          lesson.userStatus === "COMPLETED" ||
                          completedLessonIds.includes(lesson.id) ||
                          completedLessonIds.includes(String(lesson.id))
                        }
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "completed" ? (
                <motion.div
                  key="shadowing-completed-all"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40">
                      HOÀN THÀNH
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Bài nói đã hoàn thành ({completedLessons.length})
                    </h2>
                  </div>

                  {completedLessons.length === 0 ? (
                    <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 space-y-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Chưa có bài nói nào được hoàn thành
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Hãy chọn một bài nói trong mục Cơ bản hoặc Trung cấp để bắt đầu luyện phát âm Shadowing!
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSelectCategoryTab("all")}
                        className="mt-2 px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all inline-flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Xem tất cả bài nói</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {completedLessons.map((lesson) => (
                        <ShadowingCardItem
                          key={lesson.id}
                          lesson={lesson}
                          isSelected={lesson.id === selectedLessonId}
                          isCompleted={true}
                          onSelect={() => onSelectLesson(lesson.id)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Tab "all": 3 Spacious Horizontal Rows (4 cards per page, sliding 4 cards at a time) */
                <motion.div
                  key="shadowing-curated-rows-all"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-9"
                >
                  {/* HÀNG 1: BÀI NÓI CƠ BẢN (A1 - A2) */}
                  <HorizontalShadowingRow
                    badge="A1 - A2"
                    badgeStyle="bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border-blue-200/60 dark:border-blue-800/40"
                    title="Bài nói cơ bản"
                    subtitle="Mẫu câu ngắn, giao tiếp nền tảng"
                    lessons={displayedBasicLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleBasicClick}
                    isShuffling={isShufflingBasic}
                    shuffleIconColor="text-[#0059bb] dark:text-sky-400"
                  />

                  {/* HÀNG 2: BÀI NÓI TRUNG CẤP (B1 - B2) */}
                  <HorizontalShadowingRow
                    badge="B1 - B2"
                    badgeStyle="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40"
                    title="Bài nói trung cấp"
                    subtitle="Giao tiếp công việc & đời sống hàng ngày"
                    lessons={displayedIntermediateLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleIntermediate}
                    isShuffling={isShufflingIntermediate}
                    shuffleIconColor="text-amber-600 dark:text-amber-400"
                  />

                  {/* HÀNG 3: BÀI NÓI NÂNG CAO (C1 - C2) */}
                  <HorizontalShadowingRow
                    badge="C1 - C2"
                    badgeStyle="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40"
                    title="Bài nói nâng cao"
                    subtitle="Phỏng vấn chuyên sâu & diễn thuyết học thuật"
                    lessons={displayedAdvancedLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleAdvancedClick}
                    isShuffling={isShufflingAdvanced}
                    shuffleIconColor="text-purple-600 dark:text-purple-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </PageEntranceWrapper>
    </div>
  );
}

/**
 * Helper: Group an array of lessons into pages of 4 items.
 * Guarantees every page has 4 cards on desktop when total >= 4.
 */
function chunkIntoPages(items: any[], pageSize = 4): any[][] {
  if (!items || items.length === 0) return [];
  const pages: any[][] = [];
  for (let i = 0; i < items.length; i += pageSize) {
    let chunk = items.slice(i, i + pageSize);
    if (chunk.length < pageSize && items.length >= pageSize) {
      const needed = pageSize - chunk.length;
      const extras = items.filter((item) => !chunk.some((c) => c.id === item.id)).slice(0, needed);
      chunk = [...chunk, ...extras];
    }
    pages.push(chunk);
  }
  return pages;
}

function HorizontalShadowingRow({
  badge,
  badgeStyle,
  title,
  subtitle,
  lessons,
  selectedLessonId,
  completedLessonIds,
  onSelectLesson,
  onShuffle,
  isShuffling,
  shuffleIconColor,
}: {
  badge: string;
  badgeStyle: string;
  title: string;
  subtitle: string;
  lessons: any[];
  selectedLessonId: string | null;
  completedLessonIds: (string | number)[];
  onSelectLesson: (id: string | number) => void;
  onShuffle: () => void;
  isShuffling: boolean;
  shuffleIconColor: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(lessons.length > 4);

  const pages = useMemo(() => chunkIntoPages(lessons, 4), [lessons]);
  const totalPages = pages.length;

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const pageIdx = clientWidth > 0 ? Math.round(scrollLeft / clientWidth) : 0;
    setCurrentPage(Math.min(pageIdx, Math.max(0, totalPages - 1)));
    setCanScrollPrev(scrollLeft > 12);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 12);
  }, [totalPages]);

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, lessons]);

  const handleSlide = (dir: "prev" | "next") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const stepWidth = el.clientWidth;
    const targetLeft =
      dir === "next" ? el.scrollLeft + stepWidth : el.scrollLeft - stepWidth;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs border shrink-0 ${badgeStyle}`}
          >
            {badge}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
            {title}
          </h2>
          <span className="text-slate-400 dark:text-slate-500 text-xs hidden md:inline truncate">
            • {subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onShuffle}
            className="h-8 px-2.5 sm:px-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
            title="Đổi danh sách bài nói"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${shuffleIconColor} ${
                isShuffling ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">Đổi bài</span>
          </button>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline-block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mr-0.5 tabular-nums">
                {currentPage + 1}/{totalPages}
              </span>
              <button
                type="button"
                onClick={() => handleSlide("prev")}
                disabled={!canScrollPrev}
                aria-label={`Lướt trái ${title}`}
                className="w-8 h-8 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-[#0059bb] hover:text-[#0059bb] disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide("next")}
                disabled={!canScrollNext}
                aria-label={`Lướt phải ${title}`}
                className="w-8 h-8 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-[#0059bb] hover:text-[#0059bb] disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isShuffling ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }, (_, i) => (
            <LessonCardShimmer key={i} />
          ))}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex items-start sm:items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-3 sm:gap-5 pb-1 -mx-1 px-1"
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
                  <ShadowingCardItem
                    lesson={lesson}
                    isSelected={lesson.id === selectedLessonId}
                    isCompleted={
                      lesson.userStatus === "COMPLETED" ||
                      completedLessonIds.includes(lesson.id) ||
                      completedLessonIds.includes(String(lesson.id))
                    }
                    onSelect={() => onSelectLesson(lesson.id)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ShadowingCardItem({
  lesson,
  isSelected,
  isCompleted,
  onSelect,
}: {
  lesson: any;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className="group relative rounded-2xl bg-white dark:bg-slate-900 shadow-xs lg:hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden select-none h-full"
    >
      {/* Crisp 4-Corner & 4-Edge Border Overlay (Rendered above image GPU layer) */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl border transition-colors z-30 ${
          isSelected
            ? "border-[#0059bb] ring-2 ring-[#0059bb]/20"
            : "border-slate-200 dark:border-slate-800 lg:group-hover:border-[#0059bb]/70 dark:lg:group-hover:border-sky-500/60"
        }`}
      />

      {/* 1. VISUAL COVER BANNER (Clean 120px/144px Header, Zero Corner Bleed) */}
      <div className="relative h-36 sm:h-[120px] w-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800/80">
        <LessonCoverImage
          lesson={lesson}
          className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-500"
          showBadge={false}
        />

        {/* Soft Directional Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
          {isSelected ? (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#0059bb]/90 text-white backdrop-blur-md border border-white/25 flex items-center gap-1 whitespace-nowrap">
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>Đang chọn</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/65 text-white backdrop-blur-md border border-white/15 whitespace-nowrap">
              {formatLevelBadge(lesson.level)}
            </span>
          )}

          {isCompleted ? (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 whitespace-nowrap">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              <span>Đã học</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-slate-900/60 text-white backdrop-blur-md tabular-nums flex items-center gap-1 shrink-0">
              <Clock className="w-2.5 h-2.5 text-white/90" />
              <span>{lesson.duration || "5 min"}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. CARD BODY & FOOTER CONTAINER */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5 min-w-0 bg-white dark:bg-slate-900">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="truncate">{translateCategoryLabel(lesson.category)}</span>
          </div>

          <h3
            className={`text-sm font-bold leading-[19px] line-clamp-2 overflow-hidden sm:h-[38px] transition-colors ${
              isSelected
                ? "text-[#0059bb] dark:text-sky-400"
                : "text-slate-900 dark:text-white lg:group-hover:text-[#0059bb] dark:lg:group-hover:text-sky-400"
            }`}
            title={lesson.title}
          >
            {lesson.title}
          </h3>
        </div>

        {/* Card Footer: Secondary Pill CTA (Rule 18 - Avoid repeating solid blue Primary buttons on every card) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            <Mic className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{lesson.totalSentences || lesson.transcript?.length || 10} câu nói</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 lg:group-hover:bg-[#0059bb] lg:group-hover:text-white transition-colors">
            <span>{isCompleted ? "Ôn lại" : "Luyện nói"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
