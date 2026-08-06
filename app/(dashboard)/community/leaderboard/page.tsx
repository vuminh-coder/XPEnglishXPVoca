'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { useAuthStore } from '@/lib/store/authStore';
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
  ShieldCheck,
  Star,
  ChevronRight,
  Clock,
  CheckCircle2,
  Lock,
  ArrowUp
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Helper to format clean display names without @ or duplicate bracket usernames
const formatCleanName = (name?: string) => {
  if (!name) return 'Học viên XP';
  let clean = name.trim().replace(/^@+/, '').split(' (')[0].trim();
  if (clean.includes('@')) {
    clean = clean.split('@')[0];
    clean = clean.replace(/[._-]/g, ' ');
    clean = clean
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
  return clean || 'Học viên XP';
};

// Component to render Google/Facebook OAuth avatar image with self-healing onError fallback
const UserAvatar = ({
  avatar,
  avatarUrl,
  imageUrl,
  emoji,
  name,
  size = "w-8 h-8",
}: {
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  emoji?: string;
  name?: string;
  size?: string;
}) => {
  const [imgError, setImgError] = useState(false);
  const src = avatar || avatarUrl || imageUrl;

  if (src && (src.startsWith('http') || src.startsWith('/')) && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'User Avatar'}
        onError={() => setImgError(true)}
        className={`${size} rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs`}
      />
    );
  }

  const cleanName = formatCleanName(name);
  const initial = cleanName.charAt(0).toUpperCase() || 'X';

  return (
    <div className={`${size} rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs font-display`}>
      <span>{emoji || initial}</span>
    </div>
  );
};

