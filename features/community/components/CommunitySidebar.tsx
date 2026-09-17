"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Users, Flame, Sparkles, ArrowRight } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { useSidebarData } from "../hooks/useSidebarData";

interface CommunitySidebarProps {
  user?: any;
}

export function CommunitySidebar({ user }: CommunitySidebarProps = {}) {
  const { topLearners, studyGroups, loading } = useSidebarData(user);

  const getRankBadgeClass = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-amber-400 text-amber-950 font-black";
      case 2:
        return "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold";
      case 3:
        return "bg-amber-800/20 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold";
    }
  };

  return (
    <aside className="space-y-4">
      {/* Widget 1: Top Learners Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
              Top Học Viên Tuần
            </h3>
          </div>
          <Link
            href="/community?tab=leaderboard"
            className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline"
          >
            Tất cả
          </Link>
        </div>

        {loading ? (
          /* EXACT TOP 3 SHIMMER SKELETON (ZERO CLS MATCHING loading.tsx) */
          <div className="space-y-2">
            {[1, 2, 3].map((r) => (
              <div
                key={r}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ShimmerCircle size="w-6 h-6" />
                  <ShimmerBox className="h-3.5 w-24 rounded-md" />
                </div>
                <ShimmerBox className="h-3.5 w-14 rounded-md bg-amber-500/20" />
              </div>
            ))}
          </div>
        ) : topLearners.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-2 font-medium">
            Chưa có bảng xếp hạng tuần này.
          </p>
        ) : (
          <div className="space-y-2.5">
            {topLearners.map((learner) => {
              const cleanName = formatCleanName(learner.fullName || learner.username);
              return (
                <div
                  key={learner.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0 font-mono shadow-2xs ${getRankBadgeClass(
                        learner.rank || 1
                      )}`}
                    >
                      {learner.rank}
                    </span>
                    <UserAvatar
                      avatarUrl={learner.avatarUrl}
                      emoji={learner.avatarEmoji}
                      name={cleanName}
                      size="w-6 h-6"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[95px] sm:max-w-[110px] font-display">
                      {cleanName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5 font-mono">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      {learner.streak || 1}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {learner.xp?.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Widget 2: Study Groups Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
              Nhóm Học Sôi Nổi
            </h3>
          </div>
          <Link
            href="/community?tab=groups"
            className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline"
          >
            Khám phá
          </Link>
        </div>

        {loading ? (
          /* EXACT ACTIVE GROUPS SHIMMER SKELETON (ZERO CLS MATCHING loading.tsx) */
          <div className="space-y-2">
            {[1, 2].map((g) => (
              <div
                key={g}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
              >
                <ShimmerBox className="h-3.5 w-36 rounded-md" />
                <ShimmerBox className="h-3 w-48 rounded-md" />
              </div>
            ))}
          </div>
        ) : studyGroups.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-2 font-medium">
            Chưa có nhóm học nào.
          </p>
        ) : (
          <div className="space-y-2">
            {studyGroups.map((group) => (
              <Link
                key={group.id}
                href="/community?tab=groups"
                className="block p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl space-y-1 transition-all border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700/80 shadow-2xs group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 font-display group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                    {group.name}
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md font-mono shrink-0">
                    {group.tag || "Cộng đồng"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium block">
                  {group.memberCount} thành viên
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Widget 3: Daily Study Tip Card (MATCHING loading.tsx 1:1 ZERO CLS) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
            Mẹo Học Tập Hôm Nay
          </h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          Ôn tập ngắt quãng (Spaced Repetition) kết hợp Shadowing 15 phút mỗi ngày giúp tăng phản xạ và ghi nhớ từ vựng sâu hơn 300%!
        </p>
        <Link
          href="/study/practice"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline pt-0.5"
        >
          <span>Luyện tập ngay</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
