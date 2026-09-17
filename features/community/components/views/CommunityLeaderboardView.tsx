"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Medal,
  Award,
  Trophy,
  Flame,
  Sparkles,
  TrendingUp,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

interface CommunityLeaderboardViewProps {
  user: any;
  awardXp?: (amt: number) => void;
  isFromAnalytics?: boolean;
}

const PERIOD_TABS = [
  { id: "week", label: "Tuần này" },
  { id: "month", label: "Tháng này" },
  { id: "all", label: "Mọi thời đại" },
];

export function CommunityLeaderboardView({
  user,
  isFromAnalytics = false,
}: CommunityLeaderboardViewProps) {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Periodic polling (10s interval) & window focus re-fetch
  const fetchLeaderboardData = useCallback(async () => {
    try {
      const res = await fetch(`/api/leaderboard?period=${period}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLeaders(data.data);
      }
    } catch (err) {
      console.error("Error fetching live leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboardData();
    const interval = setInterval(fetchLeaderboardData, 10000);
    const onFocus = () => fetchLeaderboardData();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchLeaderboardData]);

  // 2. Real-Time Dynamic Client-Side Leaderboard Processor
  const processedLeaders = useMemo(() => {
    const userAvatar = user?.imageUrl || user?.avatar || user?.avatarUrl;
    const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);
    const currentUserXp = Number(user?.totalXp || user?.xp || 0);

    let list = [...leaders];
    let userFound = false;

    list = list.map((l) => {
      const leaderCleanName = formatCleanName(l.fullName || l.username);
      const isCurrentUser = Boolean(
        user &&
          (l.id === user.id ||
            (user.id && l.id && l.id.toString() === user.id.toString()) ||
            (l.fullName && user.fullName && l.fullName.trim().toLowerCase() === user.fullName.trim().toLowerCase()) ||
            (l.username && user.username && l.username.trim().toLowerCase() === user.username.trim().toLowerCase()) ||
            (leaderCleanName && currentUserName && leaderCleanName.toLowerCase() === currentUserName.toLowerCase()))
      );

      if (isCurrentUser) {
        userFound = true;
      }

      return {
        ...l,
        isCurrentUser,
        xp: isCurrentUser ? Math.max(Number(l.xp || 0), currentUserXp) : Number(l.xp || 0),
        avatar: isCurrentUser ? (userAvatar || l.avatar || l.avatarUrl || l.imageUrl) : (l.avatar || l.avatarUrl || l.imageUrl),
        avatarUrl: isCurrentUser ? (userAvatar || l.avatarUrl || l.avatar || l.imageUrl) : (l.avatarUrl || l.avatar || l.imageUrl),
        avatarEmoji: isCurrentUser ? (user?.avatarEmoji || l.avatarEmoji) : l.avatarEmoji,
        fullName: isCurrentUser ? (user?.fullName || user?.username || l.fullName) : l.fullName,
      };
    });

    if (user && !userFound && currentUserXp > 0) {
      list.push({
        id: user.id || "current-user",
        fullName: user.fullName || user.username || "Bạn",
        username: user.username || "user",
        avatar: userAvatar,
        avatarUrl: userAvatar,
        avatarEmoji: user.avatarEmoji || "🦉",
        xp: currentUserXp,
        isCurrentUser: true,
        streak: user.currentStreak || user.streak || 1,
        level: user.level || 1,
      });
    }

    list.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [leaders, user]);

  const top1 = processedLeaders[0];
  const top2 = processedLeaders[1];
  const top3 = processedLeaders[2];

  const currentUserItem = processedLeaders.find((l) => l.isCurrentUser);
  const userRankNum = currentUserItem?.rank || "-";

  const ranksFiltered = useMemo(() => {
    const listAfterTop3 = processedLeaders.slice(3);
    if (!searchQuery.trim()) return listAfterTop3;
    const q = searchQuery.trim().toLowerCase();
    return listAfterTop3.filter((item) => {
      const name = (item.fullName || item.username || "").toLowerCase();
      return name.includes(q);
    });
  }, [processedLeaders, searchQuery]);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Bảng Vinh Danh XP
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono shrink-0">
                Reset: 23:59 Chủ Nhật
              </span>
            </div>

            {/* Mobile-only compact rank badge */}
            <div className="sm:hidden px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-300/30 text-amber-200 flex items-center gap-1.5 text-xs font-black font-display shrink-0">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              {loading ? (
                <span className="w-12 h-3.5 bg-amber-300/30 rounded animate-pulse" />
              ) : (
                <span>Hạng #{userRankNum}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>Đua Top Chiến Binh XP English</span>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              </h1>
              <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                Vinh danh những học viên có chuỗi ngày học bền bỉ và tích lũy XP cao nhất. Tích lũy XP ngay bằng bài học & thi thử!
              </p>
            </div>

            {/* Desktop rank card */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 p-3 rounded-xl bg-white/10 dark:bg-slate-900/60 border border-white/20 backdrop-blur-md shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-blue-100 font-bold block font-display">
                  Vị trí của bạn
                </span>
                <div className="font-extrabold text-sm text-white font-mono flex items-center gap-1.5">
                  {loading ? (
                    <span className="w-16 h-4 bg-white/20 rounded animate-pulse" />
                  ) : (
                    <>
                      <span>Hạng #{userRankNum}</span>
                      <span className="text-xs text-amber-300 font-normal">
                        ({currentUserItem?.xp?.toLocaleString() || 0} XP)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID: 8/12 PODIUM & TABLE + 4/12 SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column (lg:col-span-8): Podium & List */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* LEVEL 2 SUB-TABS: PERIOD SELECTOR */}
          <div className="flex items-center justify-between gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              {PERIOD_TABS.map((tab) => {
                const isActive = period === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPeriod(tab.id)}
                    className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-display ${
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeLeaderboardPeriodIndicator"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-48 sm:w-60 hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm học viên..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0059bb]"
              />
            </div>
          </div>

          {/* TOP 3 CHAMPIONS PODIUM */}
          {loading ? (
            /* EXACT PODIUM SHIMMER SKELETON (ZERO CLS) */
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <ShimmerBox className="h-4 w-44 rounded-md" />
                <ShimmerBox className="h-3 w-28 rounded-md" />
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-3 pb-1">
                {/* Silver */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-between space-y-2.5">
                  <ShimmerBox className="w-16 h-5 rounded-full" />
                  <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                  <ShimmerBox className="w-20 h-4 rounded-md" />
                  <ShimmerBox className="w-full h-7 rounded-lg" />
                </div>
                {/* Gold */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300/60 flex flex-col items-center justify-between space-y-3 relative -top-3">
                  <ShimmerBox className="w-20 h-6 rounded-full bg-amber-200 dark:bg-amber-800" />
                  <ShimmerCircle size="w-12 h-12 sm:w-14 sm:h-14" className="ring-2 ring-amber-300" />
                  <ShimmerBox className="w-24 h-4 rounded-md bg-amber-200 dark:bg-amber-800" />
                  <ShimmerBox className="w-full h-8 rounded-lg bg-amber-400/40" />
                </div>
                {/* Bronze */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-between space-y-2.5">
                  <ShimmerBox className="w-16 h-5 rounded-full" />
                  <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                  <ShimmerBox className="w-20 h-4 rounded-md" />
                  <ShimmerBox className="w-full h-7 rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
                    Bục Vinh Danh Top 3
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#0059bb] dark:text-sky-400">
                  Cập nhật thời gian thực
                </span>
              </div>

              {/* 3 Columns: Silver, Gold, Bronze */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-3 pb-1">
                {/* TOP 2 - BẠC */}
                {top2 && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-center flex flex-col items-center justify-between space-y-2 shadow-2xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold font-mono text-[11px] flex items-center gap-1">
                      <Medal className="w-3.5 h-3.5 text-slate-400" /> #2
                    </span>
                    <UserAvatar
                      avatarUrl={top2.avatarUrl}
                      emoji={top2.avatarEmoji}
                      name={top2.fullName}
                      size="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    <div className="min-w-0 w-full">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
                        {top2.fullName}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        Cấp {top2.level || 1}
                      </span>
                    </div>
                    <div className="w-full py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-black font-mono text-xs">
                      {top2.xp?.toLocaleString()} XP
                    </div>
                  </div>
                )}

                {/* TOP 1 - VÀNG (CENTER & ELEVATED) */}
                {top1 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-600 text-center flex flex-col items-center justify-between space-y-2.5 relative -top-3 shadow-md shadow-amber-500/10">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black font-mono text-xs flex items-center gap-1 shadow-2xs">
                      <Crown className="w-3.5 h-3.5 fill-current" /> #1 Vô địch
                    </span>
                    <div className="relative">
                      <UserAvatar
                        avatarUrl={top1.avatarUrl}
                        emoji={top1.avatarEmoji}
                        name={top1.fullName}
                        size="w-12 h-12 sm:w-14 sm:h-14"
                        className="ring-3 ring-amber-400"
                      />
                      <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: "6s" }} />
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="font-black text-xs sm:text-base text-slate-900 dark:text-white truncate font-display">
                        {top1.fullName}
                      </div>
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold block truncate">
                        Quán Quân
                      </span>
                    </div>
                    <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black font-mono text-xs sm:text-sm shadow-2xs">
                      {top1.xp?.toLocaleString()} XP
                    </div>
                  </div>
                )}

                {/* TOP 3 - ĐỒNG */}
                {top3 && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-amber-900/5 dark:bg-amber-950/30 border border-amber-800/20 text-center flex flex-col items-center justify-between space-y-2 shadow-2xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-800/20 text-amber-800 dark:text-amber-300 font-bold font-mono text-[11px] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> #3
                    </span>
                    <UserAvatar
                      avatarUrl={top3.avatarUrl}
                      emoji={top3.avatarEmoji}
                      name={top3.fullName}
                      size="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    <div className="min-w-0 w-full">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
                        {top3.fullName}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        Cấp {top3.level || 1}
                      </span>
                    </div>
                    <div className="w-full py-1.5 rounded-xl bg-amber-800/15 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-black font-mono text-xs">
                      {top3.xp?.toLocaleString()} XP
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RANKS 4+ DETAILED LIST */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                Danh Sách Xếp Hạng ({ranksFiltered.length})
              </h3>
            </div>

            {loading ? (
              <div className="space-y-2">
                {[4, 5, 6, 7].map((r) => (
                  <div
                    key={r}
                    className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <ShimmerBox className="w-6 h-6 rounded" />
                      <ShimmerCircle size="w-9 h-9" />
                      <div className="space-y-1">
                        <ShimmerBox className="w-32 h-4 rounded" />
                        <ShimmerBox className="w-20 h-3 rounded" />
                      </div>
                    </div>
                    <ShimmerBox className="w-16 h-6 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : ranksFiltered.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 font-medium">
                Không tìm thấy học viên nào phù hợp.
              </div>
            ) : (
              <div className="space-y-2 max-h-[480px] overflow-y-auto no-scrollbar pr-0.5">
                {ranksFiltered.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                      item.isCurrentUser
                        ? "bg-[#0059bb]/10 border-[#0059bb]/40 font-bold shadow-2xs"
                        : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 text-center font-mono font-black text-slate-400 shrink-0 text-xs">
                        #{item.rank}
                      </span>
                      <UserAvatar
                        avatarUrl={item.avatarUrl}
                        emoji={item.avatarEmoji}
                        name={item.fullName}
                        size="w-8 h-8 sm:w-9 sm:h-9"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5">
                          <span>{item.fullName}</span>
                          {item.isCurrentUser && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#0059bb] text-white font-bold">
                              Bạn
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate">
                          Cấp {item.level || 1} · Streak {item.streak || 1} ngày 🔥
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#0059bb] dark:text-sky-400">
                        {item.xp?.toLocaleString()} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          
          {/* Widget 1: Your Current Status */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <UserAvatar
                avatarUrl={user?.imageUrl || user?.avatar || user?.avatarUrl}
                emoji={user?.avatarEmoji || "🦉"}
                name={user?.fullName || "Bạn"}
                size="w-11 h-11"
              />
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
                  {formatCleanName(user?.fullName || user?.username || "Chiến binh XP")}
                </div>
                <span className="text-[11px] text-slate-400">
                  Cấp {user?.level || 1} · {user?.title || "Học viên năng nổ"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-center">
                <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase font-bold block">
                  Hạng tuần
                </span>
                <span className="text-base font-black font-mono text-amber-900 dark:text-amber-200">
                  #{userRankNum}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-center">
                <span className="text-[10px] text-[#0059bb] dark:text-sky-400 uppercase font-bold block">
                  Tổng điểm XP
                </span>
                <span className="text-base font-black font-mono text-[#0059bb] dark:text-sky-300">
                  {currentUserItem?.xp?.toLocaleString() || 0}
                </span>
              </div>
            </div>

            <Link
              href="/study/practice"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs transition-all active:scale-95 shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Luyện Tập Đua Top +15 XP</span>
            </Link>
          </div>

          {/* Widget 2: Weekly Rewards */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 rounded-2xl shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
                Phần Thưởng Top 3 Tuần
              </h4>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
                <span className="font-bold text-amber-600">🥇 Top 1:</span>
                <span className="font-mono font-bold">+500 XP & Huy hiệu Vàng</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
                <span className="font-bold text-slate-500">🥈 Top 2:</span>
                <span className="font-mono font-bold">+300 XP & Huy hiệu Bạc</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
                <span className="font-bold text-amber-800 dark:text-amber-400">🥉 Top 3:</span>
                <span className="font-mono font-bold">+150 XP & Huy hiệu Đồng</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
