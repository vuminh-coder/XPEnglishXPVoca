"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on active exam screen
  const isExamActivePage = pathname.match(/\/study\/exams\/[a-zA-Z0-9_-]+$/);
  if (isExamActivePage) return null;

  const tabs = [
    {
      name: "Trang chủ",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" strokeWidth={1.3} />,
    },
    {
      name: "Khám phá",
      path: "/vocabulary",
      icon: <BookOpen className="w-5 h-5" strokeWidth={1.3} />,
    },
    {
      name: "Luyện tập",
      path: "/study/practice",
      icon: <PenLine className="w-5 h-5" strokeWidth={1.3} />,
    },
    {
      name: "Cộng đồng",
      path: "/community",
      icon: <Users className="w-5 h-5" strokeWidth={1.3} />,
    },
    {
      name: "Cá nhân",
      path: "/profile",
      icon: <User className="w-5 h-5" strokeWidth={1.3} />,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 z-[var(--z-navbar)] flex items-center justify-between px-2 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/" && tab.path !== "/study/practice" && pathname.startsWith(tab.path));
        return (
          <Link
            key={tab.path}
            href={tab.path}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 h-12 rounded-xl transition-all duration-300 tactile ${
              isActive
                ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 font-black"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
            }`}
          >
            {tab.icon}
            <span className="text-[9px] tracking-wide font-black uppercase whitespace-nowrap">
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
