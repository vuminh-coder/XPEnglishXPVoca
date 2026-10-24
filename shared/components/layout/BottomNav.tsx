"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Headphones, Bot, Users, User } from "lucide-react";
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
    (pathname === "/study/exam-prep" && sidebarCollapsed) ||
    pathname?.includes("/comprehension");

  const isStudioPracticeRoute = Boolean(
    pathname?.startsWith("/study/dictation") ||
    pathname?.startsWith("/study/listening") ||
    pathname?.startsWith("/study/shadowing") ||
    pathname?.startsWith("/study/reading") ||
    pathname?.startsWith("/study/sentence-builder") ||
    pathname?.startsWith("/study/word-link")
  );

  const isDedicatedGameRoute = Boolean(
    pathname?.startsWith("/study/sentence-builder") ||
    pathname?.startsWith("/study/word-link")
  );

  const [hasLessonQuery, setHasLessonQuery] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      setHasLessonQuery(
        Boolean(
          search.includes("id=") ||
          search.includes("lessonId=") ||
          search.includes("theme=") ||
          pathname?.includes("/comprehension")
        )
      );
    }
  }, [pathname]);

  const isClientStudio =
    typeof window !== "undefined" &&
    isStudioPracticeRoute &&
    (window.location.search.includes("id=") ||
      window.location.search.includes("lessonId=") ||
      window.location.search.includes("theme=") ||
      pathname?.includes("/comprehension"));

  if (
    isExamActivePage ||
    hideBottomNav ||
    isClientStudio ||
    isDedicatedGameRoute ||
    (isStudioPracticeRoute && hasLessonQuery)
  ) {
    return null;
  }

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
      name: "Dictation",
      path: "/study/dictation",
      icon: Headphones,
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
      className="md:hidden fixed bottom-0 left-0 right-0 h-[50px] pb-[env(safe-area-inset-bottom,0px)] bg-gradient-to-t from-white via-slate-50/90 to-slate-100/80 dark:from-slate-800/90 dark:via-slate-900/95 dark:to-slate-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 z-[var(--z-navbar)] flex items-center justify-around px-1 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_16px_rgba(0,0,0,0.4)] select-none"
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
            {/* Top Active Indicator Bar: Deep Slate / Charcoal (Not pitch black) */}
            {isActive && (
              <motion.div
                layoutId="fbBottomNavActiveBar"
                className="absolute top-0 inset-x-2.5 sm:inset-x-3.5 h-[2.5px] bg-slate-900 dark:bg-slate-100 rounded-b-full shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}

            <div className="relative flex items-center justify-center">
              {tab.isProfile ? (
                /* Profile Tab: Facebook-style Avatar with distinct circular outer ring & gap */
                <div
                  className={`rounded-full p-[2px] transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "border-2 border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/15 dark:ring-white/20 shadow-xs bg-white dark:bg-slate-900"
                      : "border-2 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500 bg-white dark:bg-slate-900 opacity-80 group-hover:opacity-100"
                  }`}
                >
                  <UserAvatar
                    avatarUrl={user?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                    imageUrl={user?.imageUrl}
                    avatar={(user as any)?.avatar}
                    emoji={user?.avatarEmoji}
                    name={userName}
                    size="w-6 h-6"
                  />
                </div>
              ) : (
                /* Icon Tabs: Inactive: Grey, Active: Deep Slate / Charcoal */
                <Icon
                  className={`w-[22px] h-[22px] transition-all duration-200 ${
                    isActive
                      ? "text-slate-900 dark:text-slate-100 stroke-[2.3] scale-105"
                      : "text-slate-400 dark:text-slate-500 stroke-[1.8] group-hover:text-slate-600 dark:group-hover:text-slate-300"
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
