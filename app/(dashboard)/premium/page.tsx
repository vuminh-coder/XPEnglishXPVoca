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
  PremiumComparisonMatrix,
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

      {/* ─── 2. MAIN ENTRANCE WRAPPER (Fluid Max 1600px Canvas) ─── */}
      <PageEntranceWrapper className="space-y-8 sm:space-y-10 w-full max-w-[1400px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* 1. Sleek Editorial Hero Stage */}
        <MotionItem>
          <PremiumHeroStage />
        </MotionItem>

        {/* 2. Self-Contained 3-Card Pricing Deck (Direct Checkout CTAs) */}
        <MotionItem>
          <PremiumPlanDeck
            selectedPlanKey={selectedPlanKey}
            onSelectPlan={setSelectedPlanKey}
          />
        </MotionItem>

        {/* 3. Transparent Free vs PRO VIP Comparison Matrix & Score Simulator */}
        <MotionItem>
          <PremiumComparisonMatrix
            targetExam={targetExam}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            estimatedProScore={estimatedProScore}
            onSelectExam={handleSelectExam}
          />
        </MotionItem>

        {/* 4. Real Student Success Stories & Scorecards */}
        <MotionItem>
          <PremiumSuccessStories />
        </MotionItem>

        {/* 5. 100% 7-Day Money-Back Guarantee & Accordion FAQs */}
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
