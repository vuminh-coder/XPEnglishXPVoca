"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Mic,
  BookOpen,
  FileText,
  Search,
  Plus,
  Sparkles,
  RefreshCw,
  Clock,
  Check,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/components/ui";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { formatLevelBadge } from "./InteractiveTranscriptSidebar";
import { ShimmerBox } from "./LoadingSkeletons";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

export type ListeningCategoryTab = "all" | "basic" | "advanced" | "completed";

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
}: ListeningListingViewProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<ListeningCategoryTab>("all");
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const handleSelectCategoryTab = (tabId: ListeningCategoryTab) => {
    if (tabId === activeCategoryTab) return;
    setIsSwitchingCategory(true);
    setActiveCategoryTab(tabId);
    setTimeout(() => {
      setIsSwitchingCategory(false);
    }, 180);
  };

  const completedLessons = useMemo(() => {
    return lessonsList.filter((l) => completedLessonIds.includes(l.id));
  }, [lessonsList, completedLessonIds]);

  const allBasicLessons = useMemo(() => {
    return lessonsList.filter((l) => {
      const lvl = (l.level || "A1").toUpperCase();
      return lvl.includes("A1") || lvl.includes("A2") || lvl.includes("EASY") || lvl.includes("BEGINNER");
    });
  }, [lessonsList]);

  const allAdvancedLessons = useMemo(() => {
    return lessonsList.filter((l) => {
      const lvl = (l.level || "B1").toUpperCase();
      return lvl.includes("B1") || lvl.includes("B2") || lvl.includes("C1") || lvl.includes("C2") || lvl.includes("HARD") || lvl.includes("ADVANCED");
    });
  }, [lessonsList]);

  const filterTabs: { id: ListeningCategoryTab; label: string; count: number }[] = [
    { id: "all", label: "Tất cả bài học", count: lessonsList.length },
    { id: "basic", label: "Cơ bản (A1-A2)", count: allBasicLessons.length },
    { id: "advanced", label: "Nâng cao (B1-C2)", count: allAdvancedLessons.length },
    { id: "completed", label: "Đã hoàn thành", count: completedLessons.length },
  ];

  // Filter lessons based on activeCategoryTab and listingSearch
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
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. CONTINUOUS FULL-WIDTH TOP BAR (AppTopHeader) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-44 xs:w-56 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài nghe..."
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#0059bb] transition-all"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">
                {showCreateForm ? "Đóng tạo bài" : "Tạo bài AI"}
              </span>
              <span className="sm:hidden">{showCreateForm ? "Đóng" : "Tạo bài"}</span>
            </button>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active
            layoutId="listeningHeaderActiveTab"
            icon={<Headphones className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Dictation"
          />
          <HeaderPillItem
            href="/study/shadowing"
            icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
            label="Shadowing"
          />
          <HeaderPillItem
            href="/study/practice"
            icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
            label="Luyện từ vựng"
          />
          <HeaderPillItem
            href="/study/exam-prep"
            icon={<FileText className="w-3.5 h-3.5 text-rose-500" />}
            label="Thi thử đề"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN LISTING CONTENT CANVAS WITH STAGGER ENTRANCE */}
      <PageEntranceWrapper className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* FORM TẠO BÀI NGHE AI (ACCORDION) */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCreateArticle}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 overflow-hidden"
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
                        <div className="flex justify-between text-[10.5px] font-medium text-slate-500 dark:text-slate-400 pt-0.5">
                          <span>1. Kết nối YouTube CC</span>
                          <span>2. Phân tách câu & thời gian</span>
                          <span>3. Lưu vào Neon DB</span>
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
                          : "🚀 BÓC TÁCH & TẠO BÀI DICTATION YOUTUBE"}
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
                      {isCreatingLesson ? "⏳ Đang tạo..." : "🚀 TẠO BÀI NGHE AI NGAY"}
                    </Button>
                  </div>
                </>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* 3. CATEGORY / LEVEL FILTER SUB-TABS DOCK */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 relative overflow-x-auto no-scrollbar">
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
                      layoutId="listeningCategoryFilterIndicator"
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

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
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
              key="category-shimmer-sweep"
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
              key="search-results"
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
            /* All Basic Lessons Grid */
            <motion.div
              key="all-basic-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Tất cả bài học cơ bản{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1 font-mono">
                      ({allBasicLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
          ) : activeCategoryTab === "advanced" ? (
            /* All Advanced Lessons Grid */
            <motion.div
              key="all-advanced-view"
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
                    <span className="text-slate-400 font-normal text-xs ml-1 font-mono">
                      ({allAdvancedLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
            /* Completed Lessons View */
            <motion.div
              key="completed-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                    ĐÃ HỌC
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học bạn đã hoàn thành{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1 font-mono">
                      ({completedLessons.length} bài)
                    </span>
                  </h2>
                </div>
              </div>

              {completedLessons.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-40" />
                  <p className="font-semibold text-sm">Bạn chưa hoàn thành bài học nào</p>
                  <p className="mt-1">Hãy chọn một bài học ở mục Cơ bản hoặc Nâng cao để bắt đầu luyện tập nhé!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
            /* Standard Curated Rows (All) */
            <motion.div
              key="all-curated-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-7"
            >
              {/* ROW 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
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
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                    <span>Đổi bài ngẫu nhiên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {isShufflingBasic
                    ? Array.from({ length: 8 }, (_, i) => <LessonCardShimmer key={i} />)
                    : displayedBasicLessons.map((lesson) => (
                        <LessonCardItem
                          key={lesson.id}
                          lesson={lesson}
                          isSelected={lesson.id === selectedLessonId}
                          isCompleted={completedLessonIds.includes(lesson.id)}
                          onSelect={() => onSelectLesson(lesson.id)}
                        />
                      ))}
                </div>
              </div>

              {/* ROW 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                      B1 - C2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                      Bài học nâng cao{" "}
                      <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                        (Học thuật, Phỏng vấn & TED Talk)
                      </span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleShuffleAdvanced}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Đổi bài ngẫu nhiên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {isShufflingAdvanced
                    ? Array.from({ length: 8 }, (_, i) => <LessonCardShimmer key={i} />)
                    : displayedAdvancedLessons.map((lesson) => (
                        <LessonCardItem
                          key={lesson.id}
                          lesson={lesson}
                          isSelected={lesson.id === selectedLessonId}
                          isCompleted={completedLessonIds.includes(lesson.id)}
                          onSelect={() => onSelectLesson(lesson.id)}
                        />
                      ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageEntranceWrapper>
    </div>
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
        isSelected
          ? "bg-white dark:bg-slate-900 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 hover:shadow-md shadow-2xs"
      }`}
    >
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
                : "text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400"
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
            {lesson.transcript?.length || 10} câu
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function LessonCardShimmer() {
  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0 select-none">
      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
        <ShimmerBox className="w-full h-full rounded-xl" />
      </div>
      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
        <div className="space-y-1.5">
          <ShimmerBox className="h-4 w-full rounded" />
          <ShimmerBox className="h-4 w-4/5 rounded" />
        </div>
        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
          <ShimmerBox className="h-3.5 w-16 rounded" />
          <ShimmerBox className="h-5 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
