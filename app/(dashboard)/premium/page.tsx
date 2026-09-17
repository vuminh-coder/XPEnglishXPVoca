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
  PremiumPlanPerksSpotlight,
  PremiumBentoShowcase,
  PremiumSuccessStories,
  PremiumFaqSection,
} from "@/features/premium";

export default function PremiumPage() {
  const {
    selectedPlanKey,
    setSelectedPlanKey,
    selectedPlan,
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

      {/* ─── 2. MAIN ENTRANCE WRAPPER (Fluid Max 1760px Canvas matching Dashboard) ─── */}
      <PageEntranceWrapper className="space-y-6 sm:space-y-7 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Hero Spotlight Stage */}
        <MotionItem>
          <PremiumHeroStage />
        </MotionItem>

        {/* Interactive Plan Deck & Spotlight Power Perks Card */}
        <MotionItem>
          <div className="space-y-5">
            <PremiumPlanDeck
              selectedPlanKey={selectedPlanKey}
              onSelectPlan={setSelectedPlanKey}
            />
            <PremiumPlanPerksSpotlight
              selectedPlan={selectedPlan}
              selectedPlanKey={selectedPlanKey}
            />
          </div>
        </MotionItem>

        {/* 5 Interactive Bento Feature Showcases */}
        <MotionItem>
          <PremiumBentoShowcase
            targetExam={targetExam}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            estimatedProScore={estimatedProScore}
            onSelectExam={handleSelectExam}
          />
        </MotionItem>

        {/* Real Student Success Stories & Scorecards */}
        <MotionItem>
          <PremiumSuccessStories />
        </MotionItem>

        {/* Guarantee Shield & Accordion FAQs */}
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
