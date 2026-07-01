"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUiStore } from "@/lib/store/uiStore";

export default function Navbar() {
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { theme, toggleTheme, toggleSidebar } = useUiStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

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

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const navLinks = [
    { name: "Trang chủ", path: "/dashboard", matchPath: "/dashboard" },
    { name: "Khám phá bộ từ", path: "/vocabulary", matchPath: "/vocabulary" },
    { name: "Bộ từ của tôi", path: "/myvocab", matchPath: "/myvocab" },
    { name: "Luyện tập", path: "/study/practice", matchPath: "/study" },
    { name: "Cộng đồng", path: "/community", matchPath: "/community" },
    { name: "Lịch ôn", path: "/review", matchPath: "/review" },
    { name: "Hội thoại AI", path: "/ai/conversation", matchPath: "/ai" },
  ];

  return (
    <div className="top-navbar">
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo">🦉</div>
        <span className="navbar-title">XP English</span>
      </Link>

      <button className="navbar-menu-toggle" onClick={toggleSidebar}>
        <span className="icon">☰</span>
      </button>

      <nav className="navbar-nav">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.matchPath ||
            (link.matchPath !== "/" && pathname.startsWith(link.matchPath));
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

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
            <div className="avatar avatar-sm" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              <div className="navbar-user-level">Lvl 1</div>
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
