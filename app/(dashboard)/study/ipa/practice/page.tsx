"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { IpaSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  IpaDedicatedPracticeLab,
  resolveIpaSound,
} from "@/features/ipa";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";

function PracticeLabContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const soundParam = searchParams?.get("sound") || undefined;
  const resolvedSound = resolveIpaSound(soundParam);
  const initialSoundId = resolvedSound?.id || undefined;

  const { user: authUser } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;

  // Track speaking practice time
  useStudyTimeTracker("speaking");

  const handleNavigateTab = (tab: "matrix" | "practice_lab" | "minimal_pairs") => {
    if (tab === "matrix") router.push("/study/ipa");
    if (tab === "minimal_pairs") router.push("/study/ipa/minimal-pairs");
  };

  return (
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12"
      suppressHydrationWarning
    >
      {/* 0. UNIVERSAL TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/ipa"
            className="h-9 px-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Quay lại danh mục 44 âm IPA"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span>Quay lại Bảng âm</span>
          </Link>
        }
      >
        <IpaSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-5 pb-24 sm:pb-8">
        {/* DEDICATED FOCUSED PRACTICE LAB STUDIO */}
        <IpaDedicatedPracticeLab initialSoundId={initialSoundId} />
      </PageEntranceWrapper>
    </div>
  );
}

export default function IpaPracticePage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950" />}>
      <PracticeLabContent />
    </Suspense>
  );
}
