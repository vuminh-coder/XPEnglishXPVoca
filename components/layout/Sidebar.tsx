"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { useUiStore } from "@/lib/store/uiStore";

export default function Sidebar() {
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const currentUser = user ?? null;

  if (!clerkUser && !currentUser) return null;

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const sections = [
    {
      title: "Học tập",
      links: [
        {
          name: "Trang chủ",
          path: "/dashboard",
          icon: "🏠",
          page: "dashboard",
        },
        {
          name: "Khám phá bộ từ",
          path: "/vocabulary",
          icon: "📖",
          page: "vocabulary",
        },
        {
          name: "Bộ từ của tôi",
          path: "/myvocab",
          icon: "🗂️",
          page: "myvocab",
        },
        {
          name: "Lịch ôn",
          path: "/review",
          icon: "📅",
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
          icon: "📝",
          page: "practice",
        },
        {
          name: "Hội thoại AI",
          path: "/ai/conversation",
          icon: "🤖",
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
          icon: "👥",
          page: "community",
        },
      ],
    },
  ];

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
            <span className="sidebar-link-icon">🚪</span>
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
