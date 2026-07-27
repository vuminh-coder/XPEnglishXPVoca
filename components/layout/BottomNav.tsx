"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Bot, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on active exam screen
  const isExamActivePage = pathname.match(/\/study\/exams\/[a-zA-Z0-9_-]+$/);
  if (isExamActivePage) return null;

  const tabs = [
    {
      name: "Trang chủ",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      name: "Từ vựng",
      path: "/vocabulary",
      icon: <BookOpen className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      name: "Luyện tập",
      path: "/study/practice",
      icon: <PenLine className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      name: "AI Tutor",
      path: "/ai/tutor",
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      name: "Cá nhân",
      path: "/profile",
      icon: <User className="w-5 h-5" strokeWidth={1.5} />,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 z-[var(--z-navbar)] flex items-center justify-between px-1.5 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/dashboard" && pathname.startsWith(tab.path));
        return (
          <Link
            key={tab.path}
            href={tab.path}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1 h-12 rounded-lg transition-all duration-200 tactile ${
              isActive
                ? "text-blue-600 dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/40 font-black"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
            }`}
          >
            {tab.icon}
            <span className="text-[9.5px] tracking-tight font-black uppercase whitespace-nowrap">
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
