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
      dictation: readMinutes("Dictation") || 15,
      shadowing: readMinutes("Shadowing") || 10,
      speaking: readMinutes("Nói") || 12,
      vocab: readMinutes("Từ vựng") || 25,
      writing: readMinutes("Viết") || 18,
    };
  }, [user]);

  if (!user) return null;

  const { current: xpCurrent, total: xpTotal, percent: xpPercent } = getXpProgress(
    user.level,
    user.totalXp
  );
  const userTitle = LEVEL_TITLES[user.level] || user.title || "Word Explorer";
  const vocabPercent = Math.min(100, Math.round((user.wordsLearned / 3903) * 100));

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
      unlocked: user.wordsLearned >= 100,
      progress: `${Math.min(100, user.wordsLearned)}/100`,
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
        className="rounded-lg bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-xs relative overflow-hidden"
      >
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* === MOBILE: Ultra-Compact Layout === */}
        <div className="sm:hidden p-3 relative z-10 space-y-2.5">
          {/* Row 1: Avatar + Info + Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar with level badge */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-tr from-[#0059bb] via-indigo-500 to-amber-400 p-[2px] shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[12px] flex items-center justify-center overflow-hidden">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt={user.fullName || user.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl select-none">{selectedEmoji}</span>
                  )}
                </div>
              </div>
              {equippedHat && <span className="absolute -top-1 -right-0.5 text-sm filter drop-shadow">🎓</span>}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[7px] leading-none px-1.5 py-[3px] rounded-full border-2 border-[#004799] shadow-sm whitespace-nowrap">
                LV.{user.level}
              </div>
            </div>

            {/* Name + Title */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <h1 className="text-[15px] font-black tracking-tight text-white font-display truncate leading-tight">
                {user.fullName || user.username}
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-sky-300/90 uppercase tracking-wider bg-white/10 px-2 py-[2px] rounded-sm border border-white/15">
                  {userTitle}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button type="button" onClick={shareProfile} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 flex items-center justify-center cursor-pointer transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setIsEditing(!isEditing)} className="w-8 h-8 rounded-lg bg-white text-[#0059bb] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-sm transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: Stats Pills — evenly distributed */}
          <div className="flex items-center bg-black/15 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
            <div className="flex-1 flex items-center justify-center gap-1.5 py-2">
              <Flame className="w-3.5 h-3.5 fill-amber-300 stroke-none" />
              <span className="text-xs font-black text-amber-300 font-mono">{user.currentStreak}</span>
              <span className="text-[9px] text-blue-200/80 font-semibold">streak</span>
            </div>
            <div className="w-px h-5 bg-white/15" />
            <div className="flex-1 flex items-center justify-center gap-1.5 py-2">
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-black text-amber-300 font-mono">{user.coins ?? 100}</span>
              <span className="text-[9px] text-blue-200/80 font-semibold">vàng</span>
            </div>
          </div>
        </div>

        {/* === DESKTOP: Full Original Layout === */}
        <div className="hidden sm:block">
          <div className="p-5 pb-0 flex items-center justify-between relative z-10">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 shadow-2xs">
              Hồ sơ học viên cá nhân
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={shareProfile} className="h-8 px-3 text-[11px] font-bold rounded-md bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ hồ sơ</span>
              </button>
              <button type="button" onClick={() => setIsEditing(!isEditing)} className="h-8 px-3 text-[11px] font-bold rounded-md bg-white text-slate-900 hover:bg-slate-100 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <Edit3 className="w-3.5 h-3.5 text-[#0059bb]" />
                <span>{isEditing ? "Đóng cài đặt" : "Chỉnh sửa"}</span>
              </button>
            </div>
          </div>
          <div className="p-5 pt-3 relative z-10">
            <div className="flex flex-row items-end justify-between gap-4">
              <div className="flex flex-row items-end gap-4 text-left min-w-0">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0059bb] via-indigo-500 to-amber-400 p-0.5 shadow-md border-2 border-white/20 bg-slate-900 relative">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.fullName || user.username} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl select-none">{selectedEmoji}</span>
                      )}
                      {equippedHat && (<span className="absolute -top-1 right-0 text-lg filter drop-shadow">🎓</span>)}
                    </div>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-white shadow-xs flex items-center gap-0.5">
                    <Shield className="w-3 h-3 fill-slate-950 stroke-none" />
                    LV.{user.level}
                  </div>
                </div>
                <div className="space-y-1 min-w-0 pb-0.5">
                  <div className="flex flex-row items-baseline gap-2">
                    <h1 className="text-xl font-black tracking-tight text-white font-display truncate">{user.fullName || user.username}</h1>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-200 bg-white/15 px-2.5 py-0.5 rounded border border-white/20 shrink-0">{userTitle}</span>
                  </div>
                  <p className="text-xs text-blue-100/90 font-medium max-w-xl truncate">{user.bio || "Học viên xuất sắc tại XP English | XP Voca! 🚀"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md p-2 rounded-lg border border-white/10 shrink-0">
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

      {/* 2. TOP HIGH-CONTRAST BENTO METRICS (RULE 8 ENHANCED METRICS) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3.5"
      >
        {/* CARD 1: WORDS LEARNED */}
        <motion.div variants={itemVariants}>
          <div className="p-2.5 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-1 sm:space-y-3 h-full">
            <div className="flex items-center justify-between pb-0 sm:pb-2 sm:border-b sm:border-slate-100 sm:dark:border-white/5">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 sm:text-slate-900 sm:dark:text-white font-display truncate">
                <span className="sm:hidden">Từ vựng</span>
                <span className="hidden sm:inline">Từ vựng tích lũy</span>
              </span>
              <div className="hidden sm:flex w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="text-base sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-tight">
                {user.wordsLearned} <span className="hidden sm:inline text-xs font-normal text-slate-400">/ 3,903 từ</span>
              </div>
              <div className="hidden sm:flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1.5">
                <span>Hoàn thành kho từ</span>
                <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">{vocabPercent}%</span>
              </div>
              <div className="hidden sm:block h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-500"
                  style={{ width: `${vocabPercent}%` }}
                />
              </div>
              <div className="sm:hidden text-[10px] font-bold text-[#0059bb] dark:text-sky-400 font-mono mt-1">{vocabPercent}%</div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: STREAK STUDY */}
        <motion.div variants={itemVariants}>
          <div className="p-2.5 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-1 sm:space-y-3 h-full">
            <div className="flex items-center justify-between pb-0 sm:pb-2 sm:border-b sm:border-slate-100 sm:dark:border-white/5">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 sm:text-slate-900 sm:dark:text-white font-display truncate">
                Streak
              </span>
              <div className="hidden sm:flex w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/60 dark:border-amber-900/40 items-center justify-center shrink-0">
                <Flame className="w-3.5 h-3.5 fill-amber-500 stroke-none animate-pulse" />
              </div>
            </div>

            <div>
              <div className="text-base sm:text-2xl font-black font-mono text-amber-500 leading-tight">
                {user.currentStreak} <span className="text-[10px] sm:text-xs font-normal text-slate-500">ngày</span>
              </div>
              <div className="hidden sm:flex text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1.5 items-center justify-between font-mono">
                <span>Kỷ lục cao nhất:</span>
                <span className="font-black text-amber-600 dark:text-amber-400">{user.longestStreak || user.currentStreak} ngày 🔥</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: XP & LEVEL */}
        <motion.div variants={itemVariants}>
          <div className="p-2.5 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-1 sm:space-y-3 h-full">
            <div className="flex items-center justify-between pb-0 sm:pb-2 sm:border-b sm:border-slate-100 sm:dark:border-white/5">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 sm:text-slate-900 sm:dark:text-white font-display truncate">
                XP
              </span>
              <div className="hidden sm:flex w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200/60 dark:border-indigo-900/40 items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="text-base sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-tight">
                {user.totalXp} <span className="text-[10px] sm:text-xs font-normal text-indigo-500 font-sans font-bold">XP</span>
              </div>
              <div className="hidden sm:flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                <span>Lên LV.{user.level + 1}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black">{xpCurrent}/{xpTotal} XP</span>
              </div>
              <div className="hidden sm:block h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="sm:hidden text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono mt-1">LV.{user.level}</div>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: GOLD & STREAK FREEZE */}
        <motion.div variants={itemVariants}>
          <div className="p-2.5 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-1 sm:space-y-3 h-full">
            <div className="flex items-center justify-between pb-0 sm:pb-2 sm:border-b sm:border-slate-100 sm:dark:border-white/5">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 sm:text-slate-900 sm:dark:text-white font-display truncate">
                Vàng
              </span>
              <div className="hidden sm:flex w-7 h-7 rounded-md bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400 border border-yellow-200/60 dark:border-yellow-900/40 items-center justify-center shrink-0">
                <Coins className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="text-base sm:text-2xl font-black font-mono text-amber-500 leading-tight">
                {user.coins ?? 100} <span className="hidden sm:inline text-xs font-normal text-slate-400 font-sans font-bold">Vàng</span>
              </div>
              <div className="hidden sm:flex text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1.5 items-center justify-between font-mono">
                <span>Bảo hộ Streak:</span>
                <span className="font-black text-yellow-600 dark:text-yellow-400">{user.streakFreezes ?? 0} vật phẩm 🛡️</span>
              </div>
              <div className="sm:hidden text-[10px] font-bold text-yellow-600 dark:text-yellow-400 font-mono mt-1">🛡️ {user.streakFreezes ?? 0}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. BENTO GRID 8/12 & 4/12 MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-start">
        
        {/* LEFT 8/12 COLUMN: SKILLS METERS + ACHIEVEMENTS + INVENTORY */}
        <div className="lg:col-span-8 space-y-2.5 sm:space-y-4">
          
          {/* MINI SKILL METERS (SKILL ACTIVITY SUMMARY) */}
          <div className="p-3 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 sm:pb-2.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h2 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  <span className="sm:hidden">5 Kỹ Năng</span>
                  <span className="hidden sm:inline">Phân Tích Tiến Độ 5 Kỹ Năng</span>
                </h2>
              </div>
              <Link
                href="/analytics"
                className="hidden sm:flex text-[10px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline items-center gap-0.5"
              >
                Chi tiết biểu đồ ➔
              </Link>
            </div>

            {/* Mobile: horizontal scroll row / Desktop: 5-col grid */}
            <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-2.5 pt-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
              {[
                { icon: <BookOpen className="w-3 h-3" />, label: "Từ vựng", labelFull: "Từ vựng", value: skillMinutes.vocab, color: "bg-blue-500/10 text-[#0059bb] dark:text-sky-400" },
                { icon: <PenTool className="w-3 h-3" />, label: "Viết", labelFull: "Viết chính tả", value: skillMinutes.writing, color: "bg-indigo-500/10 text-indigo-500" },
                { icon: <Mic className="w-3 h-3" />, label: "Nói", labelFull: "Nói AI Tutor", value: skillMinutes.speaking, color: "bg-emerald-500/10 text-emerald-500" },
                { icon: <Headphones className="w-3 h-3" />, label: "Dictation", labelFull: "Dictation", value: skillMinutes.dictation, color: "bg-amber-500/10 text-amber-500" },
                { icon: <Sparkles className="w-3 h-3" />, label: "Shadow", labelFull: "Shadowing", value: skillMinutes.shadowing, color: "bg-purple-500/10 text-purple-500" },
              ].map((skill) => (
                <div key={skill.label} className="shrink-0 w-[72px] sm:w-auto p-2 sm:p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 text-center space-y-1">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded ${skill.color} mx-auto flex items-center justify-center`}>
                    {skill.icon}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">
                    <span className="sm:hidden">{skill.label}</span>
                    <span className="hidden sm:inline">{skill.labelFull}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-black font-mono text-slate-900 dark:text-white">{skill.value}m</div>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENT BENTO GALLERY WITH TAB FILTERS */}
          <div className="p-3 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 dark:border-white/5 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h2 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  <span className="sm:hidden">Huy Hiệu ({unlockedCount}/{achievements.length})</span>
                  <span className="hidden sm:inline">Kho Huy Hiệu Thành Tích ({unlockedCount}/{achievements.length})</span>
                </h2>
              </div>

              {/* Category Tab Filters per Rule 5 */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-md text-xs font-medium border border-slate-200/60 dark:border-white/5 shrink-0">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-2 sm:px-2.5 py-1 rounded transition-all cursor-pointer text-[10px] sm:text-[11px] font-bold ${
                    activeTab === "all"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setActiveTab("unlocked")}
                  className={`px-2 sm:px-2.5 py-1 rounded transition-all cursor-pointer text-[10px] sm:text-[11px] font-bold ${
                    activeTab === "unlocked"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">Đạt</span>
                  <span className="hidden sm:inline">Đã đạt ({unlockedCount})</span>
                </button>
                <button
                  onClick={() => setActiveTab("locked")}
                  className={`px-2 sm:px-2.5 py-1 rounded transition-all cursor-pointer text-[10px] sm:text-[11px] font-bold ${
                    activeTab === "locked"
                      ? "bg-white dark:bg-slate-900 text-rose-500 dark:text-rose-400 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">Khóa</span>
                  <span className="hidden sm:inline">Chưa mở ({achievements.length - unlockedCount})</span>
                </button>
              </div>
            </div>

            {/* Achievement Bento Cards (Rule 10 Scaled Border-Radius) */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
              {filteredAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-2 sm:p-3.5 rounded-lg border transition-all duration-300 flex flex-col justify-between gap-1.5 sm:gap-2.5 ${
                    ach.unlocked
                      ? `bg-gradient-to-br ${ach.accent} dark:bg-slate-950/60 shadow-2xs`
                      : "bg-slate-50/60 dark:bg-slate-950/30 border-slate-200/60 dark:border-white/5 opacity-65 grayscale"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs text-sm sm:text-lg select-none">
                        {ach.icon}
                      </div>
                      <div>
                        <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display leading-tight">
                          {ach.name}
                        </h3>
                        <p className="hidden sm:block text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-tight mt-0.5">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    {ach.unlocked ? (
                      <Badge variant="success" className="text-[9px] font-bold py-0.2 px-1.5 shrink-0">
                        ĐÃ ĐẠT
                      </Badge>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.2 rounded shrink-0">
                        KHÓA
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center justify-between border-t border-slate-200/40 dark:border-white/5 pt-2 text-[10px] font-mono font-bold">
                    <span className="text-amber-600 dark:text-amber-400">+{ach.xpBonus} XP</span>
                    {ach.progress && !ach.unlocked && (
                      <span className="text-slate-500 dark:text-slate-400">
                        Tiến độ: <span className="text-[#0059bb] dark:text-sky-400 font-black">{ach.progress}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EQUIPPED INVENTORY & COSMETIC SHOP SHOWCASE */}
          <div className="p-3 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Tủ Vật Phẩm & Trang Phục Đã Mua
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Cửa hàng Shop ➔
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1">
              {/* Item 1: Streak Freeze */}
              <div className="p-2 sm:p-3 rounded-md bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-lg">🛡️</span>
                  <Badge variant="warning" className="text-[9px] font-bold py-0.2 px-1.5">
                    {user.streakFreezes ?? 0} có sẵn
                  </Badge>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Bảo Hộ Lửa</div>
                  <div className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">Bảo vệ chuỗi Streak 1 ngày</div>
                </div>
              </div>

              {/* Item 2: Graduate Hat Cosmetic */}
              <div className="p-2 sm:p-3 rounded-md bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/30 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-lg">🎓</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEquippedHat(!equippedHat);
                      addToast({
                        type: "success",
                        title: equippedHat ? "Tháo mũ tốt nghiệp! 🎓" : "Trang bị mũ tốt nghiệp! 🎓",
                        message: equippedHat ? "Đã tháo trang phục mũ tốt nghiệp khỏi Avatar." : "Avatar của bạn hiện đã được đội mũ tốt nghiệp uy phong!",
                      });
                    }}
                    className={`text-[9px] font-bold py-0.5 px-2 rounded transition-all cursor-pointer ${
                      equippedHat
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800"
                    }`}
                  >
                    {equippedHat ? "Đang mặc 🎓" : "Trang bị"}
                  </button>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Cú Tốt Nghiệp</div>
                  <div className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">Nón cử nhân avatar</div>
                </div>
              </div>

              {/* Item 3: Double XP Card */}
              <div className="p-2 sm:p-3 rounded-md bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-lg">⚡</span>
                  <Badge variant="success" className="text-[9px] font-bold py-0.2 px-1.5">
                    1 thẻ 2x
                  </Badge>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Thẻ 2x XP</div>
                  <div className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">Nhân đôi XP trong 30 phút</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT 4/12 COLUMN: LEVEL BREAKDOWN & QUICK LINKS */}
        <div className="lg:col-span-4 space-y-2.5 sm:space-y-4">
          
          {/* LEVEL & TITLE PROGRESSION CARD */}
          <div className="p-3 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 sm:space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Cấp Độ & Danh Hiệu
                </h2>
              </div>
              <Badge variant="primary" className="font-bold text-[9px]">
                LV.{user.level}
              </Badge>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="p-2.5 rounded bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🦉</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{userTitle}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Danh hiệu hiện tại</div>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex items-center justify-between opacity-70">
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
          <div className="p-3 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-white/5 pb-2">
              Lối Tắt Ứng Dụng
            </h2>

            <div className="space-y-1 sm:space-y-1.5 text-xs font-bold">
              <Link
                href="/analytics"
                className="p-2 sm:p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                  <span>Trang Thống Kê Chi Tiết</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/study/pvp"
                className="p-2 sm:p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-amber-500" />
                  <span>Đấu Trường 1v1 PvP</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/shop"
                className="p-2 sm:p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-500" />
                  <span>Cửa Hàng Vật Phẩm Shop</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/community/leaderboard"
                className="p-2 sm:p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all"
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
            className="p-4 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4"
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
                    className="w-full h-10 px-3 text-xs sm:text-sm font-medium rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
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
                    className="w-full h-10 px-3 text-xs sm:text-sm font-medium rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
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
                      className={`w-9 h-9 rounded-md text-lg flex items-center justify-center transition-all cursor-pointer ${
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
                  className="h-9 px-4 text-xs font-bold rounded-md"
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="h-9 px-5 text-xs font-bold rounded-md bg-[#0059bb] hover:bg-[#004799] text-white shadow-2xs flex items-center gap-1.5 cursor-pointer"
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