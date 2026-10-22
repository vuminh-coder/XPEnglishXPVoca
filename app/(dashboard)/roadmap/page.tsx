"use client";
import React from "react";
import Link from "next/link";
import { Compass, Target, Play, Wand2 } from "lucide-react";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { ProgressSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  useRoadmapManager,
  RoadmapHeroBanner,
  PhaseRoadmapCard,
  PhaseCarouselSwiper,
  LessonInspectorCard,
  GoalSelectionForm,
  AiBlueprintPreview,
} from "@/features/roadmap";

export default function RoadmapPage() {
  const {
    user,
    plan,
    targetCategory,
    setTargetCategory,
    targetExam,
    setTargetExam,
    targetScore,
    setTargetScore,
    currentLevel,
    setCurrentLevel,
    weeklyHours,
    setWeeklyHours,
    isFormOpen,
    setIsFormOpen,
    phases,
    selectedTask,
    setSelectedTask,
    handleGenerate,
    handleToggleTaskCompleted,
    overallProgress,
    nextUncompletedTask,
    currentActiveExam,
    currentActiveScore,
  } = useRoadmapManager();

  // 1. STEP 1: GOAL SELECTION FORM (Bento Form 8 cols + AI Blueprint Preview 4 cols)
  if (isFormOpen) {
    return (
      <PageEntranceWrapper
        className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
        suppressHydrationWarning
      >
        {/* APP TOP HEADER INTEGRATION */}
        <AppTopHeader
          onBack={() => setIsFormOpen(false)}
          showDailyQuote={false}
          showGamificationStats={false}
          hideMobileSearch={true}
          mobileTitle={
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
              Thiết Lập Mục Tiêu
            </span>
          }
          leftContent={
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold font-display text-slate-800 dark:text-slate-200">
              <span className="text-slate-400">Lộ Trình Học</span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" />
                <span>Thiết Lập Mục Tiêu AI</span>
              </span>
            </div>
          }
          rightDesktopContent={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 font-display"
              >
                <span>Hủy Bỏ</span>
              </button>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white font-bold text-xs shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 font-display"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Tạo Lộ Trình AI</span>
              </button>
            </div>
          }
        />

        {/* UNIFIED 7XL CONTAINER */}
        <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
          <RoadmapHeroBanner
            mode="goal-setting"
            userName={user?.fullName || "Học Viên"}
            onOpenChatbot={() => useAiChatbotStore.getState().openRoadmapDirectly()}
          />

          {/* BENTO GRID: 8 COLS FORM + 4 COLS PREVIEW WIDGET */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            <div className="lg:col-span-8">
              <GoalSelectionForm
                targetCategory={targetCategory}
                setTargetCategory={setTargetCategory}
                targetExam={targetExam}
                setTargetExam={setTargetExam}
                targetScore={targetScore}
                setTargetScore={setTargetScore}
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                weeklyHours={weeklyHours}
                setWeeklyHours={setWeeklyHours}
                hasExistingPlan={true}
                onCancel={() => setIsFormOpen(false)}
                onSubmit={handleGenerate}
              />
            </div>

            <AiBlueprintPreview
              targetExam={targetExam}
              targetScore={targetScore}
            />
          </div>
        </div>
      </PageEntranceWrapper>
    );
  }

  // 2. STEP 2: HIGH-END TAILORED ROADMAP PATHWAY
  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        showDailyQuote={false}
        showGamificationStats={false}
        hideMobileSearch={true}
        mobileTitle={
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            <Compass className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
            <span>Lộ Trình AI</span>
          </div>
        }
        rightDesktopContent={
          <Link
            href={nextUncompletedTask?.practicePath || "/study/dictation"}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0 max-w-[280px]"
            title={`Tiếp tục: Ngày ${nextUncompletedTask?.dayNum || 1} - ${nextUncompletedTask?.title || "Bài học"}`}
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">
              Tiếp tục: Ngày {nextUncompletedTask?.dayNum || 1}
            </span>
          </Link>
        }
        rightMobileContent={
          <Link
            href={nextUncompletedTask?.practicePath || "/study/dictation"}
            className="h-8 px-2.5 rounded-lg bg-[#0059bb] text-white text-[11px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Play className="w-3 h-3 fill-current shrink-0" />
            <span>Học tiếp</span>
          </Link>
        }
      >
        <ProgressSuiteNavTabs />
      </AppTopHeader>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        <RoadmapHeroBanner
          mode="pathway"
          userName={user?.fullName || "Học Viên"}
          currentActiveExam={currentActiveExam}
          currentActiveScore={currentActiveScore}
          overallProgress={overallProgress}
          onOpenForm={() => setIsFormOpen(true)}
        />

        {/* 3. BENTO 3/4 + 1/4 GRID LAYOUT: CAROUSEL TRACK + FIXED COMPANION INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* LEFT 8-COLS: HIGH-END TAILORED PHASES CAROUSEL SWIPER (Dạng lướt) */}
          <div className="lg:col-span-8 min-w-0">
            <PhaseCarouselSwiper
              phases={phases}
              selectedTaskId={selectedTask?.id}
              onSelectTask={setSelectedTask}
              onToggleComplete={handleToggleTaskCompleted}
            />
          </div>

          {/* RIGHT 4-COLS: INSPECTOR COMPANION CARD (Desktop - Cố định) */}
          <LessonInspectorCard selectedTask={selectedTask} />
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
