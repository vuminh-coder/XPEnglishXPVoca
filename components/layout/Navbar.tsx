"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUiStore } from "@/lib/store/uiStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Bell, Sun, Moon, Menu, X, ChevronDown, Shield, LogOut, User } from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

const notifications = [
  {
    id: "n1",
    icon: "🏆",
    title: "Thành tựu mới!",
    body: 'Bạn đã đạt được "5 Ngày Liên"! +100 XP',
    isRead: false,
  },
  {
    id: "n2",
    icon: "👋",
    title: "Lời mời kết bạn",
    body: "HoangAnh muốn kết bạn với bạn",
    isRead: false,
  },
  {
    id: "n3",
    icon: "📚",
    title: "Đừng quên ôn tập!",
    body: "Bạn có 12 từ cần ôn lại hôm nay",
    isRead: true,
  },
];

const unreadCount = notifications.filter((n) => !n.isRead).length;

function ClerkNavbar() {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { theme, toggleTheme, toggleSidebar, sidebarOpen } = useUiStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <div className="top-navbar">
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo">🦉</div>
        <span className="navbar-title">XP English</span>
      </Link>

      <button className="navbar-menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <X className="w-[20px] h-[20px]" strokeWidth={1.3} />
        ) : (
          <Menu className="w-[20px] h-[20px]" strokeWidth={1.3} />
        )}
      </button>

      <div className="navbar-actions">
        <div
          className="theme-toggle transition-spring hover:scale-105 active:scale-95"
          onClick={toggleTheme}
          title="Đổi giao diện"
        >
          {theme === "dark" ? (
            <Sun className="w-[18px] h-[18px] text-amber-500" strokeWidth={1.3} />
          ) : (
            <Moon className="w-[18px] h-[18px] text-slate-700" strokeWidth={1.3} />
          )}
        </div>

        <div className="dropdown navbar-notification">
          <button
            className="btn-icon btn-ghost relative transition-spring hover:scale-105 active:scale-95"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.3} />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>
          <div
            className={`dropdown-menu ${notifOpen ? "active" : ""} transition-spring`}
            style={{ right: 0 }}
          >
            <div className="p-3 font-bold text-sm border-bottom flex justify-between items-center">
              <span>Thông báo</span>
              <span className="text-xs text-primary-c cursor-pointer">
                Đánh dấu đã đọc
              </span>
            </div>
            <div
              className="notification-list"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`dropdown-item flex items-start gap-3 ${n.isRead ? "" : "bg-tertiary"}`}
                  style={{ whiteSpace: "normal" }}
                >
                  <span className="text-xl">{n.icon}</span>
                  <div>
                    <div className="font-semibold text-xs">{n.title}</div>
                    <div
                      className="text-xs text-muted"
                      style={{ marginTop: "2px" }}
                    >
                      {n.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dropdown">
          <div
            className="navbar-user transition-spring hover:bg-black/5 dark:hover:bg-white/5 rounded-xl px-2 py-1 cursor-pointer"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
          >
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 text-lg border border-slate-200/50 rounded-full" style={{ overflow: "hidden" }}>
              {clerkUser?.imageUrl ? (
                <img src={clerkUser.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-[16px] h-[16px] text-slate-500" strokeWidth={1.3} />
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
              <User className="w-4 h-4" strokeWidth={1.3} />
              Trang cá nhân
            </Link>
            {clerkUser?.publicMetadata?.role === "admin" && (
              <Link
                href="/admin"
                className="dropdown-item flex items-center gap-2"
                onClick={() => setUserOpen(false)}
              >
                <Shield className="w-4 h-4" strokeWidth={1.3} />
                Quản trị
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item text-error flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.3} />
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
  const { theme, toggleTheme, toggleSidebar, sidebarOpen } = useUiStore();
  const router = useRouter();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    localLogout();
    router.push("/");
  };

  return (
    <div className="top-navbar">
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo">🦉</div>
        <span className="navbar-title">XP English</span>
      </Link>

      <button className="navbar-menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <X className="w-[20px] h-[20px]" strokeWidth={1.3} />
        ) : (
          <Menu className="w-[20px] h-[20px]" strokeWidth={1.3} />
        )}
      </button>

      <div className="navbar-actions">
        <div
          className="theme-toggle transition-spring hover:scale-105 active:scale-95"
          onClick={toggleTheme}
          title="Đổi giao diện"
        >
          {theme === "dark" ? (
            <Sun className="w-[18px] h-[18px] text-amber-500" strokeWidth={1.3} />
          ) : (
            <Moon className="w-[18px] h-[18px] text-slate-700" strokeWidth={1.3} />
          )}
        </div>

        <div className="dropdown navbar-notification">
          <button
            className="btn-icon btn-ghost relative transition-spring hover:scale-105 active:scale-95"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.3} />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>
          <div
            className={`dropdown-menu ${notifOpen ? "active" : ""} transition-spring`}
            style={{ right: 0 }}
          >
            <div className="p-3 font-bold text-sm border-bottom flex justify-between items-center">
              <span>Thông báo</span>
              <span className="text-xs text-primary-c cursor-pointer">
                Đánh dấu đã đọc
              </span>
            </div>
            <div
              className="notification-list"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`dropdown-item flex items-start gap-3 ${n.isRead ? "" : "bg-tertiary"}`}
                  style={{ whiteSpace: "normal" }}
                >
                  <span className="text-xl">{n.icon}</span>
                  <div>
                    <div className="font-semibold text-xs">{n.title}</div>
                    <div
                      className="text-xs text-muted"
                      style={{ marginTop: "2px" }}
                    >
                      {n.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dropdown">
          <div
            className="navbar-user transition-spring hover:bg-black/5 dark:hover:bg-white/5 rounded-xl px-2 py-1 cursor-pointer"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
          >
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 text-lg border border-slate-200/50 rounded-full" style={{ overflow: "hidden" }}>
              {user?.avatarEmoji ? (
                <span className="text-lg">{user.avatarEmoji}</span>
              ) : (
                <User className="w-[16px] h-[16px] text-slate-500" strokeWidth={1.3} />
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
              <User className="w-4 h-4" strokeWidth={1.3} />
              Trang cá nhân
            </Link>
            {user?.email === "vuanhtuanfc@gmail.com" && (
              <Link
                href="/admin"
                className="dropdown-item flex items-center gap-2"
                onClick={() => setUserOpen(false)}
              >
                <Shield className="w-4 h-4" strokeWidth={1.3} />
                Quản trị
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item text-error flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.3} />
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

  if (!mounted) return <div className="top-navbar"></div>;

  return CLERK_ENABLED ? <ClerkNavbar /> : <LocalNavbar />;
}
