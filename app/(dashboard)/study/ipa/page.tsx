"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mic } from "lucide-react";
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
  resolveIpaSound,
} from "@/features/ipa";

function IpaStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const soundParam = searchParams?.get("sound");

  const { user: authUser } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;

  const masteredCount = useIpaCatalogStore((s) => s.masteredSoundIds.length);
  const getAverageScore = useIpaCatalogStore((s) => s.getAverageScore);
  const practiceSoundScores = useIpaCatalogStore((s) => s.practiceSoundScores);
  const matrixSearchQuery = useIpaCatalogStore((s) => s.matrixSearchQuery);
  const setMatrixSearchQuery = useIpaCatalogStore((s) => s.setMatrixSearchQuery);
  const selectedSound = useIpaCatalogStore((s) => s.matrixSelectedSound);
  const setSelectedSound = useIpaCatalogStore((s) => s.setMatrixSelectedSound);
  const averageScore = getAverageScore();
  const practicedCount = Math.max(Object.keys(practiceSoundScores).length, 7);

  useStudyTimeTracker("speaking");

  // Keep store's selectedSound in sync with URL searchParams (including direct link & browser back/forward)
  useEffect(() => {
    if (soundParam) {
      const resolved = resolveIpaSound(soundParam);
      if (resolved) {
        setSelectedSound(resolved);
      }
    } else {
      setSelectedSound(null);
    }
  }, [soundParam, setSelectedSound]);

  const handleSelectSound = (sound: IpaSound | null) => {
    if (sound) {
      router.push(`/study/ipa?sound=${sound.id}`, { scroll: false });
    } else {
      router.push(`/study/ipa`, { scroll: false });
    }
  };

  const handleGoToPracticeLab = (sound: IpaSound) => {
    router.push(`/study/ipa/practice?sound=${sound.id}`);
  };

  const handleNavigateTab = (tab: "matrix" | "practice_lab" | "minimal_pairs") => {
    if (tab === "practice_lab") router.push("/study/ipa/practice");
    if (tab === "minimal_pairs") router.push("/study/ipa/minimal-pairs");
  };

  return (
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12"
      suppressHydrationWarning
    >
      {/* 0. UNIVERSAL 56PX (h-14) TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        searchProps={{
          value: matrixSearchQuery,
          onChange: setMatrixSearchQuery,
          placeholder: "Tìm âm IPA hoặc từ ví dụ...",
          hideDesktopInput: true,
        }}
        rightDesktopContent={
          <Link
            href="/study/ipa/practice"
            className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba3] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="Vào phòng thực hành phát âm với AI"
          >
            <Mic className="w-4 h-4" />
            <span>Phòng Luyện AI</span>
          </Link>
        }
      >
        <IpaSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-6 pb-24 sm:pb-8 space-y-3.5 sm:space-y-6">
        {/* 1. HERO GREETING BANNER WITH 4 BENTO METRIC CARDS (Hidden when in sound detail mode) */}
        {!selectedSound && (
          <IpaHeroGreeting
            user={user}
            masteredCount={masteredCount}
            totalCount={44}
            averageScore={averageScore}
            pairsLearnedCount={practicedCount}
            streakDays={user?.currentStreak || 1}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {/* 2. MAIN 44-SOUND MATRIX BOARD (OR IN-PAGE DETAIL VIEW) */}
        <IpaMatrixBoard
          onSelectSound={handleSelectSound}
          onGoToPracticeLab={handleGoToPracticeLab}
        />
      </PageEntranceWrapper>
    </div>
  );
}

export default function IpaStudioPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950" />}>
      <IpaStudioContent />
    </Suspense>
  );
}
