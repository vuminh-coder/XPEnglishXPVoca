"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { useUiStore } from "@/lib/store/uiStore";
import { Home, BookOpen, Layers, Calendar, PenLine, MessageSquare, Users, LogOut, Compass, Swords, Trophy, ShoppingBag, Brain, Gamepad2, Headphones, Mic } from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

const sections = [
  {
    title: "Học tập",
    links: [
      {
        name: "Trang chủ",
        path: "/dashboard",
        icon: <Home className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "dashboard",
      },
      {
        name: "Lộ trình học",
        path: "/study/plan",
        icon: <Compass className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "studyplan",
      },
      {
        name: "Khám phá bộ từ",
        path: "/vocabulary",
        icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "vocabulary",
      },
      {
        name: "Cửa hàng vật phẩm",
        path: "/shop",
        icon: <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "shop",
      },
      {
        name: "Bộ từ của tôi",
        path: "/myvocab",
        icon: <Layers className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "myvocab",
      },
      {
        name: "Lịch ôn",
        path: "/review",
        icon: <Calendar className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "review",
      },
    ],
  },
  {
    title: "Luyện tập",
    links: [
      {
        name: "Luyện viết & Trắc nghiệm",
        path: "/study/practice",
        icon: <PenLine className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "practice",
      },
      {
        name: "Đấu trường PvP",
        path: "/study/pvp",
        icon: <Swords className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "pvp",
      },
      {
        name: "Hội thoại AI",
        path: "/ai/conversation",
        icon: <MessageSquare className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "aichat",
      },
      {
        name: "Gia sư nói AI",
        path: "/ai/tutor",
        icon: <Mic className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "aitutor",
      },
      {
        name: "Ngữ pháp AI",
        path: "/study/grammar",
        icon: <Brain className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "grammar",
      },
      {
        name: "Luyện nghe",
        path: "/study/listening",
        icon: <Headphones className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "listening",
      },
      {
        name: "Đọc hiểu",
        path: "/study/reading",
        icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "reading",
      },
      {
        name: "Phòng học nhóm",
        path: "/study/rooms",
        icon: <Users className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "rooms",
      },
      {
        name: "Mini Games",
        path: "/study/games",
        icon: <Gamepad2 className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "games",
      },
    ],
  },
  {
    title: "Cộng đồng",
    links: [
      {
        name: "Cộng đồng",
        path: "/community",
        icon: <Users className="w-[18px] h-[18px]" strokeWidth={1.3} />,
        page: "community",
      },
    ],
  },
];

function ClerkSidebar() {
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { sidebarOpen, toggleSidebar } = useUiStore();

  if (!clerkUser) return null;

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <>
      <div className={`left-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-nav">
          {sections.map((section, idx) => (
            <div key={idx} className="sidebar-section">
              <div className="sidebar-section-title !my-4">{section.title}</div>
              {section.links.map((link) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => sidebarOpen && toggleSidebar()}
                    className={`sidebar-link ${isActive ? "active" : ""} transition-spring`}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    <span className="font-bold text-[13px]" style={{ whiteSpace: 'nowrap' }}>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div
            className="sidebar-link cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-spring"
            onClick={handleLogout}
          >
            <span className="sidebar-link-icon">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.3} />
            </span>
            <span className="font-bold text-[13px]">Đăng xuất</span>
          </div>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
}

function LocalSidebar() {
  const pathname = usePathname();
  const { user, logout: localLogout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUiStore();

  if (!user) return null;

  const handleLogout = () => {
    localLogout();
  };

  return (
    <>
      <div className={`left-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-nav">
          {sections.map((section, idx) => (
            <div key={idx} className="sidebar-section">
              <div className="sidebar-section-title !my-4">{section.title}</div>
              {section.links.map((link) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => sidebarOpen && toggleSidebar()}
                    className={`sidebar-link ${isActive ? "active" : ""} transition-spring`}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    <span className="font-bold text-[13px]" style={{ whiteSpace: 'nowrap' }}>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div
            className="sidebar-link cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-spring"
            onClick={handleLogout}
          >
            <span className="sidebar-link-icon">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.3} />
            </span>
            <span className="font-bold text-[13px]">Đăng xuất</span>
          </div>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="left-sidebar"></div>;

  return CLERK_ENABLED ? <ClerkSidebar /> : <LocalSidebar />;
}
