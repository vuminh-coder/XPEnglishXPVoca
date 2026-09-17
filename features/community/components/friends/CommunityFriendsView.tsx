"use client";

import React from "react";
import { UserCheck, Sparkles } from "lucide-react";
import { CommunityHeroBanner } from "../shared/CommunityHeroBanner";
import { FriendSearchBar } from "./FriendSearchBar";
import { FriendsSubTabNav } from "./FriendsSubTabNav";
import { ActiveFriendsList } from "./ActiveFriendsList";
import { PendingRequestsList } from "./PendingRequestsList";
import { FriendSuggestionsList } from "./FriendSuggestionsList";
import { StudyBuddyCardWidget } from "./StudyBuddyCardWidget";
import { useFriendsData } from "../../hooks/useFriendsData";

interface CommunityFriendsViewProps {
  user: any;
  awardXp?: (amt: number) => void;
}

export function CommunityFriendsView({ user, awardXp }: CommunityFriendsViewProps) {
  const {
    friendName,
    setFriendName,
    friends,
    suggestions,
    pendingRequests,
    loading,
    activeSubTab,
    setActiveSubTab,
    handleAddFriend,
    handleSearchAndAddFriend,
    handleProcessRequest,
    handleRemoveFriend,
  } = useFriendsData(user, awardXp);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <CommunityHeroBanner
        gradientClass="from-[#0059bb] via-[#004fba] to-[#0284c7]"
        badgeLeft={
          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-sky-200" /> Kết Nối Học Tập XP
          </span>
        }
        badgeRight={
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 shrink-0">
            Thưởng +10 XP / Lời mời kết bạn
          </span>
        }
        title={
          <>
            <span>Bạn Đồng Hành Học Tập</span>
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          </>
        }
        description="Tìm kiếm và kết nối với những người bạn cùng mục tiêu thi TOEIC, IELTS để cùng nhau thi đấu và duy trì thói quen học mỗi ngày!"
      />

      {/* 2. BENTO GRID: FRIENDS 8/12 + SIDEBAR 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <FriendSearchBar
            friendName={friendName}
            onFriendNameChange={setFriendName}
            onSearchAndAdd={handleSearchAndAddFriend}
          />

          <FriendsSubTabNav
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            friendsCount={friends.length}
            requestsCount={pendingRequests.length}
            suggestionsCount={suggestions.length}
          />

          {/* TAB 1: FRIENDS LIST */}
          {activeSubTab === "friends" && (
            <ActiveFriendsList
              loading={loading}
              friends={friends}
              onRemoveFriend={handleRemoveFriend}
            />
          )}

          {/* TAB 2: PENDING REQUESTS */}
          {activeSubTab === "requests" && (
            <PendingRequestsList
              requests={pendingRequests}
              onProcessRequest={handleProcessRequest}
            />
          )}

          {/* TAB 3: SUGGESTIONS (MOBILE ONLY) */}
          {activeSubTab === "suggestions" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5 sm:hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-display">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Gợi Ý Bạn Học ({suggestions.length}):
                </h3>
              </div>
              <FriendSuggestionsList
                loading={loading}
                suggestions={suggestions}
                onAddFriend={handleAddFriend}
              />
            </div>
          )}
        </div>

        {/* Right Column (lg:col-span-4): Suggestions & Referral */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          {/* Widget 1: Suggestions Desktop */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Gợi Ý Bạn Học
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                +10 XP / Lời mời
              </span>
            </div>

            <FriendSuggestionsList
              loading={loading}
              suggestions={suggestions}
              onAddFriend={handleAddFriend}
              isSidebar={true}
            />
          </div>

          {/* Widget 2: Study Buddy Card */}
          <StudyBuddyCardWidget />
        </div>
      </div>
    </div>
  );
}
