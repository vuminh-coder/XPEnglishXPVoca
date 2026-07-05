"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Flame,
  Globe,
  PenLine,
  Sparkles,
  Target,
  Trophy,
  Zap,
  Coins,
  Swords,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { Card, Button, Badge } from "@/components/ui";

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

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { challenges, initChallenges } = useDailyChallengeStore();

  useEffect(() => {
    initChallenges();
  }, [initChallenges]);

  // Streak calendar calculation memoized purely based on user streak (no Math.random)
  const streakCalendar = useMemo(() => {
    if (!user) return [];
    const calendar = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      // Simulate streak: recent days are active deterministically
      const isActive = i < user.currentStreak || (i < 14 && i % 3 === 0);
      calendar.push({
        date: d.toISOString().slice(5, 10),
        active: isActive,
      });
    }
    return calendar;
  }, [user]);

  if (!user) return null;

  const vocabPercent = Math.min(
    100,
    Math.round((user.wordsLearned / MOCK_VOCABULARIES.length) * 100)
  );
  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);
  const studyPercent = Math.min(100, Math.round((user.minutesStudied / 15) * 100));
  const completedChallenges = challenges.filter((c) => c.isCompleted).length;
  const remainingWords = Math.max(0, 10 - user.wordsLearned);

  // Weekly XP bar chart mock data (simulated from user's totalXp)
  const weeklyXp = [
    { day: "T2", xp: Math.round(user.totalXp * 0.12) },
    { day: "T3", xp: Math.round(user.totalXp * 0.18) },
    { day: "T4", xp: Math.round(user.totalXp * 0.08) },
    { day: "T5", xp: Math.round(user.totalXp * 0.22) },
    { day: "T6", xp: Math.round(user.totalXp * 0.15) },
    { day: "T7", xp: Math.round(user.totalXp * 0.20) },
    { day: "CN", xp: Math.round(user.totalXp * 0.05) },
  ];
  const maxWeeklyXp = Math.max(...weeklyXp.map((d) => d.xp), 1);

  const quickActions = [
    {
      title: "Luyện tập từ vựng",
      description: "Flashcard, quiz và điền từ",
      href: "/study/practice",
      icon: PenLine,
      accent: "from-cyan-500 to-sky-500",
    },
    {
      title: "Đấu trường PvP",
      description: "So tài từ vựng thời gian thực",
      href: "/study/pvp",
      icon: Swords,
      accent: "from-indigo-500 to-violet-500",
    },
    {
      title: "Khám phá chủ đề",
      description: "Bộ từ theo chủ đề và mức độ",
      href: "/vocabulary",
      icon: Globe,
      accent: "from-amber-500 to-orange-500",
    },
    {
      title: "Cửa hàng vật phẩm",
      description: "Mua bình năng lượng & trang phục",
      href: "/shop",
      icon: Coins,
      accent: "from-yellow-500 to-amber-500",
    },
  ];

  // 7-day streak calendar visualization
  const weekDays = [
    { day: "T2", status: "learned" },
    { day: "T3", status: "learned" },
    { day: "T4", status: "missed" },
    { day: "T5", status: "learned" },
    { day: "T6", status: "learned" },
    { day: "T7", status: "current" },
    { day: "CN", status: "pending" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Trang chủ học tập
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Một ngày học ngắn, rõ mục tiêu và có cảm giác tiến bộ liên tục.
          </p>
        </div>
        <Link href="/profile" className="self-start md:self-auto">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Trophy className="w-4 h-4 text-amber-500" />}
          >
            Bảng thành tích
          </Button>
        </Link>
      </motion.div>

      {/* Staggered Bento Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Cell 1: Welcome Hero & Continue Learning (Hero Card - Spans 2 Columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card
            variant="glass"
            className="flex flex-col justify-between bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-violet-500/10 border-white/40 dark:border-white/5 min-h-[220px] h-full"
          >
            <div>
              <div className="mb-2">
                <Badge
                  variant="primary"
                  className="gap-1 bg-white/40 border-white/60 dark:bg-neutral-900/30 dark:border-white/10"
                >
                  <Sparkles className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  Focus hôm nay
                </Badge>
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                Chào mừng quay lại, {user.fullName}!
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                Bạn còn {remainingWords} từ để chạm mốc 10 từ hôm nay. Bắt đầu bằng một phiên học ngắn 5 phút.
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <Link href="/study/practice" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Tiếp tục học Unit 4
                </Button>
              </Link>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold hidden sm:inline-block">
                Lần học cuối: Hôm qua
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Cell 2: Today's Streak & Weekly Calendar */}
        <motion.div variants={itemVariants}>
          <Card
            variant="bezel"
            className="flex flex-col justify-between bg-amber-500/[0.02] border-amber-500/20 h-full"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Streak liên tục
              </span>
              <Flame className="h-5 w-5 text-amber-500 animate-pulse" />
            </div>
            <div className="text-center my-2">
              <div className="text-3xl font-black text-amber-500 font-display">
                {user.currentStreak} ngày
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">
                Chuỗi ngày học liên tục
              </div>
            </div>
            {/* Weekly Tracker Mini-Grid */}
            <div className="flex justify-between gap-1 mt-3 bg-slate-100/50 dark:bg-neutral-800/50 p-2 rounded-xl border border-black/5 dark:border-white/5">
              {weekDays.map((wd, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400">
                    {wd.day}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                      wd.status === "learned"
                        ? "bg-amber-500 text-white shadow-sm"
                        : wd.status === "current"
                        ? "bg-gradient-premium text-white animate-bounce shadow-md"
                        : wd.status === "missed"
                        ? "bg-rose-100 text-rose-500 dark:bg-rose-950/30 dark:text-rose-400"
                        : "bg-slate-200 text-slate-400 dark:bg-neutral-700 dark:text-neutral-500"
                    }`}
                  >
                    {wd.status === "learned"
                      ? "🔥"
                      : wd.status === "current"
                      ? "⚡"
                      : "•"}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Cell 3: Daily Challenges (Dynamic from store) */}
        <motion.div variants={itemVariants}>
          <Card
            variant="bezel"
            className="flex flex-col justify-between bg-purple-500/[0.02] border-purple-500/20 h-full"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Nhiệm vụ hôm nay
              </span>
              <Target className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-2.5 mt-3">
              {challenges.slice(0, 3).map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span
                      className={`truncate max-w-[140px] ${
                        ch.isCompleted
                          ? "text-emerald-600 dark:text-emerald-400 line-through"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {ch.icon} {ch.title}
                    </span>
                    <span
                      className={
                        ch.isCompleted ? "text-emerald-500" : "text-purple-500"
                      }
                    >
                      {ch.isCompleted ? "✓" : `${ch.progress}/${ch.target}`}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        ch.isCompleted
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-purple-500 to-indigo-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (ch.progress / ch.target) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 text-center">
              Hoàn thành: {completedChallenges}/{challenges.length} · Reset lúc 00:00
            </div>
          </Card>
        </motion.div>

        {/* Cell 4: Stats Card - Words Learned */}
        <motion.div variants={itemVariants}>
          <Card variant="bezel" hoverable className="h-full">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg text-sky-500 bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center">
                <BookOpen className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Từ đã học
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-display">
                {user.wordsLearned}/{MOCK_VOCABULARIES.length}
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  <span>Khám phá bộ từ</span>
                  <span>{vocabPercent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                    style={{ width: `${vocabPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cell 5: Stats Card - XP Experience */}
        <motion.div variants={itemVariants}>
          <Card variant="bezel" hoverable className="h-full">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg text-amber-500 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                <Zap className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Kinh nghiệm
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-display">
                {user.totalXp} XP
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  <span>Cấp độ {user.level}</span>
                  <span>{xpPercent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cell 6: Stats Card - Study Minutes */}
        <motion.div variants={itemVariants}>
          <Card variant="bezel" hoverable className="h-full">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Thời gian học
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-display">
                {user.minutesStudied} phút
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  <span>Mục tiêu 15 phút</span>
                  <span>{studyPercent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    style={{ width: `${studyPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cell 7: Stats Card - Balance Coins */}
        <motion.div variants={itemVariants}>
          <Card variant="bezel" hoverable className="h-full">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg text-violet-500 bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center">
                <Trophy className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Coins hiện có
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display">
                <Coins className="h-5 w-5 text-yellow-500" />
                {user.coins ?? 0}
              </div>
              <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                Streak Freeze: {user.streakFreezes ?? 0} bình sở hữu
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cell 8: Weekly XP Bar Chart (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card variant="bezel" className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Biểu đồ XP tuần qua
                </span>
                <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mt-0.5 font-display">
                  Phân bố kinh nghiệm 7 ngày
                </h3>
              </div>
              <Badge variant="primary">{user.totalXp} XP tổng</Badge>
            </div>
            <div className="flex items-end justify-between gap-2 h-32 pt-2">
              {weeklyXp.map((d, i) => {
                const heightPercent = Math.max(8, (d.xp / maxWeeklyXp) * 100);
                const isToday = i === 5; // Saturday
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-1.5"
                  >
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500">
                      {d.xp}
                    </span>
                    <motion.div
                      whileHover={{ scaleY: 1.05, originY: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`w-full rounded-t-lg transition-all cursor-pointer ${
                        isToday
                          ? "bg-gradient-to-t from-sky-500 to-cyan-400 shadow-sm shadow-sky-500/20"
                          : "bg-slate-200 dark:bg-neutral-800"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span
                      className={`text-[10px] font-bold ${
                        isToday ? "text-sky-600 dark:text-sky-400" : "text-slate-400"
                      }`}
                    >
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Cell 9: Streak Calendar Grid (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card variant="bezel" className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Streak Calendar
                </span>
                <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mt-0.5 font-display">
                  Lịch học 28 ngày gần nhất
                </h3>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Đã học
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-slate-200 dark:bg-neutral-800" />{" "}
                  Bỏ lỡ
                </span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {streakCalendar.map((cell, i) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                    cell.active
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-slate-100 text-slate-400 dark:bg-neutral-800 dark:text-neutral-600"
                  }`}
                  title={cell.date}
                >
                  {cell.date.slice(3)}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Navigation Actions (Spans full width on lg) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-4"
        >
          <Card variant="glass" className="h-full">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Phím tắt nhanh
            </span>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    key={action.title}
                  >
                    <Link
                      href={action.href}
                      className="group block rounded-2xl border border-slate-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3.5 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl bg-gradient-to-br ${action.accent} p-2 text-white`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {action.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                            {action.description}
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-1 shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