// Specialized Rank Avatar component for Leaderboard Podium Champions (1 = Gold, 2 = Silver, 3 = Bronze)
const RankAvatar = ({
  avatar,
  avatarUrl,
  imageUrl,
  name,
  rank,
  size = "w-14 h-14",
}: {
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  name?: string;
  rank: 1 | 2 | 3;
  size?: string;
}) => {
  const [imgError, setImgError] = useState(false);
  const src = avatar || avatarUrl || imageUrl;
  const ringColor = rank === 1 ? 'ring-4 ring-amber-400' : rank === 2 ? 'ring-4 ring-slate-300' : 'ring-4 ring-amber-700/60';

  if (src && (src.startsWith('http') || src.startsWith('/')) && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'Champion Avatar'}
        onError={() => setImgError(true)}
        className={`${size} rounded-full object-cover shrink-0 ${ringColor} shadow-md`}
      />
    );
  }

  const cleanName = formatCleanName(name);
  const initial = cleanName.charAt(0).toUpperCase() || 'X';

  const rankStyle = rank === 1 
    ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 ring-4 ring-amber-300/80 shadow-lg' 
    : rank === 2 
    ? 'bg-gradient-to-tr from-slate-600 via-slate-500 to-slate-400 text-white ring-4 ring-slate-300 dark:ring-slate-600 shadow-md' 
    : 'bg-gradient-to-tr from-amber-800 via-amber-700 to-amber-600 text-white ring-4 ring-amber-700/50 shadow-md';

  return (
    <div className={`${size} rounded-full ${rankStyle} flex items-center justify-center font-black text-lg sm:text-xl shrink-0 font-display`}>
      <span>{initial}</span>
    </div>
  );
};

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

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setLeaders(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const userAvatar = user?.imageUrl || (user as any)?.avatar || (user as any)?.avatarUrl;

  const processedLeaders = leaders.map((l) => {
    const isCurrentUser = Boolean(
      user &&
      (l.id === user.id ||
        (l.fullName && user.fullName && l.fullName.toLowerCase() === user.fullName.toLowerCase()) ||
        (l.username && user.username && l.username.toLowerCase() === user.username.toLowerCase()))
    );

    const avatarUrl = isCurrentUser && userAvatar
      ? userAvatar
      : (l.avatar || l.imageUrl || l.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(l.fullName || l.username || "User")}&background=0059bb&color=fff`);

    return {
      ...l,
      avatar: avatarUrl,
      imageUrl: avatarUrl,
      avatarUrl: avatarUrl,
    };
  });

  const top1 = processedLeaders.find(l => l.rank === 1);
  const top2 = processedLeaders.find(l => l.rank === 2);
  const top3 = processedLeaders.find(l => l.rank === 3);
  const otherLeaders = processedLeaders.filter(l => l.rank > 3);

  // Find current user position if available
  const currentUserLeader = processedLeaders.find(l => l.fullName === user?.fullName || l.username === user?.username);
  const userRankNum = currentUserLeader ? currentUserLeader.rank : 4;
  const userXp = user?.totalXp || (user as any)?.xp || 10;
  const nextRankTargetXp = top3 ? top3.xp + 25 : 100;
  const xpNeeded = Math.max(0, nextRankTargetXp - userXp);

  return (
    <PageEntranceWrapper className="space-y-3.5 sm:space-y-5 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      
      {/* 0. NAVIGATION BACK BUTTON (ONLY SHOWN WHEN NAVIGATING FROM ANALYTICS) */}
      {isFromAnalytics && (
        <MotionItem className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-2xs cursor-pointer font-display"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb]" />
            <span>Quay lại trang Thống kê</span>
          </button>

          <Link
            href="/analytics"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0059bb] hover:underline font-display"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Xem Thống kê của tôi</span>
          </Link>
        </MotionItem>
      )}
      
      {/* 1. HERO SPOTLIGHT BANNER (AGENCY DASHBOARD TIER) */}
      <MotionItem className="p-3.5 sm:p-4.5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-2xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          
          {/* TOP BAR: BADGES (LEFT) + COMPACT RANK PILL ON MOBILE (RIGHT) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="px-2 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1 font-display shrink-0">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" /> Bảng Xếp Hạng Tuần
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-bold bg-white/15 text-white border border-white/20 font-mono shrink-0">
                Reset: 23:59 Chủ Nhật
              </span>
            </div>

            {/* Mobile-only compact rank badge at top right */}
            <div className="sm:hidden px-2.5 py-1 rounded-xs bg-amber-400/20 border border-amber-300/30 text-amber-200 flex items-center gap-1 text-[10px] font-black font-display shrink-0">
              <Trophy className="w-3 h-3 text-amber-300" />
              <span>Hạng #{userRankNum}</span>
            </div>
          </div>

          {/* SECOND ROW: TITLE & DESKTOP RANK CARD */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-2xl">
              <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
                Đua Top Chiến Binh XP English
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              </h1>
              <p className="hidden sm:block text-[10px] sm:text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                Vinh danh những học viên có chuỗi ngày học bền bỉ và tích lũy XP cao nhất trong tuần. Tích lũy XP ngay bằng bài học & thi thử!
              </p>
            </div>

            {/* Desktop-only full rank card on right side */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 p-3 rounded-xs bg-white/10 dark:bg-slate-900/60 border border-white/15 backdrop-blur-md">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 font-display">Thứ hạng bạn</div>
                <div className="text-xs font-black font-display text-white font-mono">#{userRankNum} Tuần</div>
              </div>
            </div>
          </div>

        </div>
      </MotionItem>

      {/* 2. BENTO GRID LAYOUT (3/4 PODIUM & STREAM + 1/4 INSPECTOR WIDGETS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">

        {/* LEFT 3/4 COLUMN: SEGMENTED TABS, PODIUM & RANKING STREAM */}
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
          
          {/* SEGMENTED NAVIGATION TABS */}
          <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 grid grid-cols-4 gap-1 w-full">
            <Link
              href="/community"
              className="py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Bảng tin
            </Link>
            <div className="py-1.5 px-1 sm:px-3 rounded-xs bg-[#0059bb] text-white text-[10px] sm:text-xs font-bold shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" /> Xếp hạng
            </div>
            <Link
              href="/community/friends"
              className="py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-500 shrink-0" /> Bạn bè
            </Link>
            <Link
              href="/community/groups"
              className="py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" /> Nhóm
            </Link>
          </div>

          {loading ? (
            /* SKELETON LOADING STATE (RULE 1 COMPLIANCE) */
            <div className="space-y-4">
              <div className="p-4 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4 animate-pulse">
                <div className="w-36 h-5 bg-slate-200 dark:bg-slate-800 rounded-xs mx-auto" />
                <div className="flex items-end justify-center gap-2.5 sm:gap-4 h-44 sm:h-48 pt-4">
                  <div className="w-20 sm:w-24 h-28 sm:h-32 bg-slate-100 dark:bg-slate-800/60 rounded-t-xs" />
                  <div className="w-24 sm:w-28 h-36 sm:h-40 bg-amber-500/10 rounded-t-xs" />
                  <div className="w-20 sm:w-24 h-20 sm:h-24 bg-slate-100 dark:bg-slate-800/60 rounded-t-xs" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 sm:space-y-4">
              
              {/* 🏆 TOP 3 BENTO CHAMPIONS SHOWCASE (HIGH-CONTRAST GOLD, SILVER, BRONZE) */}
              <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 sm:pb-2.5">
                  <h2 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" /> Bảng Vinh Danh Quán Quân Tuần
                  </h2>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">Tự động cập nhật 24/7</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-4 items-end pt-1.5 sm:pt-2 pb-1">
                  
                  {/* RANK 2 - SILVER BENTO CARD */}
                  {top2 && (
                    <div className="p-2 sm:p-3.5 rounded-xs bg-gradient-to-b from-slate-200/80 via-slate-100/50 to-white dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-600 shadow-2xs text-center flex flex-col items-center justify-between space-y-1.5 sm:space-y-2 relative group hover:border-slate-400 transition-all">
                      <div className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-mono font-black text-[9px] sm:text-xs flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                        <Medal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600 dark:text-slate-300 shrink-0" /> #2 Á Quân
                      </div>

                      <div className="relative my-0.5 sm:my-1">
                        <RankAvatar
                          avatar={top2.avatar}
                          name={top2.fullName || top2.username}
                          rank={2}
                          size="w-10 h-10 sm:w-14 sm:h-14"
                        />
                      </div>

                      <div className="w-full space-y-0.5 sm:space-y-1">
                        <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                          {formatCleanName(top2.fullName || top2.username)}
                        </div>
                        <div className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-slate-700 dark:bg-slate-800 text-white font-mono font-black text-[10px] sm:text-[11px] shadow-2xs">
                          {top2.xp} XP
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RANK 1 - GOLD BENTO CARD (CENTER - HIGHEST & GLOWING GOLD) */}
                  {top1 && (
                    <div className="p-2.5 sm:p-4 rounded-xs bg-gradient-to-b from-amber-500/25 via-amber-400/10 to-amber-500/5 dark:from-amber-500/30 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400 shadow-md text-center flex flex-col items-center justify-between space-y-2 sm:space-y-2.5 relative group -top-2.5 sm:-top-3 z-10 transition-all">
                      <div className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-mono font-black text-[9.5px] sm:text-xs flex items-center gap-0.5 sm:gap-1 shadow-xs animate-pulse">
                        <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950 text-slate-950 shrink-0" /> #1 Quán Quân
                      </div>

                      <div className="relative my-0.5 sm:my-1">
                        <RankAvatar
                          avatar={top1.avatar}
                          name={top1.fullName || top1.username}
                          rank={1}
                          size="w-12 h-12 sm:w-16 sm:h-16"
                        />
                      </div>

                      <div className="w-full space-y-0.5 sm:space-y-1">
                        <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate font-display">
                          {formatCleanName(top1.fullName || top1.username)}
                        </div>
                        <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono font-black text-[11px] sm:text-xs shadow-md border border-amber-300">
                          {top1.xp} XP
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RANK 3 - BRONZE BENTO CARD */}
                  {top3 && (
                    <div className="p-2 sm:p-3.5 rounded-xs bg-gradient-to-b from-amber-800/20 via-amber-800/10 to-white dark:from-amber-950/60 dark:to-slate-900 border-2 border-amber-700/50 dark:border-amber-800/60 shadow-2xs text-center flex flex-col items-center justify-between space-y-1.5 sm:space-y-2 relative group hover:border-amber-700 transition-all">
                      <div className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-amber-800/30 text-amber-900 dark:text-amber-200 font-mono font-black text-[9px] sm:text-xs flex items-center gap-0.5 sm:gap-1 shadow-2xs border border-amber-700/40">
                        <Medal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-700 dark:text-amber-400 shrink-0" /> #3 Hạng Ba
                      </div>

                      <div className="relative my-0.5 sm:my-1">
                        <RankAvatar
                          avatar={top3.avatar}
                          name={top3.fullName || top3.username}
                          rank={3}
                          size="w-10 h-10 sm:w-14 sm:h-14"
                        />
                      </div>

                      <div className="w-full space-y-0.5 sm:space-y-1">
                        <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                          {formatCleanName(top3.fullName || top3.username)}
                        </div>
                        <div className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-amber-800 text-amber-100 font-mono font-black text-[10px] sm:text-[11px] shadow-2xs">
                          {top3.xp} XP
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* 📋 DETAILED LEADERBOARD STREAM (RANKS 4+) */}
              <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5 pb-2 font-display">
                  <TrendingUp className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Danh Sách Học Viên Bứt Phá:
                </h3>

                <div className="space-y-1.5">
                  {otherLeaders.map((l) => {
                    const cleanName = formatCleanName(l.fullName || l.username);
                    const isCurrentUser = l.fullName === user?.fullName || l.username === user?.username || cleanName === formatCleanName(user?.fullName);

                    return (
                      <div
                        key={l.id}
                        className={`p-2 sm:p-2.5 rounded-xs border flex items-center justify-between gap-2.5 sm:gap-3 transition-all ${
                          isCurrentUser
                            ? "bg-sky-50/80 dark:bg-sky-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
                            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          {/* Rank Badge */}
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xs bg-slate-200/80 dark:bg-slate-700 flex items-center justify-center text-[11px] sm:text-xs font-black text-slate-700 dark:text-slate-200 shrink-0 font-mono">
                            #{l.rank}
                          </div>

                          {/* Avatar */}
                          <UserAvatar
                            avatar={l.avatar}
                            emoji={l.avatarEmoji}
                            name={cleanName}
                            size="w-7 h-7 sm:w-8 sm:h-8"
                          />

                          {/* User info */}
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5">
                              {cleanName}
                              {isCurrentUser && (
                                <span className="px-1 py-0.2 rounded-xs text-[8.5px] font-black uppercase bg-[#0059bb] text-white">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                              Cấp {l.level || 1} · {l.title || 'Học viên chăm chỉ'}
                            </div>
                          </div>
                        </div>

                        {/* XP Badge */}
                        <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 font-black text-[11px] sm:text-xs shrink-0 font-mono">
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

        {/* RIGHT 1/4 COLUMN: SIDEBAR INSPECTOR WIDGETS */}
        <div className="lg:col-span-4 space-y-3.5 sm:space-y-4 sticky top-4">
          
          {/* BENTO WIDGET 1: YOUR CURRENT RANK & XP STATUS */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-white/5 pb-2.5">
              <UserAvatar
                avatar={(user as any)?.avatar || (user as any)?.avatarUrl}
                emoji={user?.avatarEmoji}
                name={user?.fullName || user?.username}
                size="w-8 h-8 sm:w-9 sm:h-9"
              />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                  Vị Trí Của Bạn
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
                  {formatCleanName(user?.fullName || user?.username)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 font-display">Hạng tuần:</div>
                <div className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-400 font-mono">
                  #{userRankNum}
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 font-display">Điểm XP:</div>
                <div className="text-sm sm:text-base font-black text-amber-500 font-mono">
                  {userXp} XP
                </div>
              </div>
            </div>

            {/* Target Progress Bar to Next Rank */}
            <div className="space-y-1 bg-slate-50 dark:bg-slate-800/40 p-2 sm:p-2.5 rounded-xs border border-slate-200/60 dark:border-white/5">
              <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold font-mono">
                <span className="text-slate-500">Tiến độ vượt hạng #3</span>
                <span className="text-[#0059bb] dark:text-sky-400">Cần +{xpNeeded} XP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#0059bb] rounded-full" style={{ width: `${Math.min(100, (userXp / nextRankTargetXp) * 100)}%` }} />
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium leading-relaxed">
              💡 Học thêm <span className="font-bold text-[#0059bb] dark:text-sky-400">1 bài thi thử AI</span> để nhận ngay +15 XP bứt phá thứ hạng!
            </p>
          </div>

          {/* BENTO WIDGET 2: QUICK ACTION TO EARN XP */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 sm:space-y-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-100 dark:border-white/5 pb-2 text-xs font-bold text-slate-900 dark:text-white font-display">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Nhiệm Vụ Tích Lũy XP Nhanh
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Link
                href="/study/grammar"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-xs font-bold transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2 font-display">
                  <Target className="w-3.5 h-3.5 text-[#0059bb] group-hover:text-white" />
                  <span>Thi thử trắc nghiệm AI</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/10 group-hover:bg-white/20 group-hover:text-white px-1.5 py-0.2 rounded-xs font-mono">
                  +15 XP
                </span>
              </Link>

              <Link
                href="/community"
                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-xs font-bold transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2 font-display">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0059bb] group-hover:text-white" />
                  <span>Chia sẻ kinh nghiệm học</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/10 group-hover:bg-white/20 group-hover:text-white px-1.5 py-0.2 rounded-xs font-mono">
                  +20 XP
                </span>
              </Link>
            </div>
          </div>

          {/* BENTO WIDGET 3: REWARD RULES */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-sky-50/70 dark:bg-sky-950/30 border border-[#0059bb]/30 shadow-2xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Thưởng Cuối Tuần
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Top 3 học viên xuất sắc nhất tuần sẽ được nhận **Badge Quán Quân** và được vinh danh trang trọng trên trang chủ Cộng Đồng!
            </p>
          </div>

        </div>
      </div>
    </PageEntranceWrapper>
  );
}
