"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Bot, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import { useUiStore } from "@/stores/uiStore";
import { useUserStore } from "@/stores/userStore";

export default function BottomNav() {
  const pathname = usePathname();
  const { sidebarCollapsed, hideBottomNav } = useUiStore();
  const user = useUserStore((s) => s.user);

  // Hide BottomNav on active exam screen or when studio pages explicitly request it
  const isExamActivePage =
    pathname?.match(/\/study\/exams\/[a-zA-Z0-9_-]+$/) ||
    (pathname === "/study/exam-prep" && sidebarCollapsed);

  if (isExamActivePage || hideBottomNav) return null;

  const tabs = [
    {
      name: "Trang chủ",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Từ vựng",
      path: "/vocabulary",
      icon: BookOpen,
    },
    {
      name: "Luyện tập",
      path: "/study/practice",
      icon: PenLine,
    },
    {
      name: "AI Tutor",
      path: "/ai/tutor",
      icon: Bot,
    },
    {
      name: "Cộng đồng",
      path: "/community",
      icon: Users,
    },
    {
      name: "Cá nhân",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] pb-[env(safe-area-inset-bottom)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800 z-[var(--z-navbar)] flex items-center justify-around px-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/dashboard" && pathname?.startsWith(tab.path));
        const Icon = tab.icon;

        return (
          <Link
            key={tab.path}
            href={tab.path}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-col items-center justify-center flex-1 h-12 max-w-[66px] rounded-xl transition-all duration-200 select-none group"
          >
            {/* Active Dashboard-style Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId="mobileBottomNavActivePill"
                className="absolute inset-x-0.5 inset-y-0.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/70 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
              <Icon
                className={`w-[19px] h-[19px] transition-transform duration-200 ${
                  isActive
                    ? "text-[#0059bb] dark:text-sky-400 stroke-[2.3] scale-105"
                    : "text-slate-400 dark:text-slate-500 stroke-[1.8] group-hover:text-slate-600 dark:group-hover:text-slate-300"
                }`}
              />
              <span
                className={`text-[9.5px] leading-tight tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-[#0059bb] dark:text-sky-400 font-black"
                    : "text-slate-500 dark:text-slate-400 font-bold group-hover:text-slate-700 dark:group-hover:text-slate-200"
                }`}
              >
                {tab.name}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
