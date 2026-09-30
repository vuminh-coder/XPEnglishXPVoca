"use client";

import React from "react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { ShopSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  PageEntranceWrapper,
  MotionItem,
} from "@/shared/components/feedback/PageEntranceAnimation";
import {
  usePremiumPlan,
  PremiumHeroStage,
  PremiumPlanDeck,
  PremiumBentoShowcase,
  PremiumSuccessStories,
  PremiumFaqSection,
} from "@/features/premium";

export default function PremiumPage() {
  const {
    selectedPlanKey,
    setSelectedPlanKey,
    targetExam,
    currentScore,
    setCurrentScore,
    estimatedProScore,
    handleSelectExam,
    openFaqIdx,
    toggleFaq,
  } = usePremiumPlan();

  return (
    <div
      className="min-h-screen bg-slate-50/60 dark:bg-slate-950 space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200"
      suppressHydrationWarning
    >
      {/* ─── 1. TOP HEADER (56px Baseline with Standard Gamification Stats) ─── */}
      <AppTopHeader showGamificationStats={true}>
        <ShopSuiteNavTabs />
      </AppTopHeader>

      {/* ─── 2. MAIN ENTRANCE WRAPPER (Fluid Canvas matching Dashboard) ─── */}
      <PageEntranceWrapper className="space-y-6 sm:space-y-8 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Stage (Light, Clean & Concise) */}
        <MotionItem>
          <PremiumHeroStage />
        </MotionItem>

        {/* Self-Contained 3-Plan Pricing Deck */}
        <MotionItem>
          <PremiumPlanDeck
            selectedPlanKey={selectedPlanKey}
            onSelectPlan={setSelectedPlanKey}
          />
        </MotionItem>

        {/* 4 Core Technology Pillars (No Purple, No Dark Blocks, Concise) */}
        <MotionItem>
          <PremiumBentoShowcase
            targetExam={targetExam}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            estimatedProScore={estimatedProScore}
            onSelectExam={handleSelectExam}
          />
        </MotionItem>

        {/* Student Success Stories (Concise Reviews) */}
        <MotionItem>
          <PremiumSuccessStories />
        </MotionItem>

        {/* 100% 7-day Money Back Guarantee & FAQs */}
        <MotionItem>
          <PremiumFaqSection
            openFaqIdx={openFaqIdx}
            onToggleFaq={toggleFaq}
          />
        </MotionItem>
      </PageEntranceWrapper>
    </div>
  );
}
