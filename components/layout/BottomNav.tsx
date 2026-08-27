"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Bot, Users, User } from "lucide-react";

import { useUiStore } from "@/lib/store/uiStore";

export default function BottomNav() {
  const pathname = usePathname();
  const { sidebarCollapsed } = useUiStore();

  // Hide BottomNav on active exam screen or active exam-prep test workspace or active studio listening/shadowing workspace
  const isStudioWorkspace =
    pathname?.startsWith("/study/listening") ||
    pathname?.startsWith("/study/shadowing");
  const isExamActivePage =
    pathname.match(/\/study\/exams\/[a-zA-Z0-9_-]+$/) ||
    (pathname.startsWith("/study/exam-prep") && sidebarCollapsed) ||
    isStudioWorkspace;
  if (isExamActivePage) return null;

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
      className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 z-[var(--z-navbar)] flex items-center justify-around px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/dashboard" && pathname.startsWith(tab.path));
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            href={tab.path}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 w-14 h-11 rounded-xs transition-all duration-200 tactile ${
              isActive
                ? "text-[#0059bb] dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/40"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.2 : 1.6} />
            <span className={`text-[8px] tracking-tight whitespace-nowrap leading-none ${isActive ? "font-black" : "font-bold"}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
