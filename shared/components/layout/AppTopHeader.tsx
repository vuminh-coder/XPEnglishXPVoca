"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Sun,
  Moon,
  Quote,
  Volume2,
  Shuffle,
  ArrowLeft,
  User,
  LogOut,
  Check,
  ChevronRight,
} from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { useUserStore } from "@/stores/userStore";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import {
  getDailyInspirationalQuote,
  getRandomInspirationalQuote,
  InspirationalQuote,
} from "@/features/gamification/data/inspirationalQuotes";

/* =========================================================================
   1. REUSABLE PILL HELPER SUB-COMPONENTS
   ========================================================================= */

export interface HeaderPillContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderPillContainer({ children, className = "" }: HeaderPillContainerProps) {
  return (
    <div
      className={`p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 max-w-full overflow-x-auto scrollbar-none ${className}`}
    >
      {children}
    </div>
  );
}

export interface HeaderPillItemProps {
  active?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  label: string;
  /** Hide the text label on mobile screens (below sm: 640px) */
  hideLabelOnSmall?: boolean;
  /** Hide the entire pill on mobile screens */
  hideOnSmall?: boolean;
  /** Hide the entire pill on medium screens (below md: 768px) */
  hideOnMedium?: boolean;
  className?: string;
}

export function HeaderPillItem({
  active = false,
  href,
  onClick,
  icon,
  label,
  hideLabelOnSmall,
  hideOnSmall = false,
  hideOnMedium = false,
  className = "",
}: HeaderPillItemProps) {
  // Adaptive Mobile Behavior: Active tab shows [Icon + Text], Inactive tabs show [Icon only] on mobile (< sm: 640px)
  const shouldHideTextOnMobile = hideLabelOnSmall !== undefined ? hideLabelOnSmall : !active;

  const content = (
    <>
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className={shouldHideTextOnMobile ? "hidden sm:inline" : "inline"}>
        {label}
      </span>
    </>
  );

  const responsiveClasses = `${hideOnSmall ? "hidden sm:inline-flex" : ""} ${
    hideOnMedium ? "hidden md:inline-flex" : ""
  }`;

  const baseClasses = `px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-all cursor-pointer select-none flex items-center justify-center gap-1.5 shrink-0 ${responsiveClasses} ${className}`;

  if (active) {
    return (
      <span
        title={label}
        className={`${baseClasses} font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs cursor-default`}
      >
        {content}
      </span>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        title={label}
        className={`${baseClasses} font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900/50`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`${baseClasses} font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900/50`}
    >
      {content}
    </button>
  );
}

/* =========================================================================
   2. MASTER APPTOPHEADER COMPONENT
   ========================================================================= */

export interface AppTopHeaderProps {
  /** Slot for the Page-Specific Mode Switcher Pill / Breadcrumb / Custom Title (Left Side) */
  children?: React.ReactNode;
  /** Optional custom left action (overrides or complements children) */
  leftContent?: React.ReactNode;
  /** Optional custom back button callback (if provided, replaces the hamburger menu) */
  onBack?: () => void;
  /** Whether to show the inspirational daily quote on desktop (default: true) */
  showDailyQuote?: boolean;
  /** Custom quote object if desired */
  customQuote?: InspirationalQuote;
  /** Optional custom right-side actions */
  rightExtraActions?: React.ReactNode;
  /** Optional desktop-specific right content (e.g. search bars & action buttons) */
  rightDesktopContent?: React.ReactNode;
  /** Whether to hide Theme toggle & Avatar on desktop (default: true if rightDesktopContent is provided) */
  hideThemeAndAvatarOnDesktop?: boolean;
  /** Whether header is sticky on top (default: true) */
  sticky?: boolean;
  /** Additional container classes */
  className?: string;
}

export function AppTopHeader({
  children,
  leftContent,
  onBack,
  showDailyQuote = true,
  customQuote,
  rightExtraActions,
  rightDesktopContent,
  hideThemeAndAvatarOnDesktop,
  sticky = true,
  className = "",
}: AppTopHeaderProps) {
  const pathname = usePathname();
  const { toggleSidebar, theme, setTheme } = useUiStore();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeSubmenu, setShowThemeSubmenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowThemeSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close user menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowUserMenu(false);
        setShowThemeSubmenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close user menu on route change
  useEffect(() => {
    setShowUserMenu(false);
    setShowThemeSubmenu(false);
  }, [pathname]);

  const userName = user?.fullName || user?.username || "Học viên XP Voca";

  const shouldHideThemeAndAvatarOnDesktop =
    hideThemeAndAvatarOnDesktop ?? Boolean(rightDesktopContent);
  const themeAvatarResponsiveClass = shouldHideThemeAndAvatarOnDesktop ? "lg:hidden" : "";

  const [quote, setQuote] = useState<InspirationalQuote>(() => {
    return customQuote || getDailyInspirationalQuote();
  });

  useEffect(() => {
    if (customQuote) {
      setQuote(customQuote);
    }
  }, [customQuote]);

  return (
    <div
      className={`w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 select-none shrink-0 shadow-2xs ${
        sticky ? "sticky top-0 z-30" : "relative"
      } ${className}`}
    >
      {/* ─── LEFT SECTION: Hamburger Toggle / Back + Custom Page Mode Switcher ─── */}
      <div className="flex items-center gap-2 min-w-0">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            aria-label="Quay lại"
            title="Quay lại"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            aria-label="Mở danh mục thanh bên"
            title="Mở thanh bên"
          >
            <Menu className="w-4 h-4 stroke-[2.2]" />
          </button>
        )}

        {/* Custom Mode Switcher Pill / Left Content Slot */}
        {children || leftContent}
      </div>

      {/* ─── RIGHT SECTION: Desktop Search/Actions OR Daily Quote, Theme Toggle & User Avatar ─── */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Custom Desktop Right Content (e.g. Search Bar + Action Button) */}
        {rightDesktopContent && (
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {rightDesktopContent}
          </div>
        )}

        {/* Daily Inspirational Quote (Desktop) when no custom rightDesktopContent */}
        {!rightDesktopContent && showDailyQuote && quote && (
          <div className="relative hidden lg:flex max-w-[300px] xl:max-w-[480px] items-center justify-between gap-2.5 group transition-all">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Quote className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                  "{quote.en}"
                </p>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate hidden xl:block">
                  {quote.vn} —{" "}
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {quote.author}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => speakLessonText(quote.en, { rate: 0.95 })}
                className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Nghe phát âm chuẩn tiếng Anh"
              >
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => setQuote(getRandomInspirationalQuote(quote.id))}
                className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Đổi câu danh ngôn ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* Custom Extra Actions (if any) */}
        {rightExtraActions}

        {/* User Avatar with Interactive Floating Popover Menu */}
        <div className={`relative shrink-0 ${themeAvatarResponsiveClass}`} ref={userMenuRef}>
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowThemeSubmenu(false);
            }}
            className={`flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#0059bb]/30 transition-all cursor-pointer active:scale-95 shrink-0 ${
              showUserMenu ? "ring-2 ring-[#0059bb]" : ""
            }`}
            title="Menu tài khoản"
            aria-expanded={showUserMenu}
            aria-haspopup="menu"
          >
            <UserAvatar
              avatarUrl={user?.avatarUrl}
              name={userName}
              size="w-8 h-8 sm:w-8.5 sm:h-8.5"
              className="ring-1.5 ring-slate-200/90 dark:ring-slate-700"
            />
          </button>

          {/* Floating Dropdown Popover */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-48 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-300/40 dark:shadow-black/70 space-y-0.5 select-none z-[9999]"
              >
                {/* 1. Hồ sơ */}
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
                  <span>Hồ sơ</span>
                </Link>

                {/* Divider */}
                <div className="my-1 border-t border-slate-100 dark:border-white/10" />

                {/* 2. Giao diện Sáng/Tối */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowThemeSubmenu(!showThemeSubmenu)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
                          showThemeSubmenu ? "rotate-90 text-[#0059bb]" : ""
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
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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

                {/* Divider */}
                <div className="my-1 border-t border-slate-100 dark:border-white/10" />

                {/* 4. Logout Action */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-[13px] text-[#f04438] dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-[#f04438] dark:text-rose-400 stroke-[1.8]" />
                  <span>Đăng xuất</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AppTopHeader;
