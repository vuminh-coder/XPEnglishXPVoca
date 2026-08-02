"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { LEVEL_TITLES } from "@/lib/constants";
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
  Clock,
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
} from "lucide-react";
import { Button, Badge } from "@/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 18,
    },
  },
} as const;

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
      dictation: readMinutes("Dictation") || readMinutes("dictation"),
      shadowing: readMinutes("Shadowing") || readMinutes("shadowing"),
      speaking: readMinutes("Nói") || readMinutes("speaking"),
      vocab: readMinutes("Từ vựng") || readMinutes("vocab"),
      writing: readMinutes("Viết") || readMinutes("writing"),
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
    updateProfile(fullName, bio);
    if (selectedEmoji !== user.avatarEmoji) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, avatarEmoji: selectedEmoji } : null,
      }));
    }
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
      accent: "from-blue-500/10 to-cyan-500/5 text-[#0059bb] dark:text-sky-400 border-blue-200/50 dark:border-blue-900/40",
    },
    {
      id: "a2",
      name: "Ngọn Lửa Bất Diệt",
      description: "Duy trì streak 5 ngày liên tục",
      icon: "🔥",
      xpBonus: 100,
      unlocked: true,
      rarity: "Hiếm",
      accent: "from-amber-500/10 to-orange-500/5 text-amber-500 border-amber-200/50 dark:border-amber-900/40",
    },
    {
      id: "a3",
      name: "Chiến Binh Tuần",
      description: "Học 7 ngày liên tiếp không ngắt quãng",
      icon: "⚔️",
      xpBonus: 150,
      unlocked: true,
      rarity: "Hiếm",
      accent: "from-rose-500/10 to-red-500/5 text-rose-500 border-rose-200/50 dark:border-rose-900/40",
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
      accent: "from-yellow-500/10 to-amber-500/5 text-yellow-600 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-900/40",
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
      accent: "from-purple-500/10 to-indigo-500/5 text-purple-500 border-purple-200/50 dark:border-purple-900/40",
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
      accent: "from-emerald-500/10 to-teal-500/5 text-emerald-500 border-emerald-200/50 dark:border-emerald-900/40",
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
    <div className="space-y-2.5 sm:space-y-5 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      {/* 1. HERO SPOTLIGHT BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-2xs relative overflow-hidden"
      >
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* === MOBILE: Ultra-Compact & High-Contrast Layout === */}
        <div className="sm:hidden p-3.5 relative z-10 space-y-3">
          {/* Row 1: Avatar + Info + Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar with level badge */}
            <div className="relative shrink-0">
              <div className="w-13 h-13 rounded-xs bg-gradient-to-tr from-[#0059bb] via-indigo-500 to-amber-400 p-[2px] shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-xs flex items-center justify-center overflow-hidden">
                  {user.imageUrl || (user as any).avatar || (user as any).avatarUrl ? (
                    <img src={user.imageUrl || (user as any).avatar || (user as any).avatarUrl} alt={user.fullName || user.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl select-none">{selectedEmoji}</span>
                  )}
                </div>
              </div>
              {equippedHat && <span className="absolute -top-1.5 -right-1 text-sm filter drop-shadow">🎓</span>}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[8px] leading-none px-1.5 py-[3px] rounded-xs border border-[#004799] shadow-2xs whitespace-nowrap">
                LV.{user.level}
              </div>
            </div>

            {/* Name + Title + Bio */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <h1 className="text-sm font-black tracking-tight text-white font-display truncate leading-snug">
                {user.fullName || user.username}
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-sky-200 uppercase tracking-wider bg-white/15 px-2 py-[2px] rounded-xs border border-white/20">
                  {userTitle}
                </span>
              </div>
              <p className="text-[10px] text-blue-100/90 font-medium truncate mt-0.5">
                {user.bio || "Học viên xuất sắc tại XP English | XP Voca! 🚀"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={shareProfile}
                className="w-8 h-8 rounded-xs bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                title="Chia sẻ hồ sơ"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-8 h-8 rounded-xs bg-white text-[#0059bb] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-2xs transition-colors"
                title="Chỉnh sửa hồ sơ"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: Stats Pills — evenly distributed */}
          <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xs border border-white/10 p-1.5 overflow-hidden">
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1">
              <Flame className="w-3.5 h-3.5 fill-amber-300 stroke-none" />
              <span className="text-xs font-black text-amber-300 font-display">{user.currentStreak || 0}</span>
              <span className="text-[9px] text-blue-200 font-bold uppercase tracking-wider">streak</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1">
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-black text-amber-300 font-display">{user.coins ?? 100}</span>
              <span className="text-[9px] text-blue-200 font-bold uppercase tracking-wider">vàng</span>
            </div>
          </div>
        </div>

        {/* === DESKTOP: Full Original Layout === */}
        <div className="hidden sm:block">
          <div className="p-5 pb-0 flex items-center justify-between relative z-10">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xs border border-white/20 shadow-2xs">
              Hồ sơ học viên cá nhân
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={shareProfile} className="h-8 px-3 text-[11px] font-bold rounded-xs bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ hồ sơ</span>
              </button>
              <button type="button" onClick={() => setIsEditing(!isEditing)} className="h-8 px-3 text-[11px] font-bold rounded-xs bg-white text-slate-900 hover:bg-slate-100 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <Edit3 className="w-3.5 h-3.5 text-[#0059bb]" />
                <span>{isEditing ? "Đóng cài đặt" : "Chỉnh sửa"}</span>
              </button>
            </div>
          </div>
          <div className="p-5 pt-3 relative z-10">
            <div className="flex flex-row items-end justify-between gap-4">
              <div className="flex flex-row items-end gap-4 text-left min-w-0">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-xs bg-gradient-to-tr from-[#0059bb] via-indigo-500 to-amber-400 p-0.5 shadow-md border-2 border-white/20 bg-slate-900 relative">
                    <div className="w-full h-full bg-slate-900 rounded-xs flex items-center justify-center overflow-hidden relative">
                      {user.imageUrl || (user as any).avatar || (user as any).avatarUrl ? (
                        <img src={user.imageUrl || (user as any).avatar || (user as any).avatarUrl} alt={user.fullName || user.username} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl select-none">{selectedEmoji}</span>
                      )}
                      {equippedHat && (<span className="absolute -top-1 right-0 text-lg filter drop-shadow">🎓</span>)}
                    </div>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-xs border border-white shadow-2xs flex items-center gap-0.5">
                    <Shield className="w-3 h-3 fill-slate-950 stroke-none" />
                    LV.{user.level}
                  </div>
                </div>
                <div className="space-y-1 min-w-0 pb-0.5">
                  <div className="flex flex-row items-baseline gap-2">
                    <h1 className="text-xl font-black tracking-tight text-white font-display truncate">{user.fullName || user.username}</h1>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-200 bg-white/15 px-2.5 py-0.5 rounded-xs border border-white/20 shrink-0">{userTitle}</span>
                  </div>
                  <p className="text-xs text-blue-100/90 font-medium max-w-xl truncate">{user.bio || "Học viên xuất sắc tại XP English | XP Voca! 🚀"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md p-2 rounded-xs border border-white/10 shrink-0">
                <div className="px-2.5 py-1 text-center">
                  <div className="text-[10px] text-blue-200 font-bold uppercase">Streak</div>
                  <div className="text-sm font-black text-amber-300 font-mono flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-300 stroke-none animate-pulse" />
                    {user.currentStreak} ngày
                  </div>
                </div>
                <div className="w-px h-7 bg-white/15" />
                <div className="px-2.5 py-1 text-center">
                  <div className="text-[10px] text-blue-200 font-bold uppercase">Số dư Vàng</div>
                  <div className="text-sm font-black text-amber-300 font-mono flex items-center justify-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    {user.coins ?? 100} 🪙
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. TOP METRICS */}
      {/* === MOBILE: Polished 2x2 grid === */}
      <div className="sm:hidden grid grid-cols-2 gap-1.5">
        <div className="flex items-center gap-2 p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="w-7 h-7 rounded-xs bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-black font-display text-slate-900 dark:text-white leading-none">{wordsCount}<span className="text-[9px] font-bold text-[#0059bb] dark:text-sky-400 ml-1">{vocabPercent}%</span></div>
            <div className="text-[8px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">từ vựng</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="w-7 h-7 rounded-xs bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
            <Flame className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-black font-display text-amber-500 leading-none">{user.currentStreak || 0}<span className="text-[9px] font-bold text-slate-500 ml-1">ngày</span></div>
            <div className="text-[8px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">streak</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="w-7 h-7 rounded-xs bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-black font-display text-slate-900 dark:text-white leading-none">{user.totalXp || 0}<span className="text-[9px] font-bold text-indigo-500 ml-1">XP</span></div>
            <div className="text-[8px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">lv.{user.level}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="w-7 h-7 rounded-xs bg-yellow-50 dark:bg-yellow-950/40 flex items-center justify-center shrink-0">
            <Coins className="w-3.5 h-3.5 text-yellow-600" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-black font-display text-amber-500 leading-none">{user.coins ?? 100}<span className="text-[9px] font-bold text-slate-500 ml-1">vàng</span></div>
            <div className="text-[8px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">🛡️ {user.streakFreezes ?? 0} bảo hộ</div>
          </div>
        </div>
      </div>

      {/* === DESKTOP: Full 4-card grid === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3.5"
      >
        {/* CARD 1: WORDS LEARNED */}
        <motion.div variants={itemVariants}>
          <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 h-full">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Từ Vựng Tích Lũy</span>
              <div className="w-7 h-7 rounded-xs bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">{wordsCount}</span>
                <span className="text-xs font-bold text-slate-400 font-sans">/ 3,903 từ</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
                <span>Hoàn thành kho từ</span>
                <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">{vocabPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
                <div className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-500" style={{ width: `${vocabPercent}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: STREAK */}
        <motion.div variants={itemVariants}>
          <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 h-full">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Chuỗi Streak Học Tập</span>
              <div className="w-7 h-7 rounded-xs bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center shrink-0">
                <Flame className="w-3.5 h-3.5 fill-amber-500 stroke-none animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500">{user.currentStreak || 0}</span>
                <span className="text-xs font-bold text-slate-500 font-sans">ngày</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                <span>Kỷ kỷ cao nhất:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{user.longestStreak || user.currentStreak || 0} ngày 🔥</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: XP */}
        <motion.div variants={itemVariants}>
          <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 h-full">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Kinh Nghiệm (XP)</span>
              <div className="w-7 h-7 rounded-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">{user.totalXp || 0}</span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">XP</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
                <span>Lên LV.{user.level + 1}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">{xpCurrent}/{xpTotal} XP</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${xpPercent}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: GOLD */}
        <motion.div variants={itemVariants}>
          <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 h-full">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display">Vàng & Bảo Hộ</span>
              <div className="w-7 h-7 rounded-xs bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400 border border-yellow-200/60 dark:border-yellow-900/40 flex items-center justify-center shrink-0">
                <Coins className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500">{user.coins ?? 100}</span>
                <span className="text-xs font-bold text-slate-500 font-sans">Vàng</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                <span>Bảo hộ Streak:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{user.streakFreezes ?? 0} vật phẩm 🛡️</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. BENTO GRID 8/12 & 4/12 MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-start">
        
        {/* LEFT 8/12 COLUMN: SKILLS METERS + ACHIEVEMENTS + INVENTORY */}
        <div className="lg:col-span-8 space-y-2.5 sm:space-y-4">
          
          {/* MINI SKILL METERS */}
          {/* === MOBILE: Clean horizontal list === */}
          <div className="sm:hidden rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span className="text-[11px] font-bold text-slate-900 dark:text-white font-display">Tiến độ kỹ năng</span>
              </div>
              <Link href="/analytics" className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400">Xem thêm →</Link>
            </div>
            <div className="space-y-1">
              {[
                { icon: <BookOpen className="w-3 h-3" />, label: "Từ vựng", value: skillMinutes.vocab, color: "text-[#0059bb]", bg: "bg-[#0059bb]" },
                { icon: <PenTool className="w-3 h-3" />, label: "Viết", value: skillMinutes.writing, color: "text-indigo-500", bg: "bg-indigo-500" },
                { icon: <Mic className="w-3 h-3" />, label: "Nói", value: skillMinutes.speaking, color: "text-emerald-500", bg: "bg-emerald-500" },
                { icon: <Headphones className="w-3 h-3" />, label: "Dictation", value: skillMinutes.dictation, color: "text-amber-500", bg: "bg-amber-500" },
                { icon: <Sparkles className="w-3 h-3" />, label: "Shadowing", value: skillMinutes.shadowing, color: "text-purple-500", bg: "bg-purple-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 py-1">
                  <div className={`${s.color} shrink-0`}>{s.icon}</div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 w-16 shrink-0 font-display">{s.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${s.bg} opacity-85`} style={{ width: `${Math.min(s.value * 2, 100)}%` }} />
                  </div>
                  <span className="text-[11px] font-bold font-mono text-slate-900 dark:text-white w-8 text-right shrink-0">{s.value}m</span>
                </div>
              ))}
            </div>
          </div>

          {/* === DESKTOP: Full skill meters section === */}
          <div className="hidden sm:block p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">Phân Tích Tiến Độ 5 Kỹ Năng</h2>
              </div>
              <Link href="/analytics" className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5">
                Chi tiết biểu đồ ➔
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2.5 pt-1">
              {[
                { icon: <BookOpen className="w-3.5 h-3.5" />, label: "Từ vựng", value: skillMinutes.vocab, color: "bg-blue-500/10 text-[#0059bb] dark:text-sky-400" },
                { icon: <PenTool className="w-3.5 h-3.5" />, label: "Viết chính tả", value: skillMinutes.writing, color: "bg-indigo-500/10 text-indigo-500" },
                { icon: <Mic className="w-3.5 h-3.5" />, label: "Nói AI Tutor", value: skillMinutes.speaking, color: "bg-emerald-500/10 text-emerald-500" },
                { icon: <Headphones className="w-3.5 h-3.5" />, label: "Dictation", value: skillMinutes.dictation, color: "bg-amber-500/10 text-amber-500" },
                { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Shadowing", value: skillMinutes.shadowing, color: "bg-purple-500/10 text-purple-500" },
              ].map((skill) => (
                <div key={skill.label} className="p-3 rounded-xs bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 text-center space-y-1.5">
                  <div className={`w-7 h-7 rounded-xs ${skill.color} mx-auto flex items-center justify-center`}>{skill.icon}</div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-display">{skill.label}</div>
                  <div className="text-xs font-black font-display text-slate-900 dark:text-white">{skill.value}m</div>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENT BENTO GALLERY WITH TAB FILTERS */}
          <div className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 dark:border-white/5 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  <span>Kho Huy Hiệu Thành Tích ({unlockedCount}/{achievements.length})</span>
                </h2>
              </div>

              {/* Category Tab Filters with High Contrast Active Styling */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xs border border-slate-200/80 dark:border-white/10 shrink-0">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 rounded-xs transition-all cursor-pointer text-[11px] font-bold font-display ${
                    activeTab === "all"
                      ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setActiveTab("unlocked")}
                  className={`px-3 py-1 rounded-xs transition-all cursor-pointer text-[11px] font-bold font-display ${
                    activeTab === "unlocked"
                      ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Đã đạt ({unlockedCount})
                </button>
                <button
                  onClick={() => setActiveTab("locked")}
                  className={`px-3 py-1 rounded-xs transition-all cursor-pointer text-[11px] font-bold font-display ${
                    activeTab === "locked"
                      ? "bg-slate-800 text-white shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Chưa mở ({achievements.length - unlockedCount})
                </button>
              </div>
            </div>

            {/* Achievement Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {filteredAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-xs border transition-all duration-300 flex flex-col justify-between gap-3 ${
                    ach.unlocked
                      ? `bg-white dark:bg-slate-900 border-slate-200/90 dark:border-white/15 shadow-2xs`
                      : "bg-slate-50/80 dark:bg-slate-950/40 border-slate-200/60 dark:border-white/5 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs text-lg select-none">
                        {ach.icon}
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-tight">
                          {ach.name}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    {ach.unlocked ? (
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shrink-0 font-display">
                        ĐÃ ĐẠT
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shrink-0 font-display">
                        KHÓA
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-300/40">
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

          {/* EQUIPPED INVENTORY & COSMETIC SHOP SHOWCASE */}
          {/* === MOBILE: Clean list rows === */}
          <div className="sm:hidden rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-900 dark:text-white">Vật phẩm</span>
              </div>
              <Link href="/shop" className="text-[9px] font-bold text-amber-600 dark:text-amber-400">Shop →</Link>
            </div>
            <div className="space-y-1">
              {/* Item 1 */}
              <div className="flex items-center gap-2.5 p-2 rounded-xs bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/20">
                <span className="text-base">🛡️</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">Bảo Hộ Lửa</div>
                  <div className="text-[9px] text-slate-400">Bảo vệ Streak 1 ngày</div>
                </div>
                <span className="w-14 text-center text-[8px] font-bold py-1 px-1 rounded-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 shrink-0">{user.streakFreezes ?? 0} sẵn</span>
              </div>
              {/* Item 2 */}
              <div className="flex items-center gap-2.5 p-2 rounded-xs bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/40 dark:border-purple-900/20">
                <span className="text-base">🎓</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">Cú Tốt Nghiệp</div>
                  <div className="text-[9px] text-slate-400">Nón cử nhân avatar</div>
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
                  className={`w-14 text-center text-[8px] font-bold py-1 px-1 rounded-xs cursor-pointer border shrink-0 transition-colors ${
                    equippedHat
                      ? "bg-purple-600 text-white border-purple-700 shadow-2xs"
                      : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40 hover:bg-purple-200"
                  }`}
                >
                  {equippedHat ? "Đang đeo" : "Trang bị"}
                </button>
              </div>
            </div>
          </div>

          {/* === DESKTOP: Full inventory bento grid === */}
          <div className="hidden sm:block p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">Rương Vật Phẩm & Trang Bị Đã Mua</h2>
              </div>
              <Link href="/shop" className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5">
                Cửa hàng Shop ➔
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Item 1: Streak Freeze */}
              <div className="p-3 rounded-xs bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/30 dark:to-slate-900 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0 border border-amber-200 dark:border-amber-800/60">
                    🛡️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Bảo Hộ Chuỗi Học Tập</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Bảo vệ Streak khi nghỉ 1 ngày</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-xs bg-amber-500 text-slate-950 text-[10px] font-mono font-black shadow-2xs">
                    {user.streakFreezes ?? 0} SẴN CÓ
                  </span>
                </div>
              </div>

              {/* Item 2: Graduation Hat Avatar Cosmetic */}
              <div className="p-3 rounded-xs bg-gradient-to-br from-purple-50/80 to-indigo-50/40 dark:from-purple-950/30 dark:to-slate-900 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0 border border-purple-200 dark:border-purple-800/60">
                    🎓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Nón Cử Nhân Avatar</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Hiệu ứng trang trí góc avatar</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
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
                    className={`px-3 py-1 rounded-xs text-[10px] font-bold cursor-pointer transition-all ${
                      equippedHat
                        ? "bg-purple-600 text-white shadow-2xs border border-purple-700"
                        : "bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {equippedHat ? "Đang Trang Bị ✓" : "Trang Bị Ngay"}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT 4/12 COLUMN: LEVEL BREAKDOWN & QUICK LINKS */}
        <div className="lg:col-span-4 space-y-2.5 sm:space-y-4">
          
          {/* LEVEL & TITLE PROGRESSION CARD */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Cấp Độ & Danh Hiệu
                </h2>
              </div>
              <Badge variant="primary" className="font-bold text-[9px] rounded-xs">
                LV.{user.level}
              </Badge>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="p-2.5 rounded-xs bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🦉</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{userTitle}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Danh hiệu hiện tại</div>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              </div>

              <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚀</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Master Scholar</div>
                    <div className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400">Yêu cầu Cấp độ 20</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Khóa</span>
              </div>
            </div>
          </div>

          {/* QUICK DASHBOARD NAVIGATION LINKS */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5 sm:space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-white/5 pb-2">
              Lối Tắt Ứng Dụng
            </h2>

            <div className="space-y-1 sm:space-y-1.5 text-xs font-bold">
              <Link
                href="/analytics"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                  <span>Trang Thống Kê Chi Tiết</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/study/pvp"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-amber-500" />
                  <span>Đấu Trường 1v1 PvP</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/shop"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-500" />
                  <span>Cửa Hàng Vật Phẩm Shop</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/community/leaderboard"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <span>Bảng Xếp Hạng Đấu Trường</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* 4. STREAMLINED ACCOUNT SETTINGS DRAWER (RULE 6, 18, 19 ALIGNED) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Cài Đặt Thông Tin Hồ Sơ
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Đóng ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* External Float Label (Rule 6) */}
                <div className="space-y-1.5">
                  <label htmlFor="fullname-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Họ và tên người dùng
                  </label>
                  <input
                    id="fullname-input"
                    type="text"
                    className="w-full h-10 px-3 text-xs sm:text-sm font-medium rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
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
                    className="w-full h-10 px-3 text-xs sm:text-sm font-medium rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
                    placeholder="Viết một câu giới thiệu ngắn..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              {/* Avatar Emoji Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Chọn Avatar Biểu Tượng Emoji
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {availableEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xs text-lg flex items-center justify-center transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? "bg-[#0059bb] text-white shadow-2xs border-2 border-white scale-110"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Action Button (Rule 18 & 19) */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-9 px-4 text-xs font-bold rounded-xs"
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="h-9 px-5 text-xs font-bold rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Lưu thay đổi
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}