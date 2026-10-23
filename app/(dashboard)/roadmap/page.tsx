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
    stepSessions,
    selectedStep,
    setSelectedStep,
    handleToggleStepCompleted,
    handleAdvanceStepSession,
    getStepProgress,
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
        {/* 3. FULL WIDTH DUOLINGO WINDING PATHWAY (Khối Lộ Trình Toàn Chiều Rộng, Không Border) */}
        <div className="w-full min-w-0">
          <div className="w-full py-2 sm:py-4">
            <ZiczacRoadmapPathway
              steps={ziczacSteps}
              selectedStepId={selectedStep?.id}
              completedStepIds={completedStepIds}
              stepSessions={stepSessions}
              getStepProgress={getStepProgress}
              onAdvanceSession={handleAdvanceStepSession}
              onSelectStep={setSelectedStep}
              onToggleComplete={handleToggleStepCompleted}
            />
          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
