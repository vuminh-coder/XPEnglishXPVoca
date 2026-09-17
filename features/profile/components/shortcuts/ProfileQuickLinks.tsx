"use client";

import React from "react";
import Link from "next/link";
import { BarChart3, Swords, ShoppingBag, Trophy, ChevronRight } from "lucide-react";

export const ProfileQuickLinks: React.FC = () => {
  const links = [
    {
      href: "/analytics",
      label: "Trang Thống Kê Chi Tiết",
      icon: <BarChart3 className="w-4 h-4 stroke-[2.2] text-[#0059bb] dark:text-sky-400 group-hover:scale-110 transition-transform" />,
    },
    {
      href: "/study/pvp",
      label: "Đấu Trường 1v1 PvP",
      icon: <Swords className="w-4 h-4 stroke-[2.2] text-amber-500 group-hover:scale-110 transition-transform" />,
    },
    {
      href: "/shop",
      label: "Cửa Hàng Vật Phẩm Shop",
      icon: <ShoppingBag className="w-4 h-4 stroke-[2.2] text-purple-500 group-hover:scale-110 transition-transform" />,
    },
    {
      href: "/community/leaderboard",
      label: "Bảng Xếp Hạng Đấu Trường",
      icon: <Trophy className="w-4 h-4 stroke-[2.2] text-emerald-500 group-hover:scale-110 transition-transform" />,
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
      <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-2.5">
        Lối Tắt Ứng Dụng
      </h2>

      <div className="space-y-1.5 text-xs font-bold font-display">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
};
