'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { getXpProgress } from '@/lib/utils/calculateXP';
import { LEVEL_TITLES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Flame, 
  Swords, 
  Trophy, 
  UserPlus, 
  Brain, 
  Lock, 
  CheckCircle2, 
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
  Edit3
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
} as const;

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.username || '');
      setBio(user.bio || '');
    }
  }, [user]);

  if (!user) return null;

  const { current: xpCurrent, total: xpTotal, percent: xpPercent } = getXpProgress(
    user.level,
    user.totalXp,
  );
  const userTitle = LEVEL_TITLES[user.level] || user.title || 'Word Explorer';
  const vocabPercent = Math.min(100, Math.round((user.wordsLearned / 3903) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(fullName, bio);
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Đã cập nhật hồ sơ! 🎉',
      message: 'Thông tin cá nhân của bạn đã được lưu thành công.',
      duration: 3000,
    });
  };

  const shareProfile = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(
        `Ghé thăm trang cá nhân của ${user.fullName || user.username} trên XP English! Cấp độ: ${user.level} (${userTitle})`
      );
      addToast({
        type: 'success',
        title: 'Đã sao chép liên kết! 🔗',
        message: 'Liên kết hồ sơ cá nhân đã được sao chép vào bộ nhớ tạm.',
      });
    }
  };

  const achievements = [
    { 
      id: 'a1', 
      name: 'Bước Đầu', 
      description: 'Học 10 từ vựng đầu tiên', 
      icon: '🎓', 
      xpBonus: 50, 
      unlocked: true,
      rarity: 'Phổ biến',
      accent: 'from-blue-500/10 to-cyan-500/5 text-blue-500 border-blue-200/30'
    },
    { 
      id: 'a2', 
      name: '5 Ngày Liên', 
      description: 'Duy trì streak 5 ngày liên tục', 
      icon: '🔥', 
      xpBonus: 100, 
      unlocked: true,
      rarity: 'Hiếm',
      accent: 'from-orange-500/10 to-amber-500/5 text-amber-500 border-orange-200/30'
    },
    { 
      id: 'a3', 
      name: 'Tuần Chiến', 
      description: 'Học 7 ngày liên tiếp', 
      icon: '⚔️', 
      xpBonus: 150, 
      unlocked: true,
      rarity: 'Hiếm',
      accent: 'from-red-500/10 to-rose-500/5 text-red-500 border-red-200/30'
    },
    { 
      id: 'a4', 
      name: 'Bách Từ', 
      description: 'Học đạt mốc 100 từ vựng', 
      icon: '💯', 
      xpBonus: 200, 
      unlocked: user.wordsLearned >= 100,
      progress: `${Math.min(100, user.wordsLearned)}/100`,
      rarity: 'Huyền thoại',
      accent: 'from-yellow-500/10 to-amber-500/5 text-yellow-500 border-yellow-200/30'
    },
    { 
      id: 'a5', 
      name: 'Xã Hội', 
      description: 'Kết bạn với 5 học viên', 
      icon: '🦋', 
      xpBonus: 75, 
      unlocked: false,
      progress: '1/5',
      rarity: 'Phổ biến',
      accent: 'from-purple-500/10 to-indigo-500/5 text-purple-500 border-purple-200/30'
    },
    { 
      id: 'a6', 
      name: 'Quiz Master', 
      description: 'Hoàn thành 50 bài quiz', 
      icon: '🧠', 
      xpBonus: 150, 
      unlocked: false,
      progress: '12/50',
      rarity: 'Huyền thoại',
      accent: 'from-pink-500/10 to-rose-500/5 text-pink-500 border-pink-200/30'
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const filteredAchievements = achievements.filter((ach) => {
    if (activeTab === 'unlocked') return ach.unlocked;
    if (activeTab === 'locked') return !ach.unlocked;
    return true;
  });

  return (
    <div className="space-y-6 md:space-y-8 pb-24 md:pb-8 relative select-none">
      {/* 1. Hero Gaming Profile Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
        className="bezel overflow-hidden"
      >
        <div className="bezel-inner bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-2xl,1rem)-4px)] overflow-hidden">
          {/* Cover Header Graphic */}
          <div className="h-28 sm:h-36 bg-gradient-to-r from-[#0059bb] via-indigo-600 to-sky-500 relative p-3 sm:p-5 flex justify-between items-start">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            
            {/* Decorative Brand Badge */}
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 relative z-10 shadow-2xs">
              Hồ sơ học viên
            </span>

            {/* Share Button */}
            <button
              type="button"
              onClick={shareProfile}
              className="h-8.5 px-3.5 text-[11px] font-black rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 shadow-2xs flex items-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer relative z-10"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chia sẻ hồ sơ</span>
            </button>
          </div>

          {/* Profile Content Body */}
          <div className="p-4 sm:p-6 pt-0 relative z-10">
            {/* Header Info Block with Avatar & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-4">
              {/* Avatar + Primary User Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3.5 sm:gap-5 text-center sm:text-left min-w-0">
                {/* Avatar Container with Glow & Concentric Ring */}
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#0059bb] via-indigo-600 to-amber-500 p-1 shadow-md border-2 border-white dark:border-neutral-900 bg-white dark:bg-neutral-900">
                    <div className="w-full h-full bg-slate-900 rounded-xl sm:rounded-[20px] flex items-center justify-center overflow-hidden">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.fullName || user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl sm:text-3xl font-black text-white select-none">
                          {user.avatarEmoji && user.avatarEmoji !== "🦉"
                            ? user.avatarEmoji
                            : (user.fullName || user.username || "XP").slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full border-2 border-white dark:border-neutral-900 shadow-md flex items-center gap-0.5">
                    <Shield className="w-3 h-3 fill-slate-950 stroke-none" />
                    LV.{user.level}
                  </div>
                </div>

                {/* Name & Title Badge */}
                <div className="space-y-1 min-w-0 pb-0.5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1.5 sm:gap-2.5">
                    <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display truncate">
                      {user.fullName || user.username}
                    </h1>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-md border border-blue-200/50 dark:border-blue-900/30 shrink-0">
                      {userTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Edit Profile (Desktop position) */}
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="hidden sm:flex h-9 px-4 text-xs font-black rounded-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-neutral-800 shadow-2xs items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shrink-0 self-end"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                {isEditing ? "Đóng cài đặt" : "Chỉnh sửa hồ sơ"}
              </button>
            </div>

            {/* Bio Strip */}
            <div className="text-center sm:text-left pt-3 border-t border-slate-100 dark:border-neutral-850">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto sm:mx-0">
                {user.bio || "Học viên năng nổ tại XP English | XP Voca! 🚀"}
              </p>
            </div>

            {/* Mobile Action Button (Full width at bottom of card on mobile only) */}
            <div className="sm:hidden mt-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full h-9.5 px-4 text-xs font-black rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-neutral-850 text-slate-900 dark:text-white shadow-2xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                {isEditing ? "Đóng cài đặt" : "Chỉnh sửa hồ sơ"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. High-Contrast Bento Stat Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Card 1: Words Learned */}
        <motion.div variants={itemVariants}>
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between border border-sky-500/15 rounded-[calc(var(--radius-2xl,1rem)-4px)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                  Từ vựng đã học
                </span>
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                  {user.wordsLearned} <span className="text-xs font-bold text-slate-400">/ 3,903 từ</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 dark:text-slate-400 mt-2">
                  <span>Tiến độ hoàn thành</span>
                  <span className="text-[#0059bb] dark:text-sky-400 font-black">{vocabPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-500"
                    style={{ width: `${vocabPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Streak Study */}
        <motion.div variants={itemVariants}>
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between border border-amber-500/15 rounded-[calc(var(--radius-2xl,1rem)-4px)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Streak học tập
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-amber-500 stroke-none animate-pulse" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-500 font-display flex items-baseline gap-1">
                  <span>{user.currentStreak}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ngày</span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                  <span>Kỷ lục cao nhất:</span>
                  <span className="font-black text-amber-600 dark:text-amber-400">{user.longestStreak || user.currentStreak} ngày 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: XP & Level Progress */}
        <motion.div variants={itemVariants}>
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between border border-indigo-500/15 rounded-[calc(var(--radius-2xl,1rem)-4px)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Kinh nghiệm (XP)
                </span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                  {user.totalXp} <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">XP</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 dark:text-slate-400 mt-2">
                  <span>Đến LV.{user.level + 1}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">{xpCurrent}/{xpTotal} XP</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Gold & Inventory */}
        <motion.div variants={itemVariants}>
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between border border-yellow-500/15 rounded-[calc(var(--radius-2xl,1rem)-4px)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                  Kho Vàng & Vật phẩm
                </span>
                <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 flex items-center justify-center">
                  <Coins className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-display">
                  {user.coins ?? 0} <span className="text-xs font-bold text-slate-400">Vàng</span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                  <span>Bình bảo hộ Streak:</span>
                  <span className="font-black text-yellow-600 dark:text-yellow-400">{user.streakFreezes ?? 0} vật phẩm 🛡️</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. High-End Achievement Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.1 }}
        className="bezel"
      >
        <div className="bezel-inner p-4 sm:p-6 bg-white dark:bg-neutral-900 space-y-4 rounded-[calc(var(--radius-2xl,1rem)-4px)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-neutral-850 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
              <h2 className="text-sm font-black text-slate-900 dark:text-white font-display">
                Kho Huy hiệu thành tích ({unlockedCount}/{achievements.length})
              </h2>
            </div>

            {/* Category Tab Filters */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-950 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-neutral-850 text-[#0059bb] dark:text-sky-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tất cả ({achievements.length})
              </button>
              <button
                onClick={() => setActiveTab('unlocked')}
                className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'unlocked'
                    ? 'bg-white dark:bg-neutral-850 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Đã đạt ({unlockedCount})
              </button>
              <button
                onClick={() => setActiveTab('locked')}
                className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'locked'
                    ? 'bg-white dark:bg-neutral-850 text-rose-500 dark:text-rose-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Chưa mở ({achievements.length - unlockedCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAchievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-3 ${
                  ach.unlocked
                    ? `bg-gradient-to-br ${ach.accent} dark:bg-neutral-950/60 shadow-xs`
                    : 'bg-slate-50/60 dark:bg-neutral-950/30 border-slate-200/60 dark:border-neutral-800/60 opacity-65 grayscale'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs text-xl select-none">
                      {ach.icon}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {ach.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-tight mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {!ach.unlocked ? (
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-1" strokeWidth={2} />
                  ) : (
                    <Badge variant="success" className="text-[9px] font-black py-0.5 px-2 shrink-0">
                      ĐÃ ĐẠT
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-neutral-800/40 pt-2 text-[10.5px] font-extrabold">
                  <span className="text-amber-600 dark:text-amber-400">+${ach.xpBonus} XP</span>
                  {ach.progress && !ach.unlocked && (
                    <span className="text-slate-500 dark:text-slate-400 font-bold">
                      Tiến độ: <span className="text-[#0059bb] dark:text-sky-400 font-black">{ach.progress}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 4. Streamlined Account Settings Drawer/Section */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bezel overflow-hidden"
          >
            <div className="bezel-inner p-4 sm:p-6 bg-white dark:bg-neutral-900 space-y-4 rounded-[calc(var(--radius-2xl,1rem)-4px)]">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-neutral-850 pb-2">
                <Settings className="w-4.5 h-4.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">
                  Cài đặt hồ sơ cá nhân
                </h3>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* External Float Label (Rule 6) */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullname-input" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Họ và tên người dùng
                    </label>
                    <input
                      id="fullname-input"
                      type="text"
                      className="w-full h-11 px-4 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Nhập họ và tên của bạn..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="bio-input" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" /> Tiểu sử ngắn (Bio)
                    </label>
                    <input
                      id="bio-input"
                      type="text"
                      className="w-full h-11 px-4 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Viết một dòng giới thiệu ngắn gọn..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
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
                    className="h-10 px-5 text-xs font-black rounded-xl bg-gradient-to-r from-[#0059bb] to-blue-600 text-white shadow-md active:scale-[0.98] transition-transform flex items-center gap-1.5 border border-blue-400/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Lưu thay đổi
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}