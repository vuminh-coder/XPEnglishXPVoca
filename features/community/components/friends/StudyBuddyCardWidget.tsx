"use client";

import React from "react";
import { Share2 } from "lucide-react";

export const StudyBuddyCardWidget: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
          Học Cùng Bạn Bè Nhận Thưởng
        </h4>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        Mời bạn bè cùng luyện tập để mở khóa phòng thi đấu PvP và nhận chuỗi phần thưởng Streak đôi!
      </p>
    </div>
  );
};
