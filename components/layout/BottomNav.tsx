"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Trang chủ",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      name: "Khám phá",
      path: "/vocabulary",
      icon: <BookOpen className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      name: "Luyện tập",
      path: "/study/practice",
      icon: <PenLine className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      name: "Cộng đồng",
      path: "/community",
      icon: <Users className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      name: "Cá nhân",
      path: "/profile",
      icon: <User className="w-5 h-5" strokeWidth={1.8} />,
    },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-t border-black/5 dark:border-white/5 z-navbar flex items-center justify-around px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/" && pathname.startsWith(tab.path));
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl transition-all duration-300 tactile ${
              isActive 
                ? "text-primary-500 font-bold bg-primary-500/5 dark:bg-primary-500/10" 
                : "text-muted hover:text-primary-500"
            }`}
          >
            {tab.icon}
            <span className="text-[10px] tracking-wide font-medium">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
