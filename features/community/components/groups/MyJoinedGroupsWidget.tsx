"use client";

import React from "react";
import { Users } from "lucide-react";
import { StudyGroup } from "../../types";

interface MyJoinedGroupsWidgetProps {
  joinedGroups: StudyGroup[];
}

export const MyJoinedGroupsWidget: React.FC<MyJoinedGroupsWidgetProps> = ({ joinedGroups }) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
          Nhóm Đã Tham Gia ({joinedGroups.length})
        </h3>
      </div>

      {joinedGroups.length === 0 ? (
        <p className="text-xs text-slate-400 py-2 font-medium text-center">
          Bạn chưa tham gia nhóm nào. Hãy bấm "Tham gia" ở danh sách bên trái!
        </p>
      ) : (
        <div className="space-y-2">
          {joinedGroups.map((g) => (
            <div
              key={g.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                {g.name}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md font-mono shrink-0">
                {g.memberCount} tv
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
