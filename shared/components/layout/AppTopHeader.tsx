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
  Bot,
  Search,
  X,
  Flame,
  Coins,
  Settings,
} from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { useUserStore } from "@/stores/userStore";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
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
  /** Framer Motion layoutId for smooth sliding active indicator */
  layoutId?: string;
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
  layoutId,
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

  const baseClasses = `px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors duration-150 active:scale-[0.98] cursor-pointer select-none flex items-center justify-center gap-1.5 shrink-0 ${responsiveClasses} ${className}`;

  if (active) {
    return (
      <span
        title={label}
        className={`${baseClasses} font-bold text-slate-900 dark:text-white cursor-default relative`}
      >
        {layoutId ? (
          <motion.span
            layoutId={layoutId}
            transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
          />
        ) : (
          <span className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-1.5">{content}</span>
      </span>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        prefetch={true}
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

export interface HeaderSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

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
  /** Optional search props for adaptive desktop input & mobile search overlay */
  searchProps?: HeaderSearchProps;
  /** Whether to show Gamification stats chips (Streak 🔥, Gold 🪙) (default: false) */
  showGamificationStats?: boolean;
  /** Optional custom right-side actions */
  rightExtraActions?: React.ReactNode;
  /** Optional desktop-specific right content (e.g. search bars & action buttons) */
  rightDesktopContent?: React.ReactNode;
  /** Whether to hide Theme toggle & Avatar on desktop (default: false) */
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
  searchProps,
  showGamificationStats = false,
  rightExtraActions,
  rightDesktopContent,
  hideThemeAndAvatarOnDesktop = false,
  sticky = true,
  className = "",
}: AppTopHeaderProps) {
  const pathname = usePathname();
  const { toggleSidebar, theme, setTheme } = useUiStore();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeSubmenu, setShowThemeSubmenu] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Auto-focus mobile search input when overlay opens
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Close mobile search on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileSearchOpen]);

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

  // Close user menu and mobile search on route change
  useEffect(() => {
    setShowUserMenu(false);
    setShowThemeSubmenu(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  const userName = user?.fullName || user?.username || "Học viên XP Voca";

  // By default, preserve User Avatar on Desktop even when rightDesktopContent is present
  const shouldHideThemeAndAvatarOnDesktop = hideThemeAndAvatarOnDesktop;
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

      {/* ─── RIGHT SECTION: Search, Gamification, Custom Actions, Quote & User Avatar ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* 1. Integrated Desktop Search Input */}
        {searchProps && (
          <div className="relative w-44 sm:w-56 lg:w-64 xl:w-72 hidden lg:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchProps.value}
              onChange={(e) => searchProps.onChange(e.target.value)}
              placeholder={searchProps.placeholder || "Tìm kiếm bài học..."}
              className="w-full h-9 pl-9 pr-8 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 transition-all"
            />
            {searchProps.value && (
              <button
                type="button"
                onClick={() => {
                  searchProps.onChange("");
                  if (searchProps.onClear) searchProps.onClear();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* 2. Mobile Search Icon Trigger (Below lg) */}
        {searchProps && (
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            title="Mở tìm kiếm"
            aria-label="Mở tìm kiếm"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>
        )}

        {/* 3. Custom Desktop Right Content (e.g. Action Buttons) */}
        {rightDesktopContent && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {rightDesktopContent}
          </div>
        )}

        {/* 4. Gamification Chips: Streak 🔥 & Coins 🪙 */}
        {showGamificationStats && (
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Streak Flame Chip */}
            <Link
              href="/analytics"
              className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200/80 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 font-bold font-mono text-xs flex items-center gap-1 shadow-2xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all cursor-pointer active:scale-95"
              title={`Chuỗi học tập liên tục: ${user?.currentStreak ?? 1} ngày`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span className="tabular-nums">{user?.currentStreak ?? 1}</span>
            </Link>

            {/* Coins / Gold Chip */}
            <Link
              href="/shop"
              className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 font-bold font-mono text-xs hidden xs:flex items-center gap-1 shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all cursor-pointer active:scale-95"
              title={`Số Vàng hiện có: ${user?.coins ?? 0} Vàng`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span className="tabular-nums">{user?.coins ?? 0}</span>
            </Link>
          </div>
        )}

        {/* 5. Daily Inspirational Quote (Desktop) when no custom rightDesktopContent and no searchProps */}
        {!rightDesktopContent && !searchProps && showDailyQuote && quote && (
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

        {/* 6. Custom Extra Actions (if any) */}
        {rightExtraActions}

        {/* 7. User Avatar with Interactive Floating Popover Menu */}
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
              avatarUrl={user?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
              imageUrl={user?.imageUrl}
              avatar={(user as any)?.avatar}
              emoji={user?.avatarEmoji}
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
                className="absolute right-0 top-full mt-2 w-56 p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-300/40 dark:shadow-black/70 space-y-1 select-none z-[9999]"
              >
                {/* 0. Mini User Profile Summary Header */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-2.5">
                  <UserAvatar
                    avatarUrl={user?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                    imageUrl={user?.imageUrl}
                    avatar={(user as any)?.avatar}
                    emoji={user?.avatarEmoji}
                    name={userName}
                    size="w-8.5 h-8.5"
                    className="ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {userName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                      @{user?.username || "learner"}
                    </p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50 shrink-0">
                    Lv.{user?.level || 1}
                  </span>
                </div>

                {/* 1. Hồ sơ cá nhân */}
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-300 stroke-[1.8]" />
                  <span>Hồ sơ cá nhân</span>
                </Link>

                {/* 2. Cài đặt tài khoản */}
                <Link
                  href="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300 stroke-[1.8]" />
                  <span>Cài đặt tài khoản</span>
                </Link>

                {/* Divider */}
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                {/* 3. Giao diện Sáng/Tối */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowThemeSubmenu(!showThemeSubmenu)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      {theme === "dark" ? (
                        <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 stroke-[1.8]" />
                      ) : (
                        <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300 stroke-[1.8]" />
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

                {/* 4. Khôi phục Trợ lý AI XP Mentor */}
                <button
                  type="button"
                  onClick={() => {
                    useAiChatbotStore.getState().resetDismissed();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-[13px] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Bot className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[1.8]" />
                    <span>Trợ lý XP Mentor</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400">
                    Bật / Mở
                  </span>
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                {/* 5. Logout Action */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium text-[13px] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[1.8]" />
                  <span>Đăng xuất</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── EXPANDABLE FULL-WIDTH MOBILE SEARCH OVERLAY ─── */}
      <AnimatePresence>
        {isMobileSearchOpen && searchProps && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute inset-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-3 sm:px-4 flex items-center gap-2 border-b border-slate-200/90 dark:border-slate-800"
          >
            <Search className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchProps.value}
              onChange={(e) => searchProps.onChange(e.target.value)}
              placeholder={searchProps.placeholder || "Tìm kiếm bài học, chủ đề..."}
              className="flex-1 h-9 px-1 text-xs sm:text-sm font-medium bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            {searchProps.value && (
              <button
                type="button"
                onClick={() => {
                  searchProps.onChange("");
                  if (searchProps.onClear) searchProps.onClear();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Xóa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              Đóng
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppTopHeader;
