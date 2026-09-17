"use client";

import React from "react";
import { Users, Sparkles } from "lucide-react";
import { CommunityHeroBanner } from "../shared/CommunityHeroBanner";
import { GroupFilterNav } from "./GroupFilterNav";
import { GroupListGrid } from "./GroupListGrid";
import { MyJoinedGroupsWidget } from "./MyJoinedGroupsWidget";
import { GroupCreatorPerkWidget } from "./GroupCreatorPerkWidget";
import { useGroupsData } from "../../hooks/useGroupsData";

interface CommunityGroupsViewProps {
  user: any;
  awardXp?: (amt: number) => void;
}

export function CommunityGroupsView({ user, awardXp }: CommunityGroupsViewProps) {
  const {
    loading,
    filter,
    setFilter,
    handleJoinGroup,
    handleCreateGroup,
    filteredGroups,
    myJoinedGroups,
  } = useGroupsData(user, awardXp);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <CommunityHeroBanner
        gradientClass="from-[#0059bb] via-[#004fba] to-[#312e81]"
        badgeLeft={
          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-indigo-300" /> Nhóm Học Tập XP
          </span>
        }
        badgeRight={
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 shrink-0">
            Cấp 15+ Để Tạo Nhóm Mới
          </span>
        }
        title={
          <>
            <span>Câu Lạc Bộ & Nhóm Học Thuật</span>
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          </>
        }
        description="Tham gia các nhóm theo mục tiêu thi TOEIC, IELTS hoặc từ vựng chuyên ngành để cùng nhau thảo luận bài tập và nhận thưởng XP!"
      />

      {/* 2. BENTO GRID: GROUPS 8/12 + SIDEBAR 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <GroupFilterNav
              filter={filter}
              onFilterChange={setFilter}
              onCreateGroup={handleCreateGroup}
            />

            <GroupListGrid
              loading={loading}
              groups={filteredGroups}
              filter={filter}
              onJoinToggle={handleJoinGroup}
            />
          </div>
        </div>

        {/* Right Column (lg:col-span-4): My Groups & Requirements */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          <MyJoinedGroupsWidget joinedGroups={myJoinedGroups} />
          <GroupCreatorPerkWidget />
        </div>
      </div>
    </div>
  );
}
