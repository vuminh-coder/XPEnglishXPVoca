"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export const GroupCreatorPerkWidget: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-500" />
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
          Đặc Quyền Trưởng Nhóm
        </h4>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        Đạt cấp độ 15 để mở khóa quyền tạo Câu lạc bộ học thuật riêng, ghim bài viết hướng dẫn và cấp chứng chỉ hoàn thành học phần cho thành viên nhóm!
      </p>
    </div>
  );
};
