"use client";

import React from "react";
import { Crown, Check, Lock, GraduationCap, Rocket } from "lucide-react";
import { Badge } from "@/shared/components/ui";

interface ProfileTitleProgressionProps {
  level: number;
  userTitle: string;
}

export const ProfileTitleProgression: React.FC<ProfileTitleProgressionProps> = ({
  level,
  userTitle,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
            <Crown className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Cấp Độ & Danh Hiệu
          </h2>
        </div>
        <Badge variant="primary" className="font-bold text-[10px] rounded-lg font-mono">
          LV.{level}
        </Badge>
      </div>

      <div className="space-y-2 text-xs font-medium">
        {/* Current Title Item */}
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 dark:bg-blue-500/25 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-display">{userTitle}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Danh hiệu hiện tại</div>
            </div>
          </div>
          <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
        </div>

        {/* Locked Next Title Item */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between opacity-75">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
              <Rocket className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-display">Master Scholar</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Yêu cầu Cấp độ 20</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 font-display">
            <Lock className="w-3 h-3" />
            <span>Khóa</span>
          </span>
        </div>
      </div>
    </div>
  );
};
