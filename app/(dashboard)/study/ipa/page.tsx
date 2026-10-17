"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  Coins,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { IpaSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { useIpaCatalogStore } from "@/stores/ipaCatalogStore";
import {
  IpaHeroGreeting,
  IpaMatrixBoard,
  IpaSound,
} from "@/features/ipa";

export default function IpaStudioPage() {
  const router = useRouter();
  const { user: authUser } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;

  const masteredCount = useIpaCatalogStore((s) => s.masteredSoundIds.length);
  const getAverageScore = useIpaCatalogStore((s) => s.getAverageScore);
  const practiceSoundScores = useIpaCatalogStore((s) => s.practiceSoundScores);
  const averageScore = getAverageScore();
  const practicedCount = Math.max(Object.keys(practiceSoundScores).length, 7);

  useStudyTimeTracker("speaking");

  const handleGoToPracticeLab = (sound: IpaSound) => {
    router.push(`/study/ipa/practice?sound=${sound.id}`);
  };

  const handleNavigateTab = (tab: "matrix" | "practice_lab" | "minimal_pairs") => {
    if (tab === "practice_lab") router.push("/study/ipa/practice");
    if (tab === "minimal_pairs") router.push("/study/ipa/minimal-pairs");
  };

  const searchQuery = useIpaCatalogStore((s) => s.matrixSearchQuery);
  const setSearchQuery = useIpaCatalogStore((s) => s.setMatrixSearchQuery);

  return (
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12"
      suppressHydrationWarning
    >
      {/* 0. UNIVERSAL 56PX (h-14) TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        searchProps={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: "Tìm âm (/i:/, /θ/) hoặc từ...",
          onClear: () => setSearchQuery(""),
          hideDesktopInput: true,
        }}
        showGamificationStats={true}
      >
        <IpaSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. HERO GREETING BANNER WITH 4 BENTO METRIC CARDS */}
        <IpaHeroGreeting
          user={user}
          masteredCount={masteredCount}
          totalCount={44}
          averageScore={averageScore}
          pairsLearnedCount={practicedCount}
          streakDays={user?.currentStreak || 1}
          onNavigateTab={handleNavigateTab}
        />

        {/* 2. MAIN 44-SOUND MATRIX BOARD */}
        <IpaMatrixBoard onGoToPracticeLab={handleGoToPracticeLab} />
      </PageEntranceWrapper>
    </div>
  );
}
