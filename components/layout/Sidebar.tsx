"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { useUiStore } from "@/lib/store/uiStore";
import { Home, BookOpen, Layers, Calendar, PenLine, MessageSquare, Users, LogOut } from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const sections = [
  {
    title: "Học tập",
    links: [
      {
        name: "Trang chủ",
        path: "/dashboard",
        icon: <Home className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "dashboard",
      },
      {
        name: "Khám phá bộ từ",
        path: "/vocabulary",
        icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "vocabulary",
      },
      {
        name: "Bộ từ của tôi",
        path: "/myvocab",
        icon: <Layers className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "myvocab",
      },
      {
        name: "Lịch ôn",
        path: "/review",
        icon: <Calendar className="w-[18px] h-[18px]" strokeWidth={1.8} />,
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
        icon: <PenLine className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "practice",
      },
      {
        name: "Hội thoại AI",
        path: "/ai/conversation",
        icon: <MessageSquare className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "aichat",
      },
    ],
  },
  {
    title: "Cộng đồng",
    links: [
      {
        name: "Cộng đồng",
        path: "/community",
        icon: <Users className="w-[18px] h-[18px]" strokeWidth={1.8} />,
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
                    onClick={() => sidebarOpen && toggleSidebar()}
                    className={`sidebar-link ${isActive ? "active" : ""} tactile`}
                    style={{
                      transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                    }}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    <span className="font-bold text-[13px]">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div
            className="sidebar-link cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl tactile"
            style={{ transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)" }}
            onClick={handleLogout}
          >
            <span className="sidebar-link-icon">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} />
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
                    onClick={() => sidebarOpen && toggleSidebar()}
                    className={`sidebar-link ${isActive ? "active" : ""} tactile`}
                    style={{
                      transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                    }}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    <span className="font-bold text-[13px]">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div
            className="sidebar-link cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl tactile"
            style={{ transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)" }}
            onClick={handleLogout}
          >
            <span className="sidebar-link-icon">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} />
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
  const [clerkEnabled, setClerkEnabled] = useState(true);

  useEffect(() => {
    setClerkEnabled(checkIsClerkEnabled());
    setMounted(true);
  }, []);

  if (!mounted) return <div className="left-sidebar"></div>;

  return clerkEnabled ? <ClerkSidebar /> : <LocalSidebar />;
}
