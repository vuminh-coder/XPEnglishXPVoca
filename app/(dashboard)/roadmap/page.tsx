"use client";
import React from "react";
import Link from "next/link";
import { Compass, Trophy, BarChart3, Zap, Sparkles } from "lucide-react";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  useRoadmapManager,
  RoadmapHeroBanner,
  PhaseRoadmapCard,
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
          showDailyQuote={false}
          hideThemeAndAvatarOnDesktop={true}
          rightDesktopContent={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Quay Lại Lộ Trình</span>
              </button>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Tạo Lộ Trình AI</span>
              </button>
            </div>
          }
        >
          <HeaderPillContainer>
            <HeaderPillItem
              active={true}
              icon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
              label="Lộ trình"
            />
            <HeaderPillItem
              href="/analytics"
              icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
              label="Thống kê"
            />
            <HeaderPillItem
              href="/community"
              icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
              label="Xếp hạng"
            />
          </HeaderPillContainer>
        </AppTopHeader>

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
        hideThemeAndAvatarOnDesktop={true}
        rightDesktopContent={
          <Link
            href={nextUncompletedTask?.practicePath || "/study/listening"}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Học Bài Tiếp Theo</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={true}
            icon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
            label="Lộ trình"
          />
          <HeaderPillItem
            href="/analytics"
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="Thống kê"
          />
          <HeaderPillItem
            href="/community"
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp hạng"
          />
        </HeaderPillContainer>
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

        {/* 3. BENTO 3/4 + 1/4 GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* LEFT 8-COLS: HIGH-END TAILORED PHASES & LESSON CARDS */}
          <div className="lg:col-span-8 space-y-4">
            {phases.map((phase) => (
              <PhaseRoadmapCard
                key={phase.phaseNum}
                phase={phase}
                selectedTaskId={selectedTask?.id}
                onSelectTask={setSelectedTask}
                onToggleComplete={handleToggleTaskCompleted}
              />
            ))}
          </div>

          {/* RIGHT 4-COLS: INSPECTOR COMPANION CARD (Desktop) */}
          <LessonInspectorCard selectedTask={selectedTask} />
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
