"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { useUiStore } from "@/lib/store/uiStore";
import {
  Home,
  BookOpen,
  Layers,
  PenLine,
  MessageSquare,
  LogOut,
  Compass,
  Trophy,
  Brain,
  Headphones,
  Mic,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  Sparkles,
  Star,
  ListOrdered,
  BookMarked,
  BarChart3,
  Wand2,
  Languages,
  Sun,
  Moon,
} from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

const SpeakingIcon = ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

const sections = [
  {
    title: "TỔNG QUAN",
    links: [
      {
        name: "Trang chủ",
        path: "/dashboard",
        icon: <Home className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "dashboard",
      },
    ],
  },
  {
    title: "LUYỆN TẬP",
    links: [
      {
        name: "Dictation",
        path: "/study/listening",
        icon: <Headphones className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "dictation",
      },
      {
        name: "Shadowing",
        path: "/study/listening",
        icon: <Mic className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "shadowing",
      },
      {
        name: "Luyện nói",
        path: "/ai/tutor",
        icon: <SpeakingIcon className="w-[18px] h-[18px]" />,
        page: "aitutor",
        badge: "AI",
      },
      {
        name: "Luyện viết",
        path: "/ai/conversation",
        icon: <Wand2 className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "aichat",
        badge: "AI",
      },
      {
        name: "Luyện từ vựng",
        path: "/study/practice",
        icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "practice",
      },
    ],
  },
  {
    title: "THƯ VIỆN",
    links: [
      {
        name: "Video của tôi",
        path: "/myvideo",
        icon: <Star className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "myvideo",
      },
      {
        name: "Danh sách từ",
        path: "/vocabulary",
        icon: <ListOrdered className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "vocabulary",
        badge: "0",
      },
      {
        name: "Từ điển AI",
        path: "/study/grammar",
        icon: <BookMarked className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "grammar",
      },
    ],
  },
  {
    title: "TIẾN ĐỘ",
    links: [
      {
        name: "Xếp hạng",
        path: "/community",
        icon: <Trophy className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "community",
      },
      {
        name: "Thống kê",
        path: "/study/plan",
        icon: <BarChart3 className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "studyplan",
      },
    ],
  },
];

interface SidebarNavProps {
  userName?: string;
  onLogout: () => void;
}

