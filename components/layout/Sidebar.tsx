"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useUiStore } from "@/lib/store/uiStore";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  Sparkles,
  Star,
  ListOrdered,
  BookMarked,
  BarChart3,
  Wand2,
  Languages,
  Sun,
  Moon,
  User,
  Laptop,
  Check,
} from "lucide-react";

const SpeakingIcon = ({
  className = "w-[18px] h-[18px]",
}: {
  className?: string;
}) => (
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
        path: "/study/shadowing",
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
        name: "Ngữ pháp AI",
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
        name: "Lộ trình",
        path: "/roadmap",
        icon: <Compass className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "roadmap",
        badge: "AI",
      },
      {
        name: "Thống kê",
        path: "/analytics",
        icon: <BarChart3 className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "analytics",
      },
      {
        name: "Xếp hạng",
        path: "/community",
        icon: <Trophy className="w-[18px] h-[18px]" strokeWidth={1.8} />,
        page: "community",
      },
    ],
  },
];

interface SidebarNavProps {
  userName?: string;
  user?: any;
  onLogout: () => void;
}

function SidebarNavInner({
  userName = "Học viên XP Voca",
  user,
  onLogout,
}: SidebarNavProps) {
  const pathname = usePathname();
  const {
    theme,
    setTheme,
    toggleTheme,
    sidebarOpen,
    sidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapsed,
  } = useUiStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeSubmenu, setShowThemeSubmenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
        setShowThemeSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={`left-sidebar select-none transition-all duration-200 ease-[cubic-bezier(0.2,0.9,0.1,1)] ${
          sidebarOpen ? "open" : ""
        } ${sidebarCollapsed ? "collapsed" : ""}`}
      >
        {/* 1. TOP BRAND HEADER */}
        <div
          className={`flex items-center justify-between ${
            sidebarCollapsed
              ? "px-2 py-3.5 min-h-[57px]"
              : "px-3.5 py-4 min-h-[64px]"
          } border-b border-slate-100 dark:border-white/5 shrink-0`}
        >
          {sidebarCollapsed ? (
            /* Show collapsed clean icon when collapsed */
            <Link
              href="/dashboard"
              className="mx-auto flex items-center justify-center w-8 h-8 transition-transform active:scale-95 my-[1.5px] py-[0.5px] select-none"
              title="Trang chủ"
            >
              <img
                src="/icons/icon-any-192x192.png"
                alt="XP Logo"
                className="w-full h-full object-contain block select-none pointer-events-none rounded-xs"
              />
            </Link>
          ) : (
            /* When expanded: Show brand text name + collapse button (No logo image) */
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 group min-w-0"
              >
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1 truncate font-display leading-none tracking-tight select-none">
                  <span className="text-[#0059bb]">XP</span> English
                  <span className="text-amber-500 font-normal">|</span>
                  <span className="text-amber-500">XP Voca</span>
                </div>
              </Link>

              <button
                onClick={toggleSidebarCollapsed}
                className="p-1.5 py-[7px] my-[1px] rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                title="Thu gọn thanh bên"
              >
                <PanelLeftClose className="w-5 h-5 stroke-[2]" />
              </button>
            </>
          )}
        </div>

        {/* 2. NAVIGATION LINKS */}
        <div
          className={`sidebar-nav flex-1 overflow-y-auto px-2.5 ${
            sidebarCollapsed ? "py-3 space-y-2.5" : "py-3 space-y-4"
          } no-scrollbar`}
        >
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

              <div className={sidebarCollapsed ? "space-y-1.5" : "space-y-0.5"}>
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
                      } transition-all duration-200 flex items-center ${
                        sidebarCollapsed
                          ? "justify-center px-0 py-2"
                          : "justify-between px-3 py-2"
                      } w-full rounded`}
                    >
                      <div
                        className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} min-w-0`}
                      >
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

          {/* WHEN COLLAPSED: SHOW EXPAND BUTTON, LANGUAGES & THEME TOGGLE BUTTON */}
          {sidebarCollapsed && (
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-1.5">
              <button
                onClick={toggleSidebarCollapsed}
                className="w-9 h-9 my-[1.5px] py-[1.5px] rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title="Mở rộng thanh bên"
              >
                <PanelLeft className="w-5 h-5 stroke-[1.8]" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title="Ngôn ngữ (Tiếng Việt)"
              >
                <Languages className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                title={
                  theme === "dark"
                    ? "Chuyển sang giao diện Sáng"
                    : "Chuyển sang giao diện Tối"
                }
              >
                {theme === "dark" ? (
                  <Sun
                    className="w-[18px] h-[18px] text-amber-400"
                    strokeWidth={1.8}
                  />
                ) : (
                  <Moon
                    className="w-[18px] h-[18px] text-indigo-500"
                    strokeWidth={1.8}
                  />
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
              className="w-full py-2.5 px-3.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-sky-400 text-xs font-black flex items-center justify-between hover:bg-blue-100/80 transition-colors shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{" "}
                Nâng cấp Premium
              </span>
              <span>➔</span>
            </Link>
          )}

          <div ref={userMenuRef} className="relative">
            {/* FLOATING POPOVER DROPDOWN MENU */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={
                    sidebarCollapsed
                      ? { opacity: 0, x: -8, scale: 0.96 }
                      : { opacity: 0, y: 6, scale: 0.97 }
                  }
                  animate={
                    sidebarCollapsed
                      ? { opacity: 1, x: 0, scale: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={
                    sidebarCollapsed
                      ? { opacity: 0, x: -8, scale: 0.96 }
                      : { opacity: 0, y: 6, scale: 0.97 }
                  }
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`absolute z-[9999] p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-300/40 dark:shadow-black/70 space-y-0.5 select-none ${
                    sidebarCollapsed
                      ? "left-full ml-3 bottom-0 w-44"
                      : "bottom-full mb-2 left-0 right-0"
                  }`}
                >
                  {/* 1. Hồ sơ */}
                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xs font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                    <span>Hồ sơ</span>
                  </Link>

                  {/* 2. Giao diện (CHỈ HIỆN KHI SIDEBAR MỞ RỘNG) */}
                  {!sidebarCollapsed && (
                    <>
                      <div className="my-1 border-t border-slate-100 dark:border-white/10" />

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowThemeSubmenu(!showThemeSubmenu)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xs font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {theme === "dark" ? (
                              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                            ) : (
                              <Sun className="w-4 h-4 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                            )}
                            <span>Giao diện</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                              {theme === "dark" ? "Tối" : "Sáng"}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 stroke-[1.8] transition-transform duration-200 ${
                                showThemeSubmenu
                                  ? "rotate-90 text-[#0059bb]"
                                  : ""
                              }`}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {showThemeSubmenu && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -2 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -2 }}
                              transition={{ duration: 0.15 }}
                              className="my-1 ml-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-0.5 overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTheme("light");
                                }}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer ${
                                  theme === "light"
                                    ? "bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 font-bold"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Sun className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                                  <span>Sáng</span>
                                </div>
                                {theme === "light" && (
                                  <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTheme("dark");
                                }}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer ${
                                  theme === "dark"
                                    ? "bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 font-bold"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                                  <span>Tối</span>
                                </div>
                                {theme === "dark" && (
                                  <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                                )}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}

                  {/* Thin Divider Line */}
                  <div className="my-1 border-t border-slate-100 dark:border-white/10" />

                  {/* 3. Đăng xuất */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xs font-medium text-[13px] text-[#f04438] dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-[#f04438] dark:text-rose-400 stroke-[1.8]" />
                    <span>Đăng xuất</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* USER CARD TRIGGER (COLLAPSED VS EXPANDED - REDUCED RADIUS WITH CIRCLE AVATAR) */}
            {sidebarCollapsed ? (
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-full bg-[#0059bb] text-white font-black text-sm flex items-center justify-center mx-auto shadow-2xs hover:opacity-90 transition-opacity cursor-pointer border-none outline-none overflow-hidden shrink-0"
                title={userName}
              >
                {user?.imageUrl ||
                (user as any)?.avatar ||
                (user as any)?.avatarUrl ? (
                  <img
                    src={
                      user.imageUrl ||
                      (user as any).avatar ||
                      (user as any).avatarUrl
                    }
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : user?.avatarEmoji && user.avatarEmoji !== "🦉" ? (
                  <span className="text-sm">{user.avatarEmoji}</span>
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0059bb&color=fff&font-size=0.4`}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center justify-between p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer text-left shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-full bg-[#0059bb] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                    {user?.imageUrl ||
                    (user as any)?.avatar ||
                    (user as any)?.avatarUrl ? (
                      <img
                        src={
                          user.imageUrl ||
                          (user as any).avatar ||
                          (user as any).avatarUrl
                        }
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    ) : user?.avatarEmoji && user.avatarEmoji !== "🦉" ? (
                      <span className="text-sm">{user.avatarEmoji}</span>
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0059bb&color=fff&font-size=0.4`}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-bold text-slate-900 dark:text-white truncate block">
                      {userName}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block truncate mt-0.5">
                      {user?.email ||
                        (user?.username
                          ? `@${user.username}`
                          : "Thành viên XP Voca")}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 stroke-[1.8] transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
                />
              </button>
            )}
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
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !user) return <div className="left-sidebar"></div>;

  return (
    <SidebarNavInner
      userName={user.fullName || user.username || "Học viên XP Voca"}
      user={user}
      onLogout={logout}
    />
  );
}
