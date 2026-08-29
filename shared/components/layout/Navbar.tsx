"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import {
  useNotificationCenterStore,
  AppNotification,
} from "@/stores/notificationCenterStore";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Shield,
  LogOut,
  User,
  Trash2,
  CheckCheck,
  BellOff,
  Laptop,
  Swords,
  Flame,
  Trophy,
  BookOpen,
  Users,
} from "lucide-react";



interface ThemeDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function ThemeDropdown({ isOpen, setIsOpen }: ThemeDropdownProps) {
  const { theme, setTheme } = useUiStore();

  if (!isOpen) return null;

  return (
    <div
      className="dropdown-menu active transition-spring w-48 shadow-2xl rounded-xs border border-slate-100/80 dark:border-neutral-850/60 p-1.5 bg-white dark:bg-neutral-900"
      style={{ right: 0, top: "100%", marginTop: "8px" }}
    >
      <div className="px-2.5 py-1.5 text-[9.5px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest border-b border-slate-100 dark:border-neutral-850/50 mb-1 select-none">
        Chủ đề giao diện
      </div>

      {[
        {
          id: "light" as const,
          label: "☀️ Chế độ Sáng",
          desc: "Độ sáng ban ngày dịu mát",
        },
        {
          id: "dark" as const,
          label: "🌙 Chế độ Tối",
          desc: "Màu tối OLED chống mỏi mắt",
        },
        {
          id: "system" as const,
          label: "💻 Theo hệ thống",
          desc: "Tự động đồng bộ thiết bị",
        },
      ].map((item) => {
        const isSelected = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTheme(item.id);
              setIsOpen(false);
            }}
            className={`w-full text-left px-2.5 py-2 rounded-xs cursor-pointer flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-neutral-850/50 ${
              isSelected
                ? "bg-cyan-50/20 dark:bg-cyan-950/10 text-cyan-600 dark:text-cyan-400"
                : "text-slate-700 dark:text-slate-350"
            }`}
          >
            <div>
              <div className="text-xs font-black">{item.label}</div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
                {item.desc}
              </div>
            </div>
            {isSelected && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-md" />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface NotificationCenterDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function NotificationIconBadge({
  notification,
}: {
  notification: AppNotification;
}) {
  const { type, icon, title } = notification;

  if (
    icon === "swords" ||
    icon === "⚔️" ||
    title.toLowerCase().includes("pvp") ||
    title.toLowerCase().includes("thách đấu")
  ) {
    return (
      <div className="w-8 h-8 rounded-xs bg-purple-500/10 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
        <Swords className="w-4 h-4" strokeWidth={1.8} />
      </div>
    );
  }

  if (
    icon === "flame" ||
    icon === "🔥" ||
    title.toLowerCase().includes("chuỗi") ||
    title.toLowerCase().includes("streak")
  ) {
    return (
      <div className="w-8 h-8 rounded-xs bg-amber-500/10 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
        <Flame className="w-4 h-4" strokeWidth={1.8} />
      </div>
    );
  }

  if (
    icon === "trophy" ||
    icon === "🏆" ||
    title.toLowerCase().includes("thành tựu") ||
    title.toLowerCase().includes("level") ||
    title.toLowerCase().includes("hạng")
  ) {
    return (
      <div className="w-8 h-8 rounded-xs bg-yellow-500/10 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 flex items-center justify-center shrink-0">
        <Trophy className="w-4 h-4" strokeWidth={1.8} />
      </div>
    );
  }

  if (
    icon === "social" ||
    icon === "👋" ||
    type === "social" ||
    title.toLowerCase().includes("bạn bè") ||
    title.toLowerCase().includes("kết bạn")
  ) {
    return (
      <div className="w-8 h-8 rounded-xs bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
        <Users className="w-4 h-4" strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-xs bg-[#0059bb]/10 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0">
      <BookOpen className="w-4 h-4" strokeWidth={1.8} />
    </div>
  );
}

function NotificationCenterDropdown({
  isOpen,
  setIsOpen,
}: NotificationCenterDropdownProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "study">("all");

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotificationCenterStore();

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === "all") return true;
    return n.type === "study";
  });

  const handleItemClick = (n: AppNotification) => {
    markAsRead(n.id);
    setIsOpen(false);
    if (n.routeLink) {
      router.push(n.routeLink);
    }
  };

  const handleItemDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Click-away Overlay (không làm mờ hay nhòe navbar) */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Popover Card - Nằm sát rìa phải */}
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed right-2.5 sm:right-0 top-[54px] sm:top-full sm:mt-2 w-[calc(100vw-1.25rem)] max-w-[360px] sm:w-80 md:w-96 overflow-hidden shadow-2xl rounded-xs border border-slate-200/90 dark:border-white/15 bg-white dark:bg-neutral-900 z-50 select-none font-sans"
          >
            {/* Compact Header: Title + Tab Pills + Actions */}
            <div className="p-2.5 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-neutral-950/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide">
                  Thông báo
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-[10px] font-bold text-white leading-tight">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>

