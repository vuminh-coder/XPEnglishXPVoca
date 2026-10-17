"use client";

import React from "react";
import { Share2, Edit3 } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { ProfileSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  useProfileManager,
  ProfileHeroCard,
  ProfileMetricsBar,
  ProfileEditDrawer,
  ProfileSkillBreakdown,
  ProfileAchievementsSection,
  ProfileInventorySection,
  ProfileTitleProgression,
  ProfileQuickLinks,
} from "@/features/profile";

export default function ProfilePage() {
  const {
    user,
    fullName,
    setFullName,
    bio,
    setBio,
    selectedEmoji,
    setSelectedEmoji,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    equippedHat,
    toggleEquippedHat,
    skillMinutes,
    xpCurrent,
    xpTotal,
    xpPercent,
    userTitle,
    wordsCount,
    vocabPercent,
    handleSaveProfile,
    shareProfile,
    achievements,
    unlockedCount,
    filteredAchievements,
    availableEmojis,
  } = useProfileManager();

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* ─── 0. APP TOP HEADER INTEGRATION (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shareProfile}
              className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              title="Sao chép liên kết hồ sơ"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
              <span>Chia sẻ</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-200 stroke-[2.2]" />
              <span>{isEditing ? "Đóng cài đặt" : "Chỉnh sửa"}</span>
            </button>
          </div>
        }
        customMobileSearchReplacement={
          <button
            type="button"
            onClick={shareProfile}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full sm:rounded-xl bg-transparent sm:bg-slate-100/90 hover:bg-transparent sm:hover:bg-slate-200/90 dark:bg-transparent dark:sm:bg-slate-800/90 dark:sm:hover:bg-slate-700/90 text-slate-800 dark:text-slate-200 border-0 sm:border sm:border-slate-200/60 dark:border-0 dark:sm:border-slate-700/60 shadow-none sm:shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
            title="Chia sẻ hồ sơ"
            aria-label="Chia sẻ hồ sơ"
          >
            <Share2 className="w-5 h-5 sm:w-4.5 sm:h-4.5 stroke-[2.2] sm:stroke-[2]" />
          </button>
        }
      >
        <ProfileSuiteNavTabs />
      </AppTopHeader>

      {/* ─── MAIN CONTAINER (Fluid Ultra-Wide Canvas) ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-2.5 sm:space-y-4 pt-1">
        {/* 1. HERO SPOTLIGHT PROFILE STAGE CARD (rounded-2xl) */}
        <MotionItem>
          <ProfileHeroCard
            user={user}
            selectedEmoji={selectedEmoji}
            equippedHat={equippedHat}
            userTitle={userTitle}
            onShare={shareProfile}
            isEditing={isEditing}
            onToggleEdit={() => setIsEditing(!isEditing)}
          />
        </MotionItem>

        {/* 2. TOP 4 BENTO METRIC STAGE CARDS */}
        <MotionItem>
          <ProfileMetricsBar
            wordsCount={wordsCount}
            vocabPercent={vocabPercent}
            currentStreak={user.currentStreak || 1}
            longestStreak={user.longestStreak || user.currentStreak || 1}
            totalXp={user.totalXp || 0}
            level={user.level || 1}
            xpCurrent={xpCurrent}
            xpTotal={xpTotal}
            xpPercent={xpPercent}
            coins={user.coins ?? 100}
            streakFreezes={user.streakFreezes ?? 0}
          />
        </MotionItem>

        {/* 3. STREAMLINED ACCOUNT SETTINGS DRAWER (RULE 6, 18, 19 ALIGNED) */}
        <MotionItem>
          <ProfileEditDrawer
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            fullName={fullName}
            setFullName={setFullName}
            bio={bio}
            setBio={setBio}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
            availableEmojis={availableEmojis}
            onSubmit={handleSaveProfile}
            equippedHat={equippedHat}
            onToggleEquippedHat={toggleEquippedHat}
          />
        </MotionItem>

        {/* 4. BENTO GRID 8/12 & 4/12 MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-start">
          {/* ─── LEFT COLUMN (8/12 on Desktop, Full Width on Mobile): SKILLS + ACHIEVEMENTS ─── */}
          <div className="lg:col-span-8 space-y-2.5 sm:space-y-4">
            <MotionItem>
              <ProfileSkillBreakdown skillMinutes={skillMinutes} />
            </MotionItem>

            <MotionItem>
              <ProfileAchievementsSection
                unlockedCount={unlockedCount}
                totalCount={achievements.length}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filteredAchievements={filteredAchievements}
              />
            </MotionItem>

            {/* Inventory Section: Shown on Desktop, hidden on Mobile to eliminate bloat */}
            <div className="hidden lg:block">
              <MotionItem>
                <ProfileInventorySection
                  streakFreezes={user.streakFreezes ?? 0}
                  equippedHat={equippedHat}
                  onToggleEquippedHat={toggleEquippedHat}
                />
              </MotionItem>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (4/12): LEVEL PROGRESSION & QUICK LINKS (Desktop Only) ─── */}
          <div className="hidden lg:block lg:col-span-4 space-y-3.5 sm:space-y-4">
            <MotionItem>
              <ProfileTitleProgression
                level={user.level || 1}
                userTitle={userTitle}
              />
            </MotionItem>

            <MotionItem>
              <ProfileQuickLinks />
            </MotionItem>
          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}