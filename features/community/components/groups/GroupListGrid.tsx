"use client";

import React from "react";
import { Users } from "lucide-react";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { StudyGroup } from "../../types";
import { GroupCardItem } from "./GroupCardItem";

interface GroupListGridProps {
  loading: boolean;
  groups: StudyGroup[];
  filter: string;
  onJoinToggle: (id: string) => void;
}

export const GroupListGrid: React.FC<GroupListGridProps> = ({
  loading,
  groups,
  filter,
  onJoinToggle,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3.5"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <ShimmerCircle size="w-10 h-10 rounded-xl" />
                <ShimmerBox className="w-24 h-5 rounded-lg" />
              </div>
              <ShimmerBox className="w-36 h-4 rounded-md" />
              <ShimmerBox className="w-full h-3 rounded-md" />
              <ShimmerBox className="w-4/5 h-3 rounded-md" />
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <ShimmerBox className="w-20 h-3 rounded" />
              <ShimmerBox className="w-24 h-7 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="p-8 text-center space-y-2">
        <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
          {filter === "joined" ? "Bạn chưa tham gia nhóm học nào" : "Chưa có nhóm nào trong mục này"}
        </div>
        <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">
          Hãy khám phá và tham gia các câu lạc bộ để học tập cùng đồng đội nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {groups.map((g) => (
        <GroupCardItem key={g.id} group={g} onJoinToggle={onJoinToggle} />
      ))}
    </div>
  );
};