              {/* Segmented Filter Pills */}
              <div className="flex items-center bg-slate-200/70 dark:bg-neutral-800 p-0.5 rounded-xs text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-white dark:bg-neutral-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("study")}
                  className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer ${
                    activeTab === "study"
                      ? "bg-white dark:bg-neutral-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Học tập
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                {filteredNotifs.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="p-1 rounded-xs hover:bg-slate-200/80 dark:hover:bg-neutral-800 text-[#0059bb] dark:text-sky-400 transition-colors cursor-pointer"
                      title="Đánh dấu đọc tất cả"
                    >
                      <CheckCheck className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="p-1 rounded-xs hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Xóa tất cả"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-xs hover:bg-slate-200/80 dark:hover:bg-neutral-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer sm:hidden"
                  title="Đóng"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* Notification List Scroll box: Tối đa hiển thị 3 tin nhắn lướt cuộn */}
            <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[225px] sm:max-h-[235px] overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
              {filteredNotifs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center select-none">
                  <BellOff
                    className="w-9 h-9 text-slate-300 dark:text-neutral-700 mb-2.5"
                    strokeWidth={1.2}
                  />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Không có thông báo nào
                  </span>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-[220px] leading-relaxed">
                    Các sự kiện học tập và nhắc nhở sẽ xuất hiện tại đây khi phát sinh.
                  </p>
                </div>
              ) : (
                filteredNotifs.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleItemClick(n)}
                    className={`flex items-start justify-between gap-2.5 p-2.5 sm:p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-800/40 transition-colors relative group ${
                      n.isRead
                        ? ""
                        : "bg-[#0059bb]/5 dark:bg-blue-950/20 border-l-2 border-[#0059bb]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <NotificationIconBadge notification={n} />
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`text-xs truncate ${
                              !n.isRead
                                ? "font-bold text-slate-900 dark:text-white"
                                : "font-medium text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {n.title}
                          </span>
                          {!n.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb] dark:bg-sky-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed break-words line-clamp-2">
                          {n.body}
                        </p>
                        <span className="text-[9px] font-semibold text-slate-400 dark:text-neutral-500 block pt-0.5">
                          {new Date(n.createdAt).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Trash button to delete notification */}
                    <button
                      type="button"
                      onClick={(e) => handleItemDelete(e, n.id)}
                      className="opacity-70 sm:opacity-0 group-hover:opacity-100 p-1 rounded hover:text-rose-500 hover:bg-rose-500/10 text-slate-400 cursor-pointer transition-all self-center shrink-0"
                      title="Xóa thông báo này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Thanh báo hiệu lướt khi có nhiều hơn 3 thông báo */}
            {filteredNotifs.length > 3 && (
              <div className="px-3 py-1.5 bg-slate-50/90 dark:bg-neutral-950/90 border-t border-slate-100 dark:border-white/5 text-[10.5px] text-slate-400 dark:text-neutral-500 font-bold flex items-center justify-between select-none">
                <span>Cuộn lướt xem thêm ({filteredNotifs.length} thông báo)</span>
                <span className="text-[#0059bb] dark:text-sky-400 font-extrabold text-xs animate-bounce">↓</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LocalNavbar() {
  const { user, logout: localLogout } = useAuthStore();
  const { theme, toggleSidebar, sidebarOpen } = useUiStore();
  const { unreadCount } = useNotificationCenterStore();
  const router = useRouter();

  const [notifOpen, setNotifOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);


  const handleLogout = () => {
    localLogout();
  };

  return (
    <div className="top-navbar h-[52px] px-3.5 sm:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <button className="navbar-menu-toggle shrink-0" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="w-[20px] h-[20px]" strokeWidth={1.8} />
          ) : (
            <Menu className="w-[20px] h-[20px]" strokeWidth={1.8} />
          )}
        </button>
        <Link
          href="/dashboard"
          className="navbar-brand flex items-center gap-2 group min-w-0"
        >
          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1 font-display tracking-tight shrink-0 select-none">
            <span className="text-[#0059bb]">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </div>
        </Link>
      </div>

      <div className="navbar-actions flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Dynamic Theme Control Dropdown */}


        <div className="dropdown navbar-theme-control">
          <button
            type="button"
            className="btn-icon btn-ghost relative transition-spring hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10"
            onClick={() => {
              setThemeOpen(!themeOpen);
              setNotifOpen(false);
              setUserOpen(false);
            }}
            title="Đổi chủ đề giao diện"
          >
            <div className="relative w-[18px] h-[18px]">
              <AnimatePresence mode="wait">
                {theme === "dark" && (
                  <motion.div
                    key="dark"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Moon
                      className="w-[18px] h-[18px] text-indigo-400"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                )}
                {theme === "light" && (
                  <motion.div
                    key="light"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sun
                      className="w-[18px] h-[18px] text-amber-500"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                )}
                {theme === "system" && (
                  <motion.div
                    key="system"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Laptop
                      className="w-[18px] h-[18px] text-cyan-500"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          <ThemeDropdown isOpen={themeOpen} setIsOpen={setThemeOpen} />
        </div>

        {/* Dynamic Notification Bell */}
        <div className="dropdown navbar-notification">
          <button
            className="btn-icon btn-ghost relative transition-spring hover:scale-105 active:scale-95 cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setThemeOpen(false);
              setUserOpen(false);
            }}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <>
                <span className="notification-dot">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500/30 animate-ping pointer-events-none animate-duration-1000" />
              </>
            )}
          </button>

          <NotificationCenterDropdown
            isOpen={notifOpen}
            setIsOpen={setNotifOpen}
          />
        </div>

        <div className="dropdown">
          <div
            className="navbar-user transition-spring hover:bg-black/5 dark:hover:bg-white/5 rounded-xl p-1 cursor-pointer flex items-center gap-1.5"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
              setThemeOpen(false);
            }}
          >
            <UserAvatar
              avatar={(user as any)?.avatar}
              avatarUrl={(user as any)?.avatarUrl}
              imageUrl={user?.imageUrl}
              emoji={user?.avatarEmoji}
              name={user?.fullName || user?.username || user?.email}
              size="w-8 h-8"
            />
            <div className="navbar-user-info hidden sm:block">
              <div className="navbar-user-name hidden md:block">
                {formatCleanName(user?.fullName || user?.username || user?.email)}
              </div>
              <div className="navbar-user-level flex items-center gap-1">
                <span>Lvl {user?.level || 1}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>
          <div
            className={`dropdown-menu ${userOpen ? "active" : ""} transition-spring rounded-xs`}
            style={{ right: 0 }}
          >
            <Link
              href="/profile"
              className="dropdown-item flex items-center gap-2"
              onClick={() => setUserOpen(false)}
            >
              <User className="w-4 h-4" strokeWidth={1.8} />
              Trang cá nhân
            </Link>
            {user?.email === "vuanhtuanfc@gmail.com" && (
              <Link
                href="/admin"
                className="dropdown-item flex items-center gap-2"
                onClick={() => setUserOpen(false)}
              >
                <Shield className="w-4 h-4" strokeWidth={1.8} />
                Quản trị
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item text-error flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.8} />
              Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // System media query theme preference synchronization
  useEffect(() => {
    if (!mounted) return;

    // Read cached choice
    const uiStore = useUiStore.getState();
    const savedTheme = localStorage.getItem("xp_theme_preference") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      uiStore.setTheme(savedTheme);
    } else {
      uiStore.setTheme("light");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const currentTheme = useUiStore.getState().theme;
      if (currentTheme === "system") {
        const isDark = mediaQuery.matches;
        document.documentElement.setAttribute(
          "data-theme",
          isDark ? "dark" : "light",
        );
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [mounted]);

  // Simulation timer for dynamic incoming notifications to bring life to the application
  useEffect(() => {
    if (!mounted) return;

    // Initial storage load
    const store = useNotificationCenterStore.getState();
    store.loadFromStorage();

    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.15) {
        store.addNotification({
          icon: "swords",
          title: "Thách đấu PvP!",
          body: "Học viên MinhAnh vừa gửi lời mời thách đấu từ vựng.",
          type: "social",
          routeLink: "/study/pvp",
        });
      } else if (rand < 0.3) {
        store.addNotification({
          icon: "flame",
          title: "Chuỗi học tập!",
          body: "Hãy ôn tập 5 từ vựng hôm nay để duy trì chuỗi học tập hàng ngày.",
          type: "study",
          routeLink: "/review",
        });
      }
    }, 120000); // Trigger mock event check every 2 minutes

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return <div className="top-navbar"></div>;

  return <LocalNavbar />;
}
