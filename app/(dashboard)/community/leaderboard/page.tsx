'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { useAuthStore } from '@/stores/authStore';
import { 
  Crown, 
  Medal, 
  Award, 
  Trophy, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft,
  Users, 
  UserPlus, 
  MessageSquare,
  Zap,
  Target,
  PenSquare,
} from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { UserAvatar, formatCleanName } from '@/shared/components/feedback/UserAvatar';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from '@/shared/components/layout/AppTopHeader';

export default function LeaderboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFromAnalytics, setIsFromAnalytics] = useState(false);

  useEffect(() => {
    const fromParam = searchParams.get('from') === 'analytics';
    const referrerCheck = typeof document !== 'undefined' && document.referrer.includes('/analytics');
    if (fromParam || referrerCheck) {
      setIsFromAnalytics(true);
    }
  }, [searchParams]);

  // 1. Automatic periodic polling (10s interval) & window focus re-fetch for 24/7 live rankings
  const fetchLeaderboardData = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard?t=" + Date.now());
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLeaders(data.data);
      }
    } catch (err) {
      console.error("Error fetching live leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboardData();
    const interval = setInterval(fetchLeaderboardData, 10000);
    const onFocus = () => fetchLeaderboardData();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchLeaderboardData]);

  // 2. Real-Time Dynamic Client-Side Leaderboard Processor
  const processedLeaders = useMemo(() => {
    const userAvatar = user?.imageUrl || (user as any)?.avatar || (user as any)?.avatarUrl;
    const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);
    const currentUserXp = Number(user?.totalXp || (user as any)?.xp || 0);

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
        id: user.id || 'current-user',
        fullName: user.fullName || user.username || 'Bạn',
        username: user.username || 'user',
        avatar: userAvatar,
        avatarUrl: userAvatar,
        avatarEmoji: user.avatarEmoji || '🦉',
        xp: currentUserXp,
        isCurrentUser: true,
      });
    }

    list.sort((a, b) => b.xp - a.xp);

    return list.map((l, index) => ({
      ...l,
      rank: index + 1,
    }));
  }, [leaders, user]);

  const top1 = processedLeaders.find(l => l.rank === 1) || processedLeaders[0];
  const top2 = processedLeaders.find(l => l.rank === 2) || processedLeaders[1];
  const top3 = processedLeaders.find(l => l.rank === 3) || processedLeaders[2];
  const otherLeaders = processedLeaders.filter(l => l.rank > 3);

  const currentUserLeader = processedLeaders.find(l => l.isCurrentUser || l.fullName === user?.fullName || l.username === user?.username);
  const userRankNum = currentUserLeader ? currentUserLeader.rank : 4;
  const userXp = user?.totalXp || (user as any)?.xp || (currentUserLeader ? currentUserLeader.xp : 10);
  const nextRankTargetXp = top3 ? top3.xp + 25 : 100;
  const xpNeeded = Math.max(0, nextRankTargetXp - userXp);

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Luyện Tập +15 XP</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/community"
            active={false}
            icon={<MessageSquare className="w-3.5 h-3.5 text-blue-500" />}
            label="Bảng Tin"
          />
          <HeaderPillItem
            active={true}
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp Hạng"
          />
          <HeaderPillItem
            href="/community/friends"
            active={false}
            icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
            label="Bạn Bè"
          />
          <HeaderPillItem
            href="/community/groups"
            active={false}
            icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
            label="Nhóm Học"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* NAVIGATION BACK BUTTON (ONLY SHOWN WHEN NAVIGATING FROM ANALYTICS) */}
        {isFromAnalytics && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs cursor-pointer font-display"
            >
              <ArrowLeft className="w-4 h-4 text-[#0059bb]" />
              <span>Quay lại trang Thống kê</span>
            </button>

            <Link
              href="/analytics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0059bb] hover:underline font-display"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Xem Thống kê của tôi</span>
            </Link>
          </div>
        )}

        {/* HERO SPOTLIGHT BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Bảng Xếp Hạng Tuần
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono shrink-0">
                  Reset: 23:59 Chủ Nhật
                </span>
              </div>

              {/* Mobile-only compact rank badge */}
              <div className="sm:hidden px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-300/30 text-amber-200 flex items-center gap-1.5 text-xs font-black font-display shrink-0">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>Hạng #{userRankNum}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="space-y-1 max-w-2xl">
                <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                  <span>Đua Top Chiến Binh XP English</span>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
                </h1>
                <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                  Vinh danh những học viên có chuỗi ngày học bền bỉ và tích lũy XP cao nhất trong tuần. Tích lũy XP ngay bằng bài học & thi thử!
                </p>
              </div>

              {/* Desktop rank card */}
              <div className="hidden sm:flex items-center gap-3 shrink-0 p-3.5 rounded-xl bg-white/10 dark:bg-slate-900/60 border border-white/20 backdrop-blur-md shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 font-display">Thứ hạng bạn</div>
                  <div className="text-sm font-black font-display text-white font-mono">#{userRankNum} Tuần</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BENTO GRID LAYOUT (PODIUM & LIST ~66% + SIDEBAR ~34%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">

          {/* LEFT COLUMN: PODIUM & RANKING STREAM (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {loading ? (
              /* SKELETON LOADING STATE */
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6 animate-pulse">
                <div className="w-48 h-5 bg-slate-200 dark:bg-slate-800 rounded-md mx-auto" />
                <div className="flex items-end justify-center gap-4 h-52 pt-4">
                  <div className="w-28 h-36 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
                  <div className="w-32 h-44 bg-amber-500/10 rounded-xl" />
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* 🏆 TOP 3 BENTO CHAMPIONS PODIUM */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-2 font-display">
                      <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" /> Bảng Vinh Danh Quán Quân Tuần
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">Cập nhật thời gian thực</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-2 pb-1">
                    
                    {/* RANK 2 - SILVER PODIUM */}
                    {top2 && (
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-100/90 to-slate-50/50 dark:from-slate-800/90 dark:to-slate-900/60 border border-slate-300/80 dark:border-slate-700 text-center flex flex-col items-center justify-between space-y-2 relative shadow-2xs hover:shadow-sm transition-all">
                        <div className="px-2.5 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-mono font-black text-[10px] sm:text-xs flex items-center gap-1 shadow-2xs">
                          <Medal className="w-3 h-3 text-slate-500 dark:text-slate-300 fill-slate-300 shrink-0" /> #2 Á Quân
                        </div>

                        <UserAvatar
                          avatarUrl={top2.avatarUrl || top2.avatar || top2.imageUrl}
                          emoji={top2.avatarEmoji}
                          name={top2.fullName || top2.username}
                          size="w-10 h-10 sm:w-12 sm:h-12"
                        />

                        <div className="w-full flex flex-col items-center">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-display w-full">
                            {formatCleanName(top2.fullName || top2.username)}
                          </div>
                          <div className="w-full mt-1 py-1 rounded-lg bg-slate-700 dark:bg-slate-800 text-white font-mono font-black text-[11px] sm:text-xs shadow-2xs text-center truncate">
                            {top2.xp} XP
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RANK 1 - GOLD PODIUM (CENTER - HIGHEST) */}
                    {top1 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-100/80 via-amber-50/40 to-white dark:from-amber-950/60 dark:via-slate-900/80 dark:to-slate-900 border-2 border-amber-400 text-center flex flex-col items-center justify-between space-y-2.5 relative -top-3 z-10 shadow-md shadow-amber-500/10 hover:shadow-lg transition-all">
                        <div className="px-3 py-0.5 rounded-lg bg-amber-400 text-amber-950 font-mono font-black text-xs flex items-center gap-1 shadow-xs">
                          <Crown className="w-3.5 h-3.5 text-amber-900 fill-amber-700 shrink-0" /> #1 Quán Quân
                        </div>

                        <UserAvatar
                          avatarUrl={top1.avatarUrl || top1.avatar || top1.imageUrl}
                          emoji={top1.avatarEmoji}
                          name={top1.fullName || top1.username}
                          size="w-12 h-12 sm:w-14 sm:h-14"
                        />

                        <div className="w-full flex flex-col items-center">
                          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate font-display w-full">
                            {formatCleanName(top1.fullName || top1.username)}
                          </div>
                          <div className="w-full mt-1.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-mono font-black text-xs shadow-xs text-center truncate">
                            {top1.xp} XP
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RANK 3 - BRONZE PODIUM */}
                    {top3 && (
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-amber-900/10 via-amber-800/5 to-white dark:from-amber-950/40 dark:to-slate-900/60 border border-amber-700/40 text-center flex flex-col items-center justify-between space-y-2 relative shadow-2xs hover:shadow-sm transition-all">
                        <div className="px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-mono font-black text-[10px] sm:text-xs flex items-center gap-1 shadow-2xs">
                          <Award className="w-3 h-3 text-amber-700 dark:text-amber-400 fill-amber-600 shrink-0" /> #3 Hạng Ba
                        </div>

                        <UserAvatar
                          avatarUrl={top3.avatarUrl || top3.avatar || top3.imageUrl}
                          emoji={top3.avatarEmoji}
                          name={top3.fullName || top3.username}
                          size="w-10 h-10 sm:w-12 sm:h-12"
                        />

                        <div className="w-full flex flex-col items-center">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-display w-full">
                            {formatCleanName(top3.fullName || top3.username)}
                          </div>
                          <div className="w-full mt-1 py-1 rounded-lg bg-amber-800 text-amber-100 font-mono font-black text-[11px] sm:text-xs shadow-2xs text-center truncate">
                            {top3.xp} XP
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* 📋 DETAILED LEADERBOARD STREAM (RANKS 4+) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 font-display">
                    <TrendingUp className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Danh Sách Học Viên Bứt Phá:
                  </h3>

                  <div className="space-y-2">
                    {otherLeaders.map((l) => {
                      const cleanName = formatCleanName(l.fullName || l.username);
                      const isCurrentUser = l.fullName === user?.fullName || l.username === user?.username || cleanName === formatCleanName(user?.fullName);

                      return (
                        <div
                          key={l.id}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                            isCurrentUser
                              ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
                              : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Rank Badge */}
                            <div className="w-7 h-7 rounded-lg bg-slate-200/90 dark:bg-slate-700 flex items-center justify-center text-xs font-black text-slate-700 dark:text-slate-200 shrink-0 font-mono">
                              #{l.rank}
                            </div>

                            {/* Avatar */}
                            <UserAvatar
                              avatar={l.avatar}
                              avatarUrl={l.avatarUrl}
                              imageUrl={l.imageUrl}
                              emoji={l.avatarEmoji}
                              name={cleanName}
                              size="w-8 h-8 sm:w-9 sm:h-9"
                            />

                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5">
                                <span>{cleanName}</span>
                                {isCurrentUser && (
                                  <span className="px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase bg-[#0059bb] text-white">
                                    Bạn
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium">
                                Level {l.level || 3} · {l.title || "Chiến Binh"}
                              </div>
                            </div>
                          </div>

                          <div className="font-mono font-black text-xs sm:text-sm text-[#0059bb] dark:text-sky-400 shrink-0">
                            {l.xp} XP
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* RIGHT COLUMN: SIDEBAR INSPECTOR WIDGETS (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 sticky top-4">
            
            {/* BENTO WIDGET 1: YOUR CURRENT RANK & XP STATUS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <UserAvatar
                  avatar={(user as any)?.avatar || (user as any)?.avatarUrl || user?.imageUrl}
                  emoji={user?.avatarEmoji}
                  name={user?.fullName || user?.username}
                  size="w-10 h-10"
                />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    Vị Trí Của Bạn
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
                    {formatCleanName(user?.fullName || user?.username)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-display">Hạng tuần:</div>
                  <div className="text-base sm:text-lg font-black text-[#0059bb] dark:text-sky-400 font-mono">
                    #{userRankNum}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-display">Điểm XP:</div>
                  <div className="text-base sm:text-lg font-black text-amber-500 font-mono">
                    {userXp} XP
                  </div>
                </div>
              </div>

              {/* Target Progress Bar to Next Rank */}
              <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold font-mono">
                  <span className="text-slate-500">Tiến độ bứt phá</span>
                  <span className="text-[#0059bb] dark:text-sky-400">Cần +{xpNeeded} XP</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0059bb] rounded-full transition-all" style={{ width: `${Math.min(100, (userXp / nextRankTargetXp) * 100)}%` }} />
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium leading-relaxed">
                💡 Học thêm <span className="font-bold text-[#0059bb] dark:text-sky-400">1 bài thi thử AI</span> để nhận ngay +15 XP bứt phá thứ hạng!
              </p>
            </div>

            {/* BENTO WIDGET 2: QUICK ACTION TO EARN XP */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 text-xs font-bold text-slate-900 dark:text-white font-display">
                <Zap className="w-4 h-4 text-amber-500" /> Nhiệm Vụ Tích Lũy XP Nhanh
              </div>

              <div className="space-y-2">
                <Link
                  href="/study/grammar"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 text-xs font-bold transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2 font-display">
                    <Target className="w-4 h-4 text-[#0059bb] group-hover:text-white" />
                    <span>Thi thử trắc nghiệm AI</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/10 group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded-md font-mono">
                    +15 XP
                  </span>
                </Link>

                <Link
                  href="/community"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 text-xs font-bold transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2 font-display">
                    <MessageSquare className="w-4 h-4 text-[#0059bb] group-hover:text-white" />
                    <span>Chia sẻ kinh nghiệm học</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/10 group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded-md font-mono">
                    +20 XP
                  </span>
                </Link>
              </div>
            </div>

            {/* BENTO WIDGET 3: REWARD RULES */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                <Award className="w-4 h-4 text-amber-500" /> Thưởng Cuối Tuần
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Top 3 học viên xuất sắc nhất tuần sẽ được nhận **Badge Quán Quân** và được vinh danh trang trọng trên trang chủ Cộng Đồng!
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
