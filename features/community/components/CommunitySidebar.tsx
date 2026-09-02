"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Users, Flame, Sparkles, ArrowRight } from "lucide-react";

export function CommunitySidebar() {
  const TOP_LEARNERS = [
    { name: "Hoàng Anh", xp: "4,850 XP", streak: 42, avatarEmoji: "🦊", rank: 1 },
    { name: "Minh Đức", xp: "3,920 XP", streak: 35, avatarEmoji: "🦁", rank: 2 },
    { name: "Thanh Trúc", xp: "3,410 XP", streak: 28, avatarEmoji: "🦉", rank: 3 },
  ];

  const STUDY_GROUPS = [
    { name: "IELTS 7.5+ Target Group", members: "1.2k thành viên", tag: "IELTS" },
    { name: "TOEIC 900+ Listening Sprint", members: "850 thành viên", tag: "TOEIC" },
    { name: "Giao Tiếp & Phát Âm Chuẩn IPA", members: "2.4k thành viên", tag: "Speaking" },
  ];

  return (
    <aside className="space-y-5">
      {/* Top Learners Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
              Top Học Viên Tuần
            </h3>
          </div>
          <Link href="/leaderboard" className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline">
            Tất cả
          </Link>
        </div>

        <div className="space-y-3">
          {TOP_LEARNERS.map((learner) => (
            <div key={learner.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {learner.rank}
                </span>
                <span className="text-sm">{learner.avatarEmoji}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{learner.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5 font-mono">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {learner.streak}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {learner.xp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Groups Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
              Nhóm Học Sôi Nổi
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {STUDY_GROUPS.map((group) => (
            <div key={group.name} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{group.name}</span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                  {group.tag}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium block">{group.members}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
