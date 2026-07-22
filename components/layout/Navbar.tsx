"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUiStore } from "@/lib/store/uiStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationCenterStore, AppNotification } from "@/lib/store/notificationCenterStore";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

interface ThemeDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function ThemeDropdown({ isOpen, setIsOpen }: ThemeDropdownProps) {
  const { theme, setTheme } = useUiStore();

  if (!isOpen) return null;

  return (
    <div
      className="dropdown-menu active transition-spring w-48 shadow-2xl rounded-xl border border-slate-100/80 dark:border-neutral-850/60 p-1.5 bg-white dark:bg-neutral-900"
      style={{ right: 0, top: "100%", marginTop: "8px" }}
    >
      <div className="px-2.5 py-1.5 text-[9.5px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest border-b border-slate-100 dark:border-neutral-850/50 mb-1 select-none">
        Chủ đề giao diện
      </div>

      {[
        { id: "light" as const, label: "☀️ Chế độ Sáng", desc: "Độ sáng ban ngày dịu mát" },
        { id: "dark" as const, label: "🌙 Chế độ Tối", desc: "Màu tối OLED chống mỏi mắt" },
        { id: "system" as const, label: "💻 Theo hệ thống", desc: "Tự động đồng bộ thiết bị" }
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
            className={`w-full text-left px-2.5 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-neutral-850/50 ${
              isSelected ? "bg-cyan-50/20 dark:bg-cyan-950/10 text-cyan-600 dark:text-cyan-400" : "text-slate-700 dark:text-slate-350"
            }`}
          >
            <div>
              <div className="text-xs font-black">{item.label}</div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">{item.desc}</div>
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

function NotificationCenterDropdown({ isOpen, setIsOpen }: NotificationCenterDropdownProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "study" | "social">("all");
  
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
    return n.type === activeTab;
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

  if (!isOpen) return null;

  return (
    <div
      className="dropdown-menu active transition-spring w-80 md:w-96 overflow-hidden shadow-2xl rounded-2xl border border-slate-100/80 dark:border-neutral-850/60"
      style={{ right: 0, top: "100%", marginTop: "8px" }}
    >
      {/* Category Tabs */}
      <div className="p-2 border-b border-slate-100 dark:border-neutral-850/50 bg-slate-50/50 dark:bg-neutral-900/50">
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-neutral-950 p-0.5 rounded-xl text-center">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`py-1 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
              activeTab === "all"
                ? "bg-white dark:bg-neutral-850 text-cyan-600 dark:text-cyan-400 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("study")}
            className={`py-1 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
              activeTab === "study"
                ? "bg-white dark:bg-neutral-850 text-cyan-600 dark:text-cyan-400 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Học tập
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("social")}
            className={`py-1 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
              activeTab === "social"
                ? "bg-white dark:bg-neutral-850 text-cyan-600 dark:text-cyan-400 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Bạn bè & PvP
          </button>
        </div>
      </div>

      {/* Action Header controls */}
      <div className="px-4 py-2.5 font-bold text-xs border-b border-slate-100 dark:border-neutral-850/50 flex justify-between items-center bg-white dark:bg-neutral-900">
        <span className="text-slate-400 font-extrabold uppercase tracking-wide">
          Hộp thông báo ({filteredNotifs.length})
        </span>
        {filteredNotifs.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:opacity-80 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Đọc hết
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-500 hover:opacity-80 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa hết
            </button>
          </div>
        )}
      </div>

      {/* Notification List Scroll box */}
      <div
        className="notification-list divide-y divide-slate-100/50 dark:divide-neutral-850/30 bg-white dark:bg-neutral-900"
        style={{ maxHeight: "320px", overflowY: "auto" }}
      >
        {filteredNotifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center select-none">
            <BellOff className="w-9 h-9 text-slate-300 dark:text-neutral-700 mb-3" strokeWidth={1.2} />
            <span className="text-xs font-black text-slate-800 dark:text-white">Không có thông báo nào</span>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-semibold max-w-[220px] leading-relaxed">
              Các thông báo nhắc nhở và sự kiện học tập sẽ xuất hiện tại đây khi phát sinh.
            </p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              className={`dropdown-item flex items-start justify-between gap-3 p-3 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-neutral-850/30 transition-colors relative group ${
                n.isRead ? "" : "bg-cyan-50/15 dark:bg-cyan-950/10"
              }`}
              style={{ whiteSpace: "normal" }}
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <span className="text-lg shrink-0 mt-0.5 select-none">{n.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-extrabold text-[11.5px] text-slate-800 dark:text-white truncate">
                      {n.title}
                    </span>
                    {!n.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-semibold mt-0.5 whitespace-normal break-words">
                    {n.body}
                  </p>
                  <span className="text-[8.5px] font-bold text-slate-400 dark:text-neutral-500 block mt-1 uppercase tracking-wide">
                    {new Date(n.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
              
              {/* Trash button to delete notification */}
              <button
                type="button"
                onClick={(e) => handleItemDelete(e, n.id)}
                className="opacity-0 group-hover:opacity-100 w-6.5 h-6.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center cursor-pointer transition-all self-center shrink-0"
                title="Xóa thông báo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ClerkNavbar() {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { theme, toggleSidebar, sidebarOpen } = useUiStore();
  const { unreadCount } = useNotificationCenterStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <div className="top-navbar px-3.5 sm:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <button className="navbar-menu-toggle shrink-0" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="w-[20px] h-[20px]" strokeWidth={1.8} />
          ) : (
            <Menu className="w-[20px] h-[20px]" strokeWidth={1.8} />
          )}
        </button>
        <Link href="/" className="navbar-brand flex items-center gap-2 group min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm transform group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden">
            <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
          </div>
          <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1 truncate">
            <span className="text-[#0059bb]">XP</span> English
            <span className="text-amber-500 font-normal hidden min-[380px]:inline">|</span>
            <span className="text-amber-500 hidden min-[380px]:inline">XP Voca</span>
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
                    <Moon className="w-[18px] h-[18px] text-indigo-400" strokeWidth={1.8} />
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
                    <Sun className="w-[18px] h-[18px] text-amber-500" strokeWidth={1.8} />
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
                    <Laptop className="w-[18px] h-[18px] text-cyan-500" strokeWidth={1.8} />
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
                <span className="notification-dot">{unreadCount}</span>
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
              </>
            )}
          </button>
          
          <NotificationCenterDropdown isOpen={notifOpen} setIsOpen={setNotifOpen} />
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
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 dark:bg-neutral-800 text-lg border border-slate-200/50 dark:border-white/10 rounded-full w-8 h-8 shrink-0 overflow-hidden">
              {clerkUser?.imageUrl ? (
                <img src={clerkUser.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-[16px] h-[16px] text-slate-500" strokeWidth={1.8} />
              )}
            </div>
            <div className="navbar-user-info hidden sm:block">
              <div className="navbar-user-name hidden md:block">
                {clerkUser?.fullName || "User"}
              </div>
              <div className="navbar-user-level flex items-center gap-1">
                <span>Học viên</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>
          <div
            className={`dropdown-menu ${userOpen ? "active" : ""} transition-spring`}
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
            {clerkUser?.publicMetadata?.role === "admin" && (
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
    router.push("/");
  };

  return (
    <div className="top-navbar px-3.5 sm:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <button className="navbar-menu-toggle shrink-0" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="w-[20px] h-[20px]" strokeWidth={1.8} />
          ) : (
            <Menu className="w-[20px] h-[20px]" strokeWidth={1.8} />
          )}
        </button>
        <Link href="/" className="navbar-brand flex items-center gap-2 group min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm transform group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden">
            <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
          </div>
          <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1 truncate">
            <span className="text-[#0059bb]">XP</span> English
            <span className="text-amber-500 font-normal hidden min-[380px]:inline">|</span>
            <span className="text-amber-500 hidden min-[380px]:inline">XP Voca</span>
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
                    <Moon className="w-[18px] h-[18px] text-indigo-400" strokeWidth={1.8} />
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
                    <Sun className="w-[18px] h-[18px] text-amber-500" strokeWidth={1.8} />
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
                    <Laptop className="w-[18px] h-[18px] text-cyan-500" strokeWidth={1.8} />
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
                <span className="notification-dot">{unreadCount}</span>
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500/30 animate-ping pointer-events-none animate-duration-1000" />
              </>
            )}
          </button>
          
          <NotificationCenterDropdown isOpen={notifOpen} setIsOpen={setNotifOpen} />
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
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 dark:bg-neutral-800 text-lg border border-slate-200/50 dark:border-white/10 rounded-full w-8 h-8 shrink-0 overflow-hidden">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : user?.avatarEmoji && user.avatarEmoji !== "🦉" ? (
                <span className="text-lg">{user.avatarEmoji}</span>
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || user?.username || "User")}&background=0059bb&color=fff&font-size=0.45`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="navbar-user-info hidden sm:block">
              <div className="navbar-user-name hidden md:block">
                {user?.fullName || "User"}
              </div>
              <div className="navbar-user-level flex items-center gap-1">
                <span>Lvl {user?.level || 1}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>
          <div
            className={`dropdown-menu ${userOpen ? "active" : ""} transition-spring`}
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
    const savedTheme = localStorage.getItem("xp_theme_preference") as "light" | "dark" | "system" | null;
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
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
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
          icon: "⚔️",
          title: "Thách đấu PvP!",
          body: "Học viên MinhAnh vừa gửi lời mời thách đấu từ vựng.",
          type: "social",
          routeLink: "/study/pvp",
        });
      } else if (rand < 0.3) {
        store.addNotification({
          icon: "🔥",
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

  return CLERK_ENABLED ? <ClerkNavbar /> : <LocalNavbar />;
}
