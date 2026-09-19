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
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="h-9 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all cursor-pointer"
              title="Cửa hàng vật phẩm & Số Vàng"
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span>
                {user?.coins ?? 0}{" "}
                <span className="font-medium text-[11px] text-amber-600/80 dark:text-amber-400/80">
                  Vàng
                </span>
              </span>
            </Link>

            <Link
              href="/analytics"
              className="h-9 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200/80 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all cursor-pointer"
              title="Xem chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>
                {user?.currentStreak || 1}{" "}
                <span className="font-medium text-[11px] text-orange-500/80">
                  Ngày
                </span>
              </span>
            </Link>
          </div>
        }
      >
        <IpaSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. HERO GREETING BANNER WITH 4 BENTO METRIC CARDS */}
        <IpaHeroGreeting
          user={user}
          masteredCount={18}
          totalCount={44}
          averageScore={88}
          pairsLearnedCount={7}
          streakDays={user?.currentStreak || 1}
          onNavigateTab={handleNavigateTab}
        />

        {/* 2. MAIN 44-SOUND MATRIX BOARD */}
        <IpaMatrixBoard onGoToPracticeLab={handleGoToPracticeLab} />
      </PageEntranceWrapper>
    </div>
  );
}
