"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Headphones,
  Mic,
  Home,
  Flame,
  Coins,
  Sparkles,
  Layers,
  Swords,
  Compass,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  IpaHeroGreeting,
  IpaMatrixBoard,
  IpaDedicatedPracticeLab,
  IpaMinimalPairsArena,
  IpaSound,
} from "@/features/ipa";

type IpaMode = "matrix" | "practice_lab" | "minimal_pairs";

export default function IpaStudioPage() {
  const { user: authUser } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;

  const [activeMode, setActiveMode] = useState<IpaMode>("matrix");
  const [activePracticeSoundId, setActivePracticeSoundId] = useState<string | undefined>();

  const handleGoToPracticeLab = (sound: IpaSound) => {
    setActivePracticeSoundId(sound.id);
    setActiveMode("practice_lab");
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

            <button
              type="button"
              onClick={() => setActiveMode("practice_lab")}
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Thực Hành AI</span>
            </button>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/dashboard"
            icon={<Home className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Trang chủ"
          />
          <HeaderPillItem
            active
            layoutId="ipaHeaderActiveTab"
            icon={<Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Phát âm IPA"
          />
          <HeaderPillItem
            href="/study/listening"
            icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
            label="Dictation"
            hideOnSmall
          />
          <HeaderPillItem
            href="/study/shadowing"
            icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
            label="Shadowing"
            hideOnSmall
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-5 sm:space-y-6">
        {/* 1. HERO GREETING BANNER WITH 4 BENTO METRIC CARDS */}
        <IpaHeroGreeting
          user={user}
          masteredCount={18}
          totalCount={44}
          averageScore={88}
          pairsLearnedCount={7}
          streakDays={user?.currentStreak || 1}
          onNavigateTab={(tab) => setActiveMode(tab)}
        />

        {/* 2. DEDICATED 3-MODE TAB SWITCHER (APPLE-GRADE SPRING MOTION) */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-1">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/70 dark:border-white/5 overflow-x-auto hide-scrollbar">
            {/* Tab 1: Matrix Board */}
            <button
              type="button"
              onClick={() => setActiveMode("matrix")}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none ${
                activeMode === "matrix"
                  ? "text-[#0059bb] dark:text-sky-300"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {activeMode === "matrix" && (
                <motion.div
                  layoutId="ipaActiveModePillIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                />
              )}
              <Layers className="w-4 h-4 relative z-10 shrink-0" />
              <span className="relative z-10">Bảng 44 Âm Quốc Tế</span>
            </button>

            {/* Tab 2: Dedicated Practice Lab */}
            <button
              type="button"
              onClick={() => setActiveMode("practice_lab")}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none ${
                activeMode === "practice_lab"
                  ? "text-[#0059bb] dark:text-sky-300"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {activeMode === "practice_lab" && (
                <motion.div
                  layoutId="ipaActiveModePillIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                />
              )}
              <Sparkles className="w-4 h-4 relative z-10 shrink-0" />
              <span className="relative z-10">Phòng Thực Hành AI Riêng</span>
            </button>

            {/* Tab 3: Minimal Pairs Arena */}
            <button
              type="button"
              onClick={() => setActiveMode("minimal_pairs")}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none ${
                activeMode === "minimal_pairs"
                  ? "text-purple-600 dark:text-purple-300"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {activeMode === "minimal_pairs" && (
                <motion.div
                  layoutId="ipaActiveModePillIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                />
              )}
              <Swords className="w-4 h-4 relative z-10 shrink-0" />
              <span className="relative z-10">Đấu Trường Cặp Âm (12 Cặp)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Chuẩn Anh - Mỹ (GenAm)</span>
          </div>
        </div>

        {/* 3. MODE VIEW ORCHESTRATION WITH FAST MOTION TRANSITION */}
        <AnimatePresence mode="wait">
          {activeMode === "matrix" && (
            <motion.div
              key="mode-matrix"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
            >
              <IpaMatrixBoard onGoToPracticeLab={handleGoToPracticeLab} />
            </motion.div>
          )}

          {activeMode === "practice_lab" && (
            <motion.div
              key="mode-practice-lab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
            >
              <IpaDedicatedPracticeLab initialSoundId={activePracticeSoundId} />
            </motion.div>
          )}

          {activeMode === "minimal_pairs" && (
            <motion.div
              key="mode-minimal-pairs"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
            >
              <IpaMinimalPairsArena />
            </motion.div>
          )}
        </AnimatePresence>
      </PageEntranceWrapper>
    </div>
  );
}
