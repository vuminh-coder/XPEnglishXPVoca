"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { getXpProgress } from "@/shared/utils/calculateXP";
import { LEVEL_TITLES } from "@/shared/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Flame,
  Trophy,
  User,
  FileText,
  Save,
  Sparkles,
  Share2,
  Coins,
  Shield,
  Zap,
  BookOpen,
  Award,
  Settings,
  Edit3,
  Check,
  ChevronRight,
  BarChart3,
  Swords,
  ShoppingBag,
  PenTool,
  Mic,
  Headphones,
  Crown,
  Heart,
  X,
  ExternalLink,
} from "lucide-react";
import { Button, Badge } from "@/shared/components/ui";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";

export default function ProfilePage() {
  const { user, updateProfile, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [selectedEmoji, setSelectedEmoji] = useState(user?.avatarEmoji || "🦉");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unlocked" | "locked">("all");

  // Equipped cosmetic item states
  const [equippedHat, setEquippedHat] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.username || "");
      setBio(user.bio || "");
      setSelectedEmoji(user.avatarEmoji || "🦉");
    }
  }, [user]);

  // Skill-Specific Activity Minutes Computation from localStorage
  const skillMinutes = useMemo(() => {
    if (!user || typeof window === "undefined") {
      return { dictation: 15, shadowing: 10, speaking: 12, vocab: 25, writing: 18 };
    }

    const readMinutes = (skill: string) => {
      try {
        const key = `xp_voca_daily_minutes_${user.id}_${skill}`;
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          const total = Object.values(parsed).reduce((a: any, b: any) => Number(a) + Number(b), 0);
          return Math.max(Number(total), 0);
        }
      } catch (e) {
        console.error(e);
      }
      return 0;
    };

    return {
      dictation: readMinutes("Dictation") || readMinutes("dictation") || 15,
      shadowing: readMinutes("Shadowing") || readMinutes("shadowing") || 10,
      speaking: readMinutes("Nói") || readMinutes("speaking") || 12,
      vocab: readMinutes("Từ vựng") || readMinutes("vocab") || 25,
      writing: readMinutes("Viết") || readMinutes("writing") || 18,
    };
  }, [user]);

  if (!user) return null;

  const { current: xpCurrent, total: xpTotal, percent: xpPercent } = getXpProgress(
    user.level,
    user.totalXp
  );
  const userTitle = LEVEL_TITLES[user.level] || user.title || "Word Explorer";
  const wordsCount = Number(user?.wordsLearned) || 0;
  const vocabPercent = Math.min(100, Math.round((wordsCount / 3903) * 100)) || 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(fullName, bio, user?.imageUrl || user?.avatarUrl, selectedEmoji);
    setIsEditing(false);
    addToast({
      type: "success",
      title: "Đã cập nhật hồ sơ! 🎉",
      message: "Thông tin cá nhân của bạn đã được lưu thành công.",
      duration: 3000,
    });
  };

  const shareProfile = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `Ghé thăm hồ sơ cá nhân của ${user.fullName || user.username} trên XP English! Cấp độ: ${user.level} (${userTitle})`
      );
      addToast({
        type: "success",
        title: "Đã sao chép liên kết! 🔗",
        message: "Liên kết hồ sơ cá nhân đã được sao chép vào bộ nhớ tạm.",
      });
    }
  };

  const achievements = [
    {
      id: "a1",
      name: "Bước Đầu Vinh Quang",
      description: "Học 10 từ vựng đầu tiên",
      icon: "🎓",
      xpBonus: 50,
      unlocked: true,
      rarity: "Phổ biến",
    },
    {
      id: "a2",
      name: "Ngọn Lửa Bất Diệt",
      description: "Duy trì streak 5 ngày liên tục",
      icon: "🔥",
      xpBonus: 100,
      unlocked: true,
      rarity: "Hiếm",
    },
    {
      id: "a3",
      name: "Chiến Binh Tuần",
      description: "Học 7 ngày liên tiếp không ngắt quãng",
      icon: "⚔️",
      xpBonus: 150,
      unlocked: true,
      rarity: "Hiếm",
    },
    {
      id: "a4",
      name: "Bách Từ Uy Phong",
      description: "Học đạt mốc 100 từ vựng",
      icon: "💯",
      xpBonus: 200,
      unlocked: wordsCount >= 100,
      progress: `${Math.min(100, wordsCount)}/100`,
      rarity: "Huyền thoại",
    },
    {
      id: "a5",
      name: "Kết Nối Bạn Bè",
      description: "Giao lưu và kết bạn với 5 học viên",
      icon: "🦋",
      xpBonus: 75,
      unlocked: false,
      progress: "1/5",
      rarity: "Phổ biến",
    },
    {
      id: "a6",
      name: "Bậc Thầy Quiz",
      description: "Hoàn thành 50 bài trắc nghiệm",
      icon: "🧠",
      xpBonus: 150,
      unlocked: false,
      progress: "12/50",
      rarity: "Huyền thoại",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const filteredAchievements = achievements.filter((ach) => {
    if (activeTab === "unlocked") return ach.unlocked;
    if (activeTab === "locked") return !ach.unlocked;
    return true;
  });

  const availableEmojis = ["🦉", "🦁", "🦊", "👑", "🎓", "🚀", "⚡", "💎"];

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── APP TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shareProfile}
              className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              title="Sao chép liên kết hồ sơ"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Chia sẻ</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-200" />
              <span>{isEditing ? "Đóng cài đặt" : "Chỉnh sửa"}</span>
            </button>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Hồ Sơ Cá Nhân"
            icon={<User className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
            active
          />
          <HeaderPillItem
            label="Cài Đặt Cấu Hình"
            icon={<Settings className="w-4 h-4 text-slate-500" />}
            href="/settings"
          />
          <HeaderPillItem
            label="Thống Kê Kỹ Năng"
            icon={<BarChart3 className="w-4 h-4 text-slate-500" />}
            href="/analytics"
            hideOnSmall
          />
          <HeaderPillItem
            label="Cửa Hàng Vật Phẩm"
            icon={<ShoppingBag className="w-4 h-4 text-slate-500" />}
            href="/shop"
            hideOnMedium
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* 1. HERO SPOTLIGHT BANNER (Stage Card rounded-2xl) */}
        <MotionItem>
          <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-lg shadow-[#0059bb]/15 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Column: Avatar & User Identity */}
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                {/* Avatar with Double-Bezel Concentric Radii */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-400 to-amber-300 p-0.5 shadow-xl">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                      {user.imageUrl || (user as any).avatar || (user as any).avatarUrl ? (
                        <img
                          src={user.imageUrl || (user as any).avatar || (user as any).avatarUrl}
                          alt={user.fullName || user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl sm:text-4xl select-none">{selectedEmoji}</span>
                      )}
                      {equippedHat && (
                        <span className="absolute -top-1 right-0 text-xl filter drop-shadow">🎓</span>
                      )}
                    </div>
                  </div>

                  {/* Level Badge at bottom */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] leading-none px-2 py-1 rounded-lg border-2 border-[#004799] shadow-md whitespace-nowrap flex items-center gap-0.5">
                    <Shield className="w-3 h-3 fill-slate-950 stroke-none" />
                    <span>LV.{user.level}</span>
                  </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white font-display truncate">
                      {formatCleanName(user.fullName || user.username)}
                    </h1>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-sky-200 bg-white/15 px-2.5 py-0.5 rounded-lg border border-white/20">
                      {userTitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-xl truncate">
                    {user.bio || "Học viên xuất sắc tại XP English | XP Voca! 🚀"}
                  </p>
                  <div className="text-[11px] text-blue-200/80 font-mono">
                    ID: {user.id ? `${user.id.slice(0, 8)}...` : "Học viên"} • Gia nhập 2026
                  </div>
                </div>
              </div>

              {/* Right Column: Live Stats Pills & Quick Mobile Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 shadow-inner">
                  <div className="text-center px-1">
                    <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Chuỗi Streak</div>
                    <div className="text-sm sm:text-base font-black text-amber-300 font-mono flex items-center justify-center gap-1 mt-0.5">
                      <Flame className="w-4 h-4 fill-amber-400 stroke-none animate-pulse" />
                      <span>{user.currentStreak || 1} ngày</span>
                    </div>
                  </div>

                  <div className="w-px h-8 bg-white/20" />

                  <div className="text-center px-1">
                    <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Số Dư Vàng</div>
                    <div className="text-sm sm:text-base font-black text-amber-300 font-mono flex items-center justify-center gap-1 mt-0.5">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>{user.coins ?? 100}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile-only share button */}
                <button
                  type="button"
                  onClick={shareProfile}
                  className="sm:hidden w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors shadow-2xs shrink-0"
                  title="Chia sẻ hồ sơ"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* 2. TOP 4 BENTO METRIC STAGE CARDS */}
        <MotionItem>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 1: Words Learned */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Từ Vựng Tích Lũy</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">{wordsCount}</span>
                  <span className="text-xs font-bold text-slate-400 font-sans">/ 3,903 từ</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2.5">
                  <span>Kho từ</span>
                  <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">{vocabPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-500" style={{ width: `${vocabPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Card 2: Streak */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Chuỗi Streak</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 fill-amber-500 stroke-none animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500">{user.currentStreak || 1}</span>
                  <span className="text-xs font-bold text-slate-500 font-sans">ngày</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2.5 flex items-center justify-between">
                  <span>Kỷ lục cao nhất:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{user.longestStreak || user.currentStreak || 1} ngày 🔥</span>
                </div>
              </div>
            </div>

            {/* Card 3: XP & Level */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Kinh Nghiệm (XP)</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">{user.totalXp || 0}</span>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">XP</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2.5">
                  <span>Lên LV.{user.level + 1}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">{xpCurrent}/{xpTotal} XP</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${xpPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Card 4: Gold & Streak Freeze */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Vàng & Bảo Hộ</span>
                <div className="w-8 h-8 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400 border border-yellow-200/60 dark:border-yellow-900/40 flex items-center justify-center shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500">{user.coins ?? 100}</span>
                  <span className="text-xs font-bold text-slate-500 font-sans">Vàng</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2.5 flex items-center justify-between">
                  <span>Bảo hộ Streak:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{user.streakFreezes ?? 0} vật phẩm 🛡️</span>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* 3. STREAMLINED ACCOUNT SETTINGS DRAWER (RULE 6, 18, 19 ALIGNED) */}
        <AnimatePresence>
          {isEditing && (
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                      <Settings className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Cài Đặt Thông Tin Hồ Sơ
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* External Float Label (Rule 6) */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullname-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Họ và tên hiển thị
                      </label>
                      <input
                        id="fullname-input"
                        type="text"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
                        placeholder="Nhập họ và tên..."
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="bio-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-500" /> Tiểu sử ngắn (Bio)
                      </label>
                      <input
                        id="bio-input"
                        type="text"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
                        placeholder="Viết một câu giới thiệu ngắn..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Avatar Emoji Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Chọn Avatar Biểu Tượng Emoji
                    </label>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {availableEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                            selectedEmoji === emoji
                              ? "bg-[#0059bb] text-white shadow-md border-2 border-white dark:border-slate-700 scale-110"
                              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Action Button (Rule 18 & 19) */}
                  <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="h-10 px-4 text-xs font-bold rounded-xl"
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="h-10 px-5 text-xs font-bold rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Lưu thay đổi
                    </Button>
                  </div>
                </form>
              </div>
            </MotionItem>
          )}
        </AnimatePresence>

        {/* 4. BENTO GRID 8/12 & 4/12 MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ─── LEFT COLUMN (8/12): SKILLS + ACHIEVEMENTS + INVENTORY ─── */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            {/* 4.1. 5 SKILL ACTIVITY METERS */}
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        Phân Tích Tiến Độ 5 Kỹ Năng
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Tổng thời gian rèn luyện theo từng kỹ năng học tập
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/analytics"
                    className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>Biểu đồ chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
                  {[
                    { icon: <BookOpen className="w-4 h-4" />, label: "Từ vựng", value: skillMinutes.vocab, color: "bg-blue-500/10 text-[#0059bb] dark:text-sky-400" },
                    { icon: <PenTool className="w-4 h-4" />, label: "Viết chính tả", value: skillMinutes.writing, color: "bg-indigo-500/10 text-indigo-500" },
                    { icon: <Mic className="w-4 h-4" />, label: "Nói AI Tutor", value: skillMinutes.speaking, color: "bg-emerald-500/10 text-emerald-500" },
                    { icon: <Headphones className="w-4 h-4" />, label: "Dictation", value: skillMinutes.dictation, color: "bg-amber-500/10 text-amber-500" },
                    { icon: <Sparkles className="w-4 h-4" />, label: "Shadowing", value: skillMinutes.shadowing, color: "bg-purple-500/10 text-purple-500" },
                  ].map((skill) => (
                    <div
                      key={skill.label}
                      className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-2"
                    >
                      <div className={`w-8 h-8 rounded-xl ${skill.color} mx-auto flex items-center justify-center`}>
                        {skill.icon}
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                        {skill.label}
                      </div>
                      <div className="text-sm font-black font-display text-slate-900 dark:text-white font-mono">
                        {skill.value}m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionItem>

            {/* 4.2. ACHIEVEMENT GALLERY WITH CATEGORY TABS */}
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                      <Award className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        Kho Huy Hiệu Thành Tích ({unlockedCount}/{achievements.length})
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Mở khóa danh hiệu để nhận thêm XP và chứng nhận
                      </p>
                    </div>
                  </div>

                  {/* Category Tab Filters */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab("all")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs font-bold font-display ${
                        activeTab === "all"
                          ? "bg-[#0059bb] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("unlocked")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs font-bold font-display ${
                        activeTab === "unlocked"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      Đã đạt ({unlockedCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("locked")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs font-bold font-display ${
                        activeTab === "locked"
                          ? "bg-slate-800 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      Chưa mở ({achievements.length - unlockedCount})
                    </button>
                  </div>
                </div>

                {/* Achievement Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {filteredAchievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3 ${
                        ach.unlocked
                          ? "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-400"
                          : "bg-slate-50/60 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/50 opacity-75"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs text-xl select-none">
                            {ach.icon}
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-tight">
                              {ach.name}
                            </h3>
                            <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-snug mt-0.5">
                              {ach.description}
                            </p>
                          </div>
                        </div>

                        {ach.unlocked ? (
                          <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shrink-0 font-display">
                            ĐÃ ĐẠT
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shrink-0 font-display">
                            KHÓA
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5 text-[11px] font-mono">
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-300/40">
                          +{ach.xpBonus} XP
                        </span>
                        {ach.progress && !ach.unlocked && (
                          <span className="text-slate-600 dark:text-slate-400 font-semibold">
                            Tiến độ: <span className="text-[#0059bb] dark:text-sky-400 font-black">{ach.progress}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionItem>

            {/* 4.3. EQUIPPED INVENTORY & COSMETIC SHOP SHOWCASE */}
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        Rương Vật Phẩm & Trang Bị
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Quản lý phụ kiện avatar và vật phẩm hỗ trợ học tập
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/shop"
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <span>Vào Cửa Hàng Shop</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* Item 1: Streak Freeze */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/30 dark:to-slate-900 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl shrink-0 border border-amber-200 dark:border-amber-800/60 shadow-2xs">
                        🛡️
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                          Bảo Hộ Chuỗi Học Tập
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          Bảo vệ Streak khi nghỉ 1 ngày
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-mono font-black shadow-xs shrink-0">
                      {user.streakFreezes ?? 0} SẴN CÓ
                    </span>
                  </div>

                  {/* Item 2: Graduation Hat Avatar Cosmetic */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-indigo-50/40 dark:from-purple-950/30 dark:to-slate-900 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl shrink-0 border border-purple-200 dark:border-purple-800/60 shadow-2xs">
                        🎓
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                          Nón Cử Nhân Avatar
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          Phụ kiện vinh danh góc avatar
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEquippedHat(!equippedHat);
                        addToast({
                          type: "info",
                          title: equippedHat ? "Tháo trang phục" : "Trang bị nón cử nhân!",
                          message: equippedHat ? "Đã tháo nón cử nhân trên avatar" : "Avatar của bạn hiện có thêm nón cử nhân cực ngầu",
                        });
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0 ${
                        equippedHat
                          ? "bg-purple-600 text-white border border-purple-700 shadow-md"
                          : "bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-50"
                      }`}
                    >
                      {equippedHat ? "Đang Đeo ✓" : "Trang Bị"}
                    </button>
                  </div>
                </div>
              </div>
            </MotionItem>
          </div>

          {/* ─── RIGHT COLUMN (4/12): LEVEL PROGRESSION & QUICK LINKS ─── */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            {/* 4.4. LEVEL & TITLE PROGRESSION CARD */}
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                      <Crown className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Cấp Độ & Danh Hiệu
                    </h2>
                  </div>
                  <Badge variant="primary" className="font-bold text-[10px] rounded-lg">
                    LV.{user.level}
                  </Badge>
                </div>

                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🦉</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{userTitle}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Danh hiệu hiện tại</div>
                      </div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🚀</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Master Scholar</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Yêu cầu Cấp độ 20</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Khóa</span>
                  </div>
                </div>
              </div>
            </MotionItem>

            {/* 4.5. QUICK DASHBOARD NAVIGATION LINKS */}
            <MotionItem>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-3">
                  Lối Tắt Ứng Dụng
                </h2>

                <div className="space-y-2 text-xs font-bold">
                  <Link
                    href="/analytics"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <BarChart3 className="w-4 h-4 text-[#0059bb] dark:text-sky-400 group-hover:scale-110 transition-transform" />
                      <span>Trang Thống Kê Chi Tiết</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/study/pvp"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Swords className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span>Đấu Trường 1v1 PvP</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/shop"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                      <span>Cửa Hàng Vật Phẩm Shop</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/community/leaderboard"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Trophy className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <span>Bảng Xếp Hạng Đấu Trường</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </MotionItem>
          </div>
        </div>
      </PageEntranceWrapper>
    </div>
  );
}