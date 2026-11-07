"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Sparkles,
  RefreshCw,
  Clock,
  Check,
  Play,
  CheckCircle2,
  ListChecks,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { formatLevelBadge } from "./InteractiveTranscriptSidebar";
import { ShimmerBox } from "./LoadingSkeletons";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { VideoCatalogBrowseView } from "./VideoCatalogBrowseView";
import { StudyMediaHubTabs } from "./StudyMediaHubTabs";
import { useAudioCatalogStore, AudioCategoryTab } from "@/stores/audioCatalogStore";
import { useVideoCatalogStore } from "@/stores";

export type ListeningCategoryTab = AudioCategoryTab;

function translateCategoryLabel(cat?: string): string {
  if (!cat) return "Giao tiếp hàng ngày";
  const map: Record<string, string> = {
    "Daily Conversations": "Giao tiếp hàng ngày",
    "Daily Life": "Đời sống hàng ngày",
    "Business & Work": "Công sở & Kinh doanh",
    Business: "Kinh doanh & Công sở",
    "Travel & Culture": "Du lịch & Văn hóa",
    Travel: "Du lịch & Khám phá",
    Shopping: "Mua sắm & Đời sống",
    Healthcare: "Y tế & Sức khỏe",
    "Science & Tech": "Khoa học & Công nghệ",
    Technology: "Công nghệ & Đổi mới",
    "Health & Lifestyle": "Sức khỏe & Lối sống",
    "Academic & IELTS": "Học thuật & IELTS",
    Academic: "Học thuật & Nghiên cứu",
    "News & Society": "Tin tức & Xã hội",
    Entertainment: "Giải trí & Phim ảnh",
    "Toeic Listening Part 1": "TOEIC Nghe • Part 1",
    "Toeic Listening Part 2": "TOEIC Nghe • Part 2",
    "Toeic Listening Part 3": "TOEIC Nghe • Part 3",
    "Toeic Listening Part 4": "TOEIC Nghe • Part 4",
    "TOEIC Part 1": "TOEIC Nghe • Part 1",
    "TOEIC Part 2": "TOEIC Nghe • Part 2",
    "TOEIC Part 3": "TOEIC Nghe • Part 3",
    "TOEIC Part 4": "TOEIC Nghe • Part 4",
    "Ielts Listening Section 1": "IELTS Nghe • Section 1",
    "Ielts Listening Section 2": "IELTS Nghe • Section 2",
    "Ielts Listening Section 3": "IELTS Nghe • Section 3",
    "Ielts Listening Section 4": "IELTS Nghe • Section 4",
  };
  return map[cat] || cat;
}

interface ListeningListingViewProps {
  lessonsList: any[];
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  completedLessonIds: string[];
  listingSearch: string;
  setListingSearch: (s: string) => void;
  showCreateForm: boolean;
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  createModeTab: "text" | "youtube";
  setCreateModeTab: (tab: "text" | "youtube") => void;
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  newTitle: string;
  setNewTitle: (title: string) => void;
  newThumbnail: string;
  setNewThumbnail: (thumb: string) => void;
  newText: string;
  setNewText: (text: string) => void;
  newAccent: string;
  setNewAccent: (acc: string) => void;
  newLevel: string;
  setNewLevel: (lvl: string) => void;
  isExtractingYoutube: boolean;
  isCreatingLesson: boolean;
  handleCreateArticle: (e: React.FormEvent) => Promise<void>;
  handleShuffleBasic: () => void;
  handleShuffleAdvanced: () => void;
  isShufflingBasic: boolean;
  isShufflingAdvanced: boolean;
  displayedBasicLessons: any[];
  displayedAdvancedLessons: any[];
  activeHubMode?: "audio" | "video";
  basePath?: string;
}

