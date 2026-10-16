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
  href: string;
  icon: LucideIcon;
  gradient: string;
  shadow: string;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    title: "Luyện Nghe",
    href: "/study/dictation",
    icon: Headphones,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    title: "Luyện Nói",
    href: "/study/shadowing",
    icon: Mic,
    gradient: "from-[#0059bb] to-indigo-600",
    shadow: "shadow-blue-500/25",
  },
  {
    title: "Thi Thử Đề",
    href: "/study/exam-prep",
    icon: FileText,
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/25",
  },
  {
    title: "Đấu Trường",
    href: "/study/pvp",
    icon: Swords,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

export function DashboardQuickActionsGrid() {
  return (
    <div className="space-y-3 pt-2">
      {/* 1. Header with Section Badge and Link */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shrink-0">
            PHÍM TẮT
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
            Không Gian Luyện Tập
          </h3>
        </div>
        <Link
          href="/study"
          className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 group transition-colors cursor-pointer shrink-0"
        >
          <span>Khám phá toàn bộ</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 2. Bento Grid of 4 Quick Action Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="h-full"
            >
              <Link
                href={action.href}
                className="group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] dark:hover:border-blue-500 transition-all duration-200 shadow-xs hover:shadow-md h-full gap-2.5"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shrink-0 shadow-sm ${action.shadow} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                    {action.title}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
