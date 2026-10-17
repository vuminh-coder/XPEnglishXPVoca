"use client";

import React from "react";
import { Shield, Flame, Coins, Share2, Edit3 } from "lucide-react";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";

interface ProfileHeroCardProps {
  user: any;
  selectedEmoji: string;
  equippedHat: boolean;
  userTitle: string;
  onShare: () => void;
  isEditing?: boolean;
  onToggleEdit?: () => void;
}

export const ProfileHeroCard: React.FC<ProfileHeroCardProps> = ({
  user,
  selectedEmoji,
  equippedHat,
  userTitle,
  onShare,
  isEditing = false,
  onToggleEdit,
}) => {
  const cleanName = formatCleanName(user.fullName || user.username);
  const avatarSrc = user.imageUrl || user.avatar || user.avatarUrl;

  return (
    <div className="p-3.5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-md shadow-[#0059bb]/15 relative overflow-hidden">
      {/* Subtle Ambient Radial Orbs */}
      <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-5">
        {/* Left Column: Avatar & User Identity */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          {/* Circular Avatar with Concentric Gradient Ring & Ambient Halo */}
          <div className="relative shrink-0 group">
            {/* Ambient Aura Glow behind circular avatar */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-amber-300 blur-md opacity-35 group-hover:opacity-70 transition-opacity pointer-events-none" />

            {/* Gradient Concentric Ring */}
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-amber-300 p-[2.5px] sm:p-[3px] shadow-xl ring-2 sm:ring-4 ring-white/20 dark:ring-white/10 transition-transform duration-300 group-hover:scale-105">
              {/* Inner Circular Frame */}
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden relative shadow-inner border border-white/20">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={cleanName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full select-none transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-2xl sm:text-4xl select-none leading-none transform transition-transform duration-300 group-hover:scale-110">
                    {selectedEmoji}
                  </span>
                )}
              </div>
            </div>

            {/* Cosmetic Graduation Hat Overlay */}
            {equippedHat && (
              <span
                className="absolute -top-2 -right-1 text-xl sm:text-2xl filter drop-shadow-lg -rotate-12 select-none pointer-events-none z-20 transition-transform hover:rotate-0"
                title="Nón Cử Nhân Danh Dự"
              >
                🎓
              </span>
            )}

            {/* Level Badge Pill seamlessly anchored at circular base */}
            <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[9px] sm:text-[10px] leading-none px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border-2 border-[#002b5b] shadow-lg whitespace-nowrap flex items-center gap-0.5 sm:gap-1 font-mono z-20">
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white stroke-none drop-shadow-xs" />
              <span className="drop-shadow-xs tracking-wider">LV.{user.level || 1}</span>
            </div>
          </div>

          {/* Identity Info */}
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-base sm:text-2xl font-black tracking-tight text-white font-display truncate">
                {cleanName}
              </h1>
              <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-sky-200 bg-white/15 px-2 py-0.5 rounded-lg border border-white/20 font-display">
                {userTitle}
              </span>
            </div>
            <p className="text-[11px] sm:text-sm text-blue-100/90 font-medium max-w-xl truncate">
              {user.bio || "Học viên xuất sắc tại XP English | XP Voca! 🚀"}
            </p>
            <div className="hidden sm:block text-[11px] text-blue-200/80 font-mono">
              ID: {user.id ? `${user.id.slice(0, 8)}...` : "Học viên"} • Thành viên 2026
            </div>
          </div>
        </div>

        {/* Right Column: Live Stats Pills (Desktop/Tablet) & Quick Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Desktop/Tablet Stats Pill (Hidden on mobile to eliminate duplication with 4 Bento cards below) */}
          <div className="hidden sm:flex items-center gap-3 bg-black/25 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 shadow-inner">
            <div className="text-center px-1">
              <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider font-display">
                Chuỗi Streak
              </div>
              <div className="text-sm sm:text-base font-black text-amber-300 font-mono flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 fill-amber-400 stroke-none animate-pulse" />
                <span>{user.currentStreak || 1} ngày</span>
              </div>
            </div>

            <div className="w-px h-7 bg-white/20" />

            <div className="text-center px-1">
              <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider font-display">
                Số Dư Vàng
              </div>
              <div className="text-sm sm:text-base font-black text-amber-300 font-mono flex items-center justify-center gap-1 mt-0.5">
                <Coins className="w-4 h-4 text-amber-400 stroke-[2.2]" />
                <span>{user.coins ?? 100}</span>
              </div>
            </div>
          </div>

          {/* Mobile-only action buttons (Edit profile & Share) */}
          <div className="flex sm:hidden items-center gap-1.5">
            {onToggleEdit && (
              <button
                type="button"
                onClick={onToggleEdit}
                className="h-7 px-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold border border-white/25 flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs font-display"
                title="Chỉnh sửa thông tin hồ sơ"
              >
                <Edit3 className="w-3 h-3 text-sky-200 stroke-[2.2]" />
                <span>{isEditing ? "Đóng" : "Sửa hồ sơ"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onShare}
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors shadow-2xs shrink-0"
              title="Chia sẻ hồ sơ"
            >
              <Share2 className="w-3 h-3 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
