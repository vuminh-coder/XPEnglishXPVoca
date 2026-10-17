"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Bot, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import { useUiStore } from "@/stores/uiStore";
import { useUserStore } from "@/stores/userStore";
import { prefetchRouteData } from "@/shared/utils/prefetchEngine";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";

export default function BottomNav() {
  const pathname = usePathname();
  const { sidebarCollapsed, hideBottomNav } = useUiStore();
  const user = useUserStore((s) => s.user);

  // Hide BottomNav on active exam screen or when studio pages explicitly request it
  const isExamActivePage =
    pathname?.match(/\/study\/exams\/[a-zA-Z0-9_-]+$/) ||
    (pathname === "/study/exam-prep" && sidebarCollapsed);

  if (isExamActivePage || hideBottomNav) return null;

  const userName = user?.fullName || user?.username || "Học viên XP Voca";

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
      badge: 1,
    },
    {
      name: "Cá nhân",
      path: "/profile",
      icon: User,
      isProfile: true,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-[50px] pb-[env(safe-area-inset-bottom,0px)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 z-[var(--z-navbar)] flex items-center justify-around px-1 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_16px_rgba(0,0,0,0.4)] select-none"
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
            aria-label={tab.name}
            title={tab.name}
            onMouseEnter={() => prefetchRouteData(tab.path)}
            onTouchStart={() => prefetchRouteData(tab.path)}
            className="relative flex items-center justify-center flex-1 h-full cursor-pointer transition-transform duration-150 active:scale-90 group"
          >
            {/* Facebook-style Top Active Indicator Bar (No clumsy pill box!) */}
            {isActive && (
              <motion.div
                layoutId="fbBottomNavActiveBar"
                className="absolute top-0 inset-x-2.5 sm:inset-x-3.5 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-b-full shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}

            <div className="relative flex items-center justify-center">
              {tab.isProfile ? (
                /* Profile Tab: Facebook-style Avatar with distinct circular outer ring */
                <div
                  className={`rounded-full p-[1.5px] transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "border-2 border-[#0059bb] dark:border-sky-400 shadow-2xs"
                      : "border-2 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500"
                  }`}
                >
                  <UserAvatar
                    avatarUrl={user?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                    imageUrl={user?.imageUrl}
                    avatar={(user as any)?.avatar}
                    emoji={user?.avatarEmoji}
                    name={userName}
                    size="w-[22px] h-[22px]"
                  />
                </div>
              ) : (
                /* Icon Tabs: Pure, High-Contrast Facebook Style (No text labels) */
                <Icon
                  className={`w-[22px] h-[22px] transition-all duration-200 ${
                    isActive
                      ? "text-[#0059bb] dark:text-sky-400 stroke-[2.3] scale-105"
                      : "text-slate-500 dark:text-slate-400 stroke-[1.8] group-hover:text-slate-800 dark:group-hover:text-slate-200"
                  }`}
                />
              )}

              {/* Facebook-style Red Notification Accent Badge */}
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-[#f43f5e] text-white text-[9px] font-bold font-mono flex items-center justify-center border border-white dark:border-slate-900 shadow-2xs pointer-events-none">
                  {tab.badge}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