function SidebarNavInner({ userName = "Minh Vu Van", onLogout }: SidebarNavProps) {
  const pathname = usePathname();
  const { theme, toggleTheme, sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapsed } = useUiStore();

  return (
    <>
      <div
        className={`left-sidebar select-none transition-all duration-300 ${
          sidebarOpen ? "open" : ""
        } ${sidebarCollapsed ? "collapsed" : ""}`}
      >
        {/* 1. TOP BRAND HEADER */}
        <div className="flex items-center justify-between px-3.5 py-4 border-b border-slate-100 dark:border-white/5 shrink-0 min-h-[64px]">
          {sidebarCollapsed ? (
            /* Show mascot owl inside clean circular avatar frame when collapsed */
            <Link href="/dashboard" className="mx-auto flex items-center justify-center" title="Trang chủ">
              <div className="w-10 h-10 rounded-full bg-[#e8edf5]/70 dark:bg-slate-800/70 p-1 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 shadow-2xs">
                <img src="/mascot.png" alt="XP Mascot" className="w-full h-full object-contain" />
              </div>
            </Link>
          ) : (
            /* When expanded: Hide mascot image, show brand name text + collapse button next to it */
            <>
              <Link href="/dashboard" className="flex items-center gap-1.5 group min-w-0">
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1 truncate font-display">
                  <span className="text-[#0059bb]">XP</span> English
                  <span className="text-amber-500 font-normal">|</span>
                  <span className="text-amber-500">XP Voca</span>
                </div>
              </Link>

              <button
                onClick={toggleSidebarCollapsed}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                title="Thu gọn thanh bên"
              >
                <PanelLeftClose className="w-5 h-5 stroke-[2]" />
              </button>
            </>
          )}
        </div>

        {/* 2. NAVIGATION LINKS */}
        <div className="sidebar-nav flex-1 overflow-y-auto px-2.5 py-3 space-y-4 no-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="sidebar-section">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2 px-2 mb-2 select-none">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display shrink-0">
                    {section.title}
                  </span>
                  <div className="h-[1px] flex-1 border-b border-dashed border-slate-200 dark:border-white/10" />
                </div>
              )}

              <div className="space-y-0.5">
                {section.links.map((link) => {
                  const isActive =
                    pathname === link.path ||
                    (link.path !== "/" && pathname.startsWith(link.path));

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      title={sidebarCollapsed ? link.name : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => sidebarOpen && toggleSidebar()}
                      className={`sidebar-link ${
                        isActive
                          ? "active bg-[#e8edf5] text-slate-900 dark:bg-slate-800 dark:text-white font-extrabold shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/60 font-semibold"
                      } transition-all duration-200 flex items-center justify-between w-full px-3 py-2 rounded-md`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="sidebar-link-icon text-current shrink-0">
                          {link.icon}
                        </span>
                        {!sidebarCollapsed && (
                          <span className="font-bold text-[13px] truncate">
                            {link.name}
                          </span>
                        )}
                        {!sidebarCollapsed && link.badge && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xs shrink-0">
                            {link.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* WHEN COLLAPSED: SHOW EXPAND BUTTON, LANGUAGES & BORDERLESS THEME TOGGLE BUTTON BELOW THỐNG KÊ */}
          {sidebarCollapsed && (
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-2">
              <button
                onClick={toggleSidebarCollapsed}
                className="w-10 h-10 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title="Mở rộng thanh bên"
              >
                <PanelLeft className="w-5 h-5 stroke-[1.8]" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title="Ngôn ngữ"
              >
                <Languages className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title={theme === "dark" ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={1.8} />
                ) : (
                  <Moon className="w-[18px] h-[18px] text-indigo-500" strokeWidth={1.8} />
                )}
              </button>
            </div>
          )}
        </div>

        {/* 3. SIDEBAR FOOTER: PREMIUM & PROFILE */}
        <div className="sidebar-footer p-3 border-t border-slate-100 dark:border-white/5 space-y-2.5 shrink-0">
          {!sidebarCollapsed && (
            <Link
              href="/shop"
              className="w-full py-2.5 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-sky-400 text-xs font-black flex items-center justify-between hover:bg-blue-100/80 transition-colors shadow-xs"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Nâng cấp Premium
              </span>
              <span>➔</span>
            </Link>
          )}

          {sidebarCollapsed ? (
            /* When collapsed: Clean circular avatar button without outer card box border */
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full bg-[#0059bb] text-white font-black text-sm flex items-center justify-center mx-auto shadow-xs hover:opacity-90 transition-opacity"
              title={userName}
            >
              {(userName || "M")[0].toUpperCase()}
            </Link>
          ) : (
            /* When expanded: Detailed profile card */
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/90 border border-slate-200/60 dark:border-white/5">
              <Link href="/profile" className="flex items-center gap-2.5 min-w-0 group cursor-pointer">
                <div className="w-8.5 h-8.5 rounded-full bg-[#0059bb] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:opacity-90">
                  {(userName || "M")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                    {userName}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block flex items-center gap-1">
                    Miễn phí <ChevronDown className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
}

function ClerkSidebar() {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  if (!clerkUser) return null;

  return (
    <SidebarNavInner
      userName={clerkUser.fullName || clerkUser.username || "Minh Vu Van"}
      onLogout={() => signOut({ redirectUrl: "/" })}
    />
  );
}

function LocalSidebar() {
  const { user, logout: localLogout } = useAuthStore();

  if (!user) return null;

  return (
    <SidebarNavInner
      userName={user.fullName || user.username || "Minh Vu Van"}
      onLogout={localLogout}
    />
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
