"use client";

import React from "react";
import Link from "next/link";
import { Compass, Play, Trophy, CheckCircle2 } from "lucide-react";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { ProgressSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  useRoadmapManager,
  ZiczacRoadmapPathway,
  RoadmapDuolingoSidebar,
} from "@/features/roadmap";

export default function RoadmapPage() {
  const {
    ziczacSteps,
    completedStepIds,
    selectedStep,
    setSelectedStep,
    handleToggleStepCompleted,
    nextActiveStep,
    nextCheckpointStep,
    stepsUntilNextCheckpoint,
    overallProgress,
    totalStepsCount,
    completedStepsCount,
  } = useRoadmapManager();

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
            <span>Lộ Trình Duolingo</span>
          </div>
        }
        rightDesktopContent={
          <Link
            href={nextActiveStep.practicePath}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0 max-w-[280px]"
            title={`Tiếp tục: Chặng ${nextActiveStep.stepNumber} - ${nextActiveStep.title}`}
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">
              Học tiếp: Chặng {nextActiveStep.stepNumber}
            </span>
          </Link>
        }
        rightMobileContent={
          <Link
            href={nextActiveStep.practicePath}
            className="h-8 px-2.5 rounded-lg bg-[#0059bb] text-white text-[11px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Play className="w-3 h-3 fill-current shrink-0" />
            <span>Chặng {nextActiveStep.stepNumber}</span>
          </Link>
        }
      >
        <ProgressSuiteNavTabs />
      </AppTopHeader>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 space-y-4 pt-1">
        {/* Compact Pathway Banner */}
        <div className="py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Branding & Roadmap Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-xs shadow-[#0059bb]/20">
              <Compass className="w-4 h-4 stroke-[2.2]" />
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-slate-900 dark:text-white leading-none truncate">
                Lộ Trình Học 20 Chặng
              </h1>
              <span className="hidden md:inline-block text-slate-300 dark:text-slate-700">•</span>
              <span className="hidden md:inline-block text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                Cứ 5 chặng có 1 Cột Mốc Tổng Hợp để kiểm tra lại các chặng đã qua
              </span>
            </div>
          </div>

          {/* Right: Inline Progress */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shrink-0 self-start sm:self-auto">
            <div className="w-16 sm:w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, overallProgress))}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {overallProgress}%
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              ({completedStepsCount}/{totalStepsCount} chặng)
            </span>
          </div>
        </div>

        {/* 3. FULL WIDTH DUOLINGO WINDING PATHWAY (Khối Lộ Trình Toàn Chiều Rộng, Không Border) */}
        <div className="w-full min-w-0">
          <div className="w-full py-2 sm:py-4">
            <ZiczacRoadmapPathway
              steps={ziczacSteps}
              selectedStepId={selectedStep?.id}
              completedStepIds={completedStepIds}
              onSelectStep={setSelectedStep}
              onToggleComplete={handleToggleStepCompleted}
            />
          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