export function ListeningListingView({
  lessonsList,
  selectedLessonId,
  onSelectLesson,
  completedLessonIds,
  listingSearch,
  setListingSearch,
  showCreateForm,
  setShowCreateForm,
  createModeTab,
  setCreateModeTab,
  youtubeUrl,
  setYoutubeUrl,
  newTitle,
  setNewTitle,
  newThumbnail,
  setNewThumbnail,
  newText,
  setNewText,
  newAccent,
  setNewAccent,
  newLevel,
  setNewLevel,
  isExtractingYoutube,
  isCreatingLesson,
  handleCreateArticle,
  handleShuffleBasic,
  handleShuffleAdvanced,
  isShufflingBasic,
  isShufflingAdvanced,
  displayedBasicLessons,
  displayedAdvancedLessons,
  activeHubMode,
  basePath = "/study/dictation/audio",
}: ListeningListingViewProps) {
  const activeCategoryTab = useAudioCatalogStore((s) => s.filters.activeCategoryTab);
  const setActiveCategoryTab = useAudioCatalogStore((s) => s.setActiveCategoryTab);
  const intermediateSeed = useAudioCatalogStore((s) => s.filters.shuffleSeedIntermediate);
  const setIntermediateSeed = useAudioCatalogStore((s) => s.setShuffleSeedIntermediate);
  const videoSearchQuery = useVideoCatalogStore((s) => s.filters.searchQuery);
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  const [mainHubMode, setMainHubMode] = useState<"standard" | "video_catalog">("standard");

  const effectiveHubMode =
    activeHubMode ||
    (basePath?.includes("/video")
      ? "video"
      : mainHubMode === "video_catalog"
      ? "video"
      : "audio");

  const handleSelectCategoryTab = (tabId: ListeningCategoryTab) => {
    if (tabId === activeCategoryTab) return;
    setIsSwitchingCategory(true);
    setActiveCategoryTab(tabId);
    setTimeout(() => {
      setIsSwitchingCategory(false);
    }, 150);
  };

  const completedLessons = useMemo(() => {
    return lessonsList.filter((l) => completedLessonIds.includes(l.id));
  }, [lessonsList, completedLessonIds]);

  const allBasicLessons = useMemo(() => {
    return lessonsList.filter((l) => {
      const lvl = (l.level || "A1").toUpperCase();
      return (
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

  const [isShufflingIntermediate, setIsShufflingIntermediate] = useState(false);

  const displayedIntermediateLessons = useMemo(() => {
    if (allIntermediateLessons.length === 0) return [];
    const pool = allIntermediateLessons;
    if (intermediateSeed === 0) return pool;
    const offset = (intermediateSeed * 4) % Math.max(1, pool.length);
    return [...pool.slice(offset), ...pool.slice(0, offset)];
  }, [allIntermediateLessons, intermediateSeed]);

  const handleShuffleIntermediate = () => {
    setIsShufflingIntermediate(true);
    setTimeout(() => {
      setIntermediateSeed((prev) => prev + 1);
      setIsShufflingIntermediate(false);
    }, 180);
  };

  const filterTabs: { id: ListeningCategoryTab; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "basic", label: "Cơ bản (A1-A2)" },
    { id: "intermediate", label: "Trung cấp (B1-B2)" },
    { id: "advanced", label: "Nâng cao (C1-C2)" },
    { id: "completed", label: "Đã hoàn thành" },
  ];

  // Filter lessons based on listingSearch
  const searchFilteredLessons = useMemo(() => {
    if (!listingSearch.trim()) return null;
    const query = listingSearch.toLowerCase();
    return lessonsList.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        (l.category && l.category.toLowerCase().includes(query)) ||
        (l.level && l.level.toLowerCase().includes(query))
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
              : "Tìm kiếm bài nghe...",
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
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="h-9 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{showCreateForm ? "Đóng" : "Tạo bài"}</span>
            </button>
          </div>
        }
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. SPACIOUS CENTERED CATALOG CANVAS */}
      <PageEntranceWrapper className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7 pb-24">
        {/* VIEW MODE PILL TOGGLE (Standard Audio vs Curated Video Hub) */}
        <StudyMediaHubTabs
          branch="dictation"
          activeMode={effectiveHubMode}
          onModeChange={(mode) =>
            setMainHubMode(mode === "video" ? "video_catalog" : "standard")
          }
        />

        {effectiveHubMode === "video" ? (
          <VideoCatalogBrowseView
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
                    placeholder="Tìm chủ đề, tên bài nghe..."
                    aria-label="Tìm chủ đề, tên bài nghe"
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
                  onClick={() => setShowCreateForm((prev) => !prev)}
                  className="hidden lg:inline-flex h-9 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{showCreateForm ? "Đóng tạo bài" : "Tạo bài AI"}</span>
                </button>
              </div>
            </div>

            {/* FORM TẠO BÀI NGHE AI (ACCORDION) */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateArticle}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 relative">
                      <button
                        type="button"
                        onClick={() => setCreateModeTab("text")}
                        className={`relative px-3 py-1 rounded-lg text-xs font-bold uppercase font-display flex items-center gap-1.5 transition-colors cursor-pointer select-none z-10 ${
                          createModeTab === "text"
                            ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        }`}
                      >
                        {createModeTab === "text" && (
                          <motion.div
                            layoutId="listeningCreateModeTabIndicator"
                            className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 relative z-10" />
                        <span className="relative z-10">Tạo từ văn bản AI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCreateModeTab("youtube")}
                        className={`relative px-3 py-1 rounded-lg text-xs font-bold uppercase font-display flex items-center gap-1.5 transition-colors cursor-pointer select-none z-10 ${
                          createModeTab === "youtube"
                            ? "text-rose-600 dark:text-rose-400 font-extrabold"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        }`}
                      >
                        {createModeTab === "youtube" && (
                          <motion.div
                            layoutId="listeningCreateModeTabIndicator"
                            className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="w-2 h-2 rounded-full bg-rose-500 relative z-10" />
                        <span className="relative z-10">Nhập từ YouTube Subtitles</span>
                      </button>
                    </div>

                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                      {createModeTab === "text"
                        ? "Tự động tách câu và sinh audio AI"
                        : "Bóc tách phụ đề CC có sẵn từ link YouTube"}
                    </span>
                  </div>

                  {createModeTab === "youtube" ? (
                    <div className="space-y-3.5 py-1">
                      <div className="space-y-1">
                        <label
                          htmlFor="youtube-url-input"
                          className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                        >
                          <span className="text-rose-600">▶</span> Đường dẫn Video YouTube (YouTube Video URL):
                        </label>
                        <input
                          id="youtube-url-input"
                          type="url"
                          required
                          className="w-full h-10 px-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all"
                          placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                        <p className="text-[11px] text-slate-500">
                          Hệ thống sẽ tự động bóc tách toàn bộ phụ đề tiếng Anh và chia thành từng câu Dictation kèm thời gian chuẩn.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label
                            htmlFor="youtube-custom-title-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            Tiêu đề bài học (Tùy chọn):
                          </label>
                          <input
                            id="youtube-custom-title-input"
                            type="text"
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition-all"
                            placeholder="Để trống để dùng tiêu đề tự động..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="youtube-level-select"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            Độ khó bài học:
                          </label>
                          <select
                            id="youtube-level-select"
                            value={newLevel}
                            onChange={(e) => setNewLevel(e.target.value)}
                            className="w-full h-10 px-3 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="A1">Level A1 (Cơ bản)</option>
                            <option value="A2">Level A2 (Sơ cấp)</option>
                            <option value="B1">Level B1 (Trung cấp)</option>
                            <option value="B2">Level B2 (Trung cấp khá)</option>
                            <option value="C1">Level C1 (Nâng cao)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        {isExtractingYoutube && (
                          <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2 select-none">
                            <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-300">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                                Đang bóc tách phụ đề & mốc thời gian YouTube...
                              </span>
                              <span className="font-mono text-[11px] font-bold">3 Bước CSDL</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-rose-200 dark:bg-rose-900 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600 animate-[shimmer_1.5s_infinite]" />
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isExtractingYoutube}
                            className="h-9 px-5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs active:scale-95 transition-transform cursor-pointer"
                          >
                            {isExtractingYoutube
                              ? "⏳ ĐANG BÓC TÁCH PHỤ ĐỀ..."
                              : "Bóc tách & Tạo bài YouTube"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label
                            htmlFor="new-article-title-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            1. Tiêu đề bài đọc (Title):
                          </label>
                          <input
                            id="new-article-title-input"
                            type="text"
                            required
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-4 focus:ring-blue-500/10 transition-all"
                            placeholder="VD: Daily Morning Routine in London..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="new-article-thumbnail-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            2. Link ảnh Thumbnail (Không bắt buộc):
                          </label>
                          <input
                            id="new-article-thumbnail-input"
                            type="url"
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-4 focus:ring-blue-500/10 transition-all"
                            placeholder="https://images.unsplash.com/..."
                            value={newThumbnail}
                            onChange={(e) => setNewThumbnail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="new-article-text-textarea"
                          className="text-xs font-bold text-slate-700 dark:text-slate-300"
                        >
                          3. Nội dung văn bản đoạn văn (English Text Content):
                        </label>
                        <textarea
                          id="new-article-text-textarea"
                          rows={3}
                          required
                          className="w-full p-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-4 focus:ring-blue-500/10 transition-all"
                          placeholder="Today is a beautiful day. I really love learning English with AI..."
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <select
                            aria-label="Chọn Accent"
                            value={newAccent}
                            onChange={(e) => setNewAccent(e.target.value)}
                            className="h-8 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="en-US">US Accent</option>
                            <option value="en-GB">UK Accent</option>
                            <option value="en-AU">AU Accent</option>
                          </select>

                          <select
                            aria-label="Chọn Trình độ Level"
                            value={newLevel}
                            onChange={(e) => setNewLevel(e.target.value)}
                            className="h-8 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="A1">Level A1</option>
                            <option value="A2">Level A2</option>
                            <option value="B1">Level B1</option>
                            <option value="B2">Level B2</option>
                            <option value="C1">Level C1</option>
                          </select>
                        </div>

                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isCreatingLesson}
                          className="h-9 px-5 text-xs font-bold rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white shadow-xs active:scale-95 transition-transform cursor-pointer"
                        >
                          {isCreatingLesson ? "⏳ Đang tạo..." : "Tạo bài nghe AI"}
                        </Button>
                      </div>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            {/* 4. LESSONS ROWS & FILTERED VIEWS */}
            <AnimatePresence mode="wait">
              {isSwitchingCategory ? (
                <motion.div
                  key="category-shimmer-sweep"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {Array.from({ length: 4 }, (_, i) => (
                    <LessonCardShimmer key={i} />
                  ))}
                </motion.div>
              ) : searchFilteredLessons ? (
                /* Search Results Grid */
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Kết quả tìm kiếm cho: &ldquo;{listingSearch}&rdquo; ({searchFilteredLessons.length} bài)
                    </h3>
                  </div>

                  {searchFilteredLessons.length === 0 ? (
                    <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Không tìm thấy bài nghe phù hợp
                      </p>
                      <p className="text-xs text-slate-500">
                        Hãy thử tìm kiếm với từ khóa khác hoặc xóa ô tìm kiếm.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {searchFilteredLessons.map((lesson) => (
                        <LessonCardItem
                          key={lesson.id}
                          lesson={lesson}
                          isSelected={lesson.id === selectedLessonId}
                          isCompleted={completedLessonIds.includes(lesson.id)}
                          onSelect={() => onSelectLesson(lesson.id)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : activeCategoryTab === "basic" ? (
                <motion.div
                  key="all-basic-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                        A1 - A2
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Tất cả bài nghe cơ bản
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {allBasicLessons.length} bài
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allBasicLessons.map((lesson) => (
                      <LessonCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={completedLessonIds.includes(lesson.id)}
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "intermediate" ? (
                <motion.div
                  key="all-intermediate-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40">
                        B1 - B2
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Tất cả bài nghe trung cấp
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {allIntermediateLessons.length} bài
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allIntermediateLessons.map((lesson) => (
                      <LessonCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={completedLessonIds.includes(lesson.id)}
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "advanced" ? (
                <motion.div
                  key="all-advanced-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40">
                        C1 - C2
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Tất cả bài nghe nâng cao
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {allAdvancedLessons.length} bài
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allAdvancedLessons.map((lesson) => (
                      <LessonCardItem
                        key={lesson.id}
                        lesson={lesson}
                        isSelected={lesson.id === selectedLessonId}
                        isCompleted={completedLessonIds.includes(lesson.id)}
                        onSelect={() => onSelectLesson(lesson.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : activeCategoryTab === "completed" ? (
                <motion.div
                  key="completed-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40">
                        ĐÃ HỌC
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Bài nghe bạn đã hoàn thành
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {completedLessons.length} bài
                    </span>
                  </div>

                  {completedLessons.length === 0 ? (
                    <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-40" />
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                        Bạn chưa hoàn thành bài nghe nào
                      </p>
                      <p className="text-xs text-slate-500">
                        Hãy chọn một bài học ở mục Cơ bản hoặc Trung cấp để bắt đầu luyện tập nhé!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {completedLessons.map((lesson) => (
                        <LessonCardItem
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
                /* Standard Curated Horizontal Carousel Rows (4 Cards per Row, Slide 4 at a time) */
                <motion.div
                  key="all-curated-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-9"
                >
                  {/* ROW 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
                  <HorizontalLessonRow
                    badge="A1 - A2"
                    badgeClassName="bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border-blue-200/60 dark:border-blue-800/40"
                    title="Bài nghe cơ bản"
                    subtitle="Mẫu câu ngắn, giao tiếp nền tảng"
                    lessons={displayedBasicLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleBasic}
                    isShuffling={isShufflingBasic}
                  />

                  {/* ROW 2: BÀI HỌC TRUNG CẤP (B1 - B2) */}
                  <HorizontalLessonRow
                    badge="B1 - B2"
                    badgeClassName="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40"
                    title="Bài nghe trung cấp"
                    subtitle="Giao tiếp công việc & đời sống hàng ngày"
                    lessons={displayedIntermediateLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleIntermediate}
                    isShuffling={isShufflingIntermediate}
                  />

                  {/* ROW 3: BÀI HỌC NÂNG CAO (C1 - C2) */}
                  <HorizontalLessonRow
                    badge="C1 - C2"
                    badgeClassName="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40"
                    title="Bài nghe nâng cao"
                    subtitle="Học thuật, phỏng vấn & thuyết trình"
                    lessons={displayedAdvancedLessons}
                    selectedLessonId={selectedLessonId}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={onSelectLesson}
                    onShuffle={handleShuffleAdvanced}
                    isShuffling={isShufflingAdvanced}
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

interface HorizontalLessonRowProps {
  badge: string;
  badgeClassName: string;
  title: string;
  subtitle: string;
  lessons: any[];
  selectedLessonId: string | null;
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
  onShuffle?: () => void;
  isShuffling?: boolean;
}

function HorizontalLessonRow({
  badge,
  badgeClassName,
  title,
  subtitle,
  lessons,
  selectedLessonId,
  completedLessonIds,
  onSelectLesson,
  onShuffle,
  isShuffling = false,
}: HorizontalLessonRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Group into pages of 4 lessons so each desktop swipe shows 4 full cards
  const pages = useMemo(() => {
    const result: any[][] = [];
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

  if (lessons.length === 0 && !isShuffling) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-xs border shrink-0 ${badgeClassName}`}
          >
            {badge}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
            {title}
          </h2>
          <span className="text-xs text-slate-400 hidden md:inline truncate">
            • {subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onShuffle && (
            <button
              type="button"
              onClick={onShuffle}
              className="h-8 px-2.5 sm:px-3 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
              title="Đổi bài ngẫu nhiên"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span className="hidden sm:inline">Đổi bài</span>
            </button>
          )}

          {totalPages > 1 && (
            <span className="hidden sm:inline text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 mr-0.5 tabular-nums">
              {Math.min(currentPage + 1, totalPages)}/{totalPages}
            </span>
          )}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label={`Lướt trái ${title}`}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0059bb] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label={`Lướt phải ${title}`}
            className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0059bb] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isShuffling ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }, (_, i) => (
            <LessonCardShimmer key={i} />
          ))}
        </div>
      ) : (
        /* Horizontal Carousel:
           - Mobile (< 640px): 1 full card per swipe (`w-full min-w-full`) with `items-start`
           - Desktop (lg): 4 cards per page (`lg:grid-cols-4`), each swipe moves 4 full cards */
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
                  <LessonCardItem
                    lesson={lesson}
                    isSelected={lesson.id === selectedLessonId}
                    isCompleted={completedLessonIds.includes(lesson.id)}
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

function LessonCardItem({
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
          >
            {lesson.title}
          </h3>
        </div>

        {/* Card Footer: Secondary Pill CTA (Rule 18 - Avoid repeating solid blue Primary buttons on every card) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            <ListChecks className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{lesson.totalSentences || lesson.transcript?.length || 10} câu nghe</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 lg:group-hover:bg-[#0059bb] lg:group-hover:text-white transition-colors">
            <span>{isCompleted ? "Ôn lại" : "Luyện nghe"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function LessonCardShimmer() {
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
          <ShimmerBox className="h-3.5 w-14 rounded" />
          <ShimmerBox className="h-7 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
