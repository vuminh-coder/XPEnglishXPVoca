"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Headphones,
  Mic,
  FileText,
  Swords,
  type LucideIcon,
} from "lucide-react";

interface QuickActionItem {
  title: string;
  mobileTitle?: string;
  badge: string;
  mobileBadge: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  shadow: string;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    title: "Luyện Nghe",
    badge: "Audio Studio & Sóng âm",
    mobileBadge: "Audio & Sóng âm",
    href: "/study/dictation",
    icon: Headphones,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    title: "Luyện Nói",
    badge: "AI Chấm điểm 6 tiêu chí",
    mobileBadge: "Chấm điểm AI",
    href: "/study/shadowing",
    icon: Mic,
    gradient: "from-[#0059bb] to-indigo-600",
    shadow: "shadow-blue-500/25",
  },
  {
    title: "Thi Thử Đề Chuẩn",
    mobileTitle: "Thi Thử Chuẩn",
    badge: "37 Đề TOEIC & IELTS",
    mobileBadge: "37 Đề TOEIC, IELTS",
    href: "/study/exam-prep",
    icon: FileText,
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/25",
  },
  {
    title: "Đấu Trường 1v1",
    badge: "Thách đấu Realtime",
    mobileBadge: "Thách đấu PvP",
    href: "/study/pvp",
    icon: Swords,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

interface DashboardQuickActionsGridProps {
  /**
   * "full"   — full-width row, 4 tiles on desktop (default, used on Mobile/Tablet below the bento grid).
   * "inline" — compact 2×2 grid designed to sit inside the 7/12 desktop column.
   */
  variant?: "full" | "inline";
}

export function DashboardQuickActionsGrid({ variant = "full" }: DashboardQuickActionsGridProps) {
  const isInline = variant === "inline";

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 flex flex-col justify-between gap-3.5 h-full">
      {/* 1. Header with Section Badge and Link */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono font-bold text-[10px] sm:text-[11px] border border-blue-200/70 dark:border-blue-800/50 shrink-0">
            PHÍM TẮT
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
            <span className="sm:hidden">Không Gian Luyện Tập</span>
            <span className="hidden sm:inline">
              {isInline ? "Truy Cập Nhanh Phòng Học" : "Truy Cập Nhanh Không Gian Học Tập"}
            </span>
          </h3>
        </div>
        <Link
          href="/study"
          className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5 group transition-colors cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">
            {isInline ? "Tất cả phòng học" : "Khám phá toàn bộ"}
          </span>
          <span className="sm:hidden font-semibold">Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 2. Bento Grid of 4 Quick Action Cards (Concentric rounded-xl inside rounded-2xl per Rule 10) */}
      <div
        className={`grid grid-cols-2 gap-2.5 sm:gap-3 flex-1 ${
          isInline ? "" : "lg:grid-cols-4"
        }`}
      >
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="h-full"
            >
              <Link
                href={action.href}
                className="group flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-[#0059bb] dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-slate-900 transition-all duration-200 shadow-2xs hover:shadow-xs relative overflow-hidden h-full"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div
                    className={`w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-lg bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shrink-0 shadow-xs ${action.shadow} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11.5px] sm:text-[13px] font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors leading-tight">
                      <span className="sm:hidden">{action.mobileTitle || action.title}</span>
                      <span className="hidden sm:inline">{action.title}</span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-tight">
                      <span className="sm:hidden">{action.mobileBadge}</span>
                      <span className="hidden sm:inline">{action.badge}</span>
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
