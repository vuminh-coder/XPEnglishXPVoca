"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUiStore } from "@/lib/store/uiStore";
import { useAuthStore } from "@/lib/store/authStore";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

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
  const { theme, toggleTheme, toggleSidebar } = useUiStore();
  const router = useRouter();

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
        <span className="icon">☰</span>
      </button>

      <div className="navbar-actions">
        <div
          className="theme-toggle"
          onClick={toggleTheme}
          title="Đổi giao diện"
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
        </div>

        <div className="dropdown navbar-notification">
          <button
            className="btn-icon btn-ghost relative"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
          >
            <span>🔔</span>
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>
          <div
            className={`dropdown-menu ${notifOpen ? "active" : ""}`}
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
            className="navbar-user"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
          >
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 text-lg" style={{ overflow: "hidden" }}>
              {clerkUser?.imageUrl ? (
                <img src={clerkUser.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>👤</span>
              )}
            </div>
            <div className="navbar-user-info hidden-mobile">
              <div className="navbar-user-name">
                {clerkUser?.fullName || "User"}
              </div>
              <div className="navbar-user-level">Học viên</div>
            </div>
          </div>
          <div
            className={`dropdown-menu ${userOpen ? "active" : ""}`}
            style={{ right: 0 }}
          >
            <Link
              href="/profile"
              className="dropdown-item"
              onClick={() => setUserOpen(false)}
            >
              👤 Trang cá nhân
            </Link>
            {clerkUser?.publicMetadata?.role === "admin" && (
              <Link
                href="/admin"
                className="dropdown-item"
                onClick={() => setUserOpen(false)}
              >
                ⚙️ Quản trị
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item text-error cursor-pointer"
              onClick={handleLogout}
            >
              🚪 Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocalNavbar() {
  const { user, logout: localLogout } = useAuthStore();
  const { theme, toggleTheme, toggleSidebar } = useUiStore();
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
        <span className="icon">☰</span>
      </button>

      <div className="navbar-actions">
        <div
          className="theme-toggle"
          onClick={toggleTheme}
          title="Đổi giao diện"
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
        </div>

        <div className="dropdown navbar-notification">
          <button
            className="btn-icon btn-ghost relative"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
          >
            <span>🔔</span>
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>
          <div
            className={`dropdown-menu ${notifOpen ? "active" : ""}`}
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
            className="navbar-user"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
          >
            <div className="avatar avatar-sm flex items-center justify-center bg-slate-100 text-lg" style={{ overflow: "hidden" }}>
              {user?.avatarEmoji ? (
                <span className="text-lg">{user.avatarEmoji}</span>
              ) : (
                <span>👤</span>
              )}
            </div>
            <div className="navbar-user-info hidden-mobile">
              <div className="navbar-user-name">
                {user?.fullName || "User"}
              </div>
              <div className="navbar-user-level">Lvl {user?.level || 1}</div>
            </div>
          </div>
          <div
            className={`dropdown-menu ${userOpen ? "active" : ""}`}
            style={{ right: 0 }}
          >
            <Link
              href="/profile"
              className="dropdown-item"
              onClick={() => setUserOpen(false)}
            >
              👤 Trang cá nhân
            </Link>
            {user?.email === "vuanhtuanfc@gmail.com" && (
              <Link
                href="/admin"
                className="dropdown-item"
                onClick={() => setUserOpen(false)}
              >
                ⚙️ Quản trị
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item text-error cursor-pointer"
              onClick={handleLogout}
            >
              🚪 Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [clerkEnabled, setClerkEnabled] = useState(true);

  useEffect(() => {
    setClerkEnabled(checkIsClerkEnabled());
    setMounted(true);
  }, []);

  if (!mounted) return <div className="top-navbar"></div>;

  return clerkEnabled ? <ClerkNavbar /> : <LocalNavbar />;
}
