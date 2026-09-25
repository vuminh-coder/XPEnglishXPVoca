"use client";

import React from "react";
import { Users, Target, Laptop, Briefcase, MessageCircle, Plus, CheckCircle2 } from "lucide-react";
import { StudyGroup } from "../../types";

const GROUP_ICONS: Record<string, React.ReactNode> = {
  g1: <Target className="w-5 h-5 text-[#0059bb]" />,
  g2: <Laptop className="w-5 h-5 text-indigo-500" />,
  g3: <Briefcase className="w-5 h-5 text-amber-500" />,
  g4: <MessageCircle className="w-5 h-5 text-emerald-500" />,
};

interface GroupCardItemProps {
  group: StudyGroup;
  onJoinToggle: (id: string) => void;
  onSelect?: (id: string) => void;
}

export const GroupCardItem: React.FC<GroupCardItemProps> = ({ group, onJoinToggle, onSelect }) => {
  const icon = GROUP_ICONS[group.id] || <Users className="w-5 h-5 text-indigo-500" />;

  return (
    <div
      onClick={() => onSelect?.(group.id)}
      className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-600 flex flex-col justify-between space-y-3.5 transition-all shadow-2xs cursor-pointer group"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] border border-indigo-200/60 dark:border-indigo-900/40 font-mono">
            {group.memberCount} Thành viên
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
            {group.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
            {group.description || "Nhóm học tập chuyên sâu cùng XP English."}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 font-mono flex items-center gap-1 group-hover:underline">
          <span>Biểu đồ & BXH</span>
          <span>➔</span>
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onJoinToggle(group.id);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 ${
            group.joined
              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300/60 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
              : "bg-[#0059bb] hover:bg-[#004ba0] text-white"
          }`}
        >
          {group.joined ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã tham gia</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Tham gia</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
