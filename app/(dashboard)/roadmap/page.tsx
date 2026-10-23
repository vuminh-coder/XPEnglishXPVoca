"use client";

import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
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
  } = useRoadmapManager();

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* 1. MASTER TOP HEADER (3D Tactile AppTopHeader Styled for Roadmap) */}
      <AppTopHeader
        is3D={true}
        showGamificationStats={false}
        hideMobileSearch={false}
        searchProps={{
          value: searchQuery,
          onChange: (val) => setSearchQuery(val),
          placeholder: "Tìm kiếm bài học, chủ đề...",
          onClear: () => setSearchQuery(""),
        }}
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href={nextActiveStep.practicePath}
              className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-black font-display border-b-[3.5px] border-[#003d82] active:border-b-0 active:translate-y-[3.5px] shadow-sm flex items-center gap-1.5 cursor-pointer transition-all shrink-0 select-none"
              title={`Tiếp tục: Chặng ${nextActiveStep.stepNumber} - ${nextActiveStep.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>Học tiếp: Chặng {nextActiveStep.stepNumber}</span>
            </Link>
          </div>
        }
      >
        <ProgressSuiteNavTabs is3D={true} />
      </AppTopHeader>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 space-y-4 pt-1">
        {/* 3. FULL WIDTH DUOLINGO WINDING PATHWAY */}
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
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
