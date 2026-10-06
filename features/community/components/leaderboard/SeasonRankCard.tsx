"use client";

import React, { useEffect, useState } from "react";
import { Clock, Gift, Trophy, CheckCircle2 } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";
import {
  formatRankXp,
  type RankTier,
  type SeasonInfo,
  type TierProgress,
} from "@/features/gamification/utils/seasonRank";
import { TierShieldIcon } from "./TierShieldIcon";

interface SeasonPayload {
  season: SeasonInfo;
  tiers: RankTier[];
  me: null | {
    xp: number;
    rank: number;
    progress: TierProgress;
    previousSeason: {
      season: SeasonInfo;
      xp: number;
      tier: RankTier;
      rewardCoins: number;
      claimed: boolean;
      claimable: boolean;
    };
  };
}

// 60-30-10 & Rule 17: Semantic accents desaturated for dark mode
const TIER_STYLE: Record<
  RankTier["id"],
  {
    text: string;
    bar: string;
    chip: string;
    activeRing: string;
    badgeBg: string;
  }
> = {
  bronze: {
    text: "text-amber-800 dark:text-amber-400",
    bar: "bg-gradient-to-r from-amber-700 to-amber-600",
    chip: "bg-amber-50/80 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40",
    activeRing: "border-amber-700/80 ring-2 ring-amber-600/30",
    badgeBg: "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200",
  },
  silver: {
    text: "text-slate-700 dark:text-slate-200",
    bar: "bg-gradient-to-r from-slate-400 to-slate-500",
    chip: "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/90 dark:border-slate-700/80",
    activeRing: "border-slate-400 ring-2 ring-slate-400/30",
    badgeBg: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  },
  gold: {
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-gradient-to-r from-amber-400 to-amber-500",
    chip: "bg-amber-50/90 dark:bg-amber-950/30 border-amber-300/80 dark:border-amber-800/60",
    activeRing: "border-amber-500 ring-2 ring-amber-400/40",
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
  },
  platinum: {
    text: "text-sky-700 dark:text-sky-300",
    bar: "bg-gradient-to-r from-sky-400 to-sky-600",
    chip: "bg-sky-50/90 dark:bg-sky-950/30 border-sky-300/80 dark:border-sky-800/60",
    activeRing: "border-sky-500 ring-2 ring-sky-400/40",
    badgeBg: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200",
  },
  diamond: {
    text: "text-[#0059bb] dark:text-sky-300",
    bar: "bg-gradient-to-r from-[#0059bb] to-indigo-600",
    chip: "bg-blue-50/90 dark:bg-blue-950/30 border-blue-300/80 dark:border-blue-800/60",
    activeRing: "border-[#0059bb] ring-2 ring-[#0059bb]/30",
    badgeBg: "bg-blue-100 text-[#0059bb] dark:bg-blue-900/60 dark:text-blue-200",
  },
};

export const SeasonRankCard: React.FC = () => {
  const [data, setData] = useState<SeasonPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const updateUserStats = useUserStore((s) => s.updateUserStats);

  const refreshData = async () => {
    try {
      const res = await fetch("/api/season", { credentials: "include", cache: "no-store" });
      const json = await res.json();
      if (json?.success) setData(json.data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    let active = true;
    const fetchSeason = async () => {
      try {
        const res = await fetch("/api/season", { credentials: "include", cache: "no-store" });
        const json = await res.json();
        if (active && json?.success) setData(json.data);
      } catch {
        /* keep skeleton → empty state */
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSeason();
    return () => {
      active = false;
    };
  }, []);

  const handleClaim = async () => {
    setClaiming(true);
    setMessage(null);
    try {
      const res = await fetch("/api/season/claim", { method: "POST", credentials: "include" });
      const json = await res.json();
      if (json?.success) {
        setMessage(`Đã nhận +${json.data.coinsAwarded} Coins!`);
        if (typeof json.data.coins === "number") updateUserStats({ coins: json.data.coins });
        await refreshData();
      } else {
        setMessage(json?.error || "Không thể nhận thưởng.");
      }
    } catch {
      setMessage("Lỗi kết nối, vui lòng thử lại.");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div
        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3"
        aria-busy="true"
      >
        <div className="flex items-center justify-between">
          <ShimmerBox className="h-4 w-32 rounded-lg" />
          <ShimmerBox className="h-4 w-20 rounded-full" />
        </div>
        <ShimmerBox className="h-16 w-full rounded-xl" />
        <ShimmerBox className="h-2 w-full rounded-full" />
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <ShimmerBox key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { season, tiers, me } = data;
  const progress = me?.progress;
  const currentTier = progress?.tier ?? tiers[0];
  const style = TIER_STYLE[currentTier.id];
  const prev = me?.previousSeason;

  return (
    <section
      aria-label="Mùa giải và hạng"
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4"
    >
      {/* 1. HEADER: Season Name & Countdown badge */}
      <div className="flex items-center justify-between gap-2">
        <h4 className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{season.name}</span>
        </h4>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Còn {season.daysLeft} ngày</span>
        </span>
      </div>

      {me ? (
        <>
          {/* 2. CURRENT RANK SPOTLIGHT: Shield Badge + Season XP */}
          <div className={`p-3.5 rounded-xl border transition-all ${style.chip}`}>
            <div className="flex items-center gap-3">
              <div className="shrink-0 p-1 rounded-xl bg-white dark:bg-slate-900/60 shadow-2xs border border-slate-200/60 dark:border-slate-800">
                <TierShieldIcon tierId={currentTier.id} className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                  Hạng Hiện Tại
                </span>
                <span className={`text-base sm:text-lg font-black font-display tracking-tight leading-snug ${style.text}`}>
                  {currentTier.name}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                  XP Mùa Này
                </span>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white leading-snug">
                  {me.xp.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Progress Bar towards Next Tier */}
            <div className="mt-3 space-y-1.5">
              <div
                className="h-2 rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden"
                role="progressbar"
                aria-valuenow={progress?.percent ?? 0}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                  style={{ width: `${progress?.percent ?? 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  {progress?.nextTier ? (
                    <>
                      Còn{" "}
                      <strong className="text-slate-700 dark:text-slate-200 font-bold">
                        {progress.xpToNext.toLocaleString()} XP
                      </strong>{" "}
                      để lên {progress.nextTier.name}
                    </>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Chinh phục hạng Kim Cương cao nhất!
                    </span>
                  )}
                </span>
                {me.rank > 0 && (
                  <span className="font-bold text-slate-700 dark:text-slate-200 font-mono shrink-0">
                    Xếp #{me.rank}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          Đăng nhập để tính XP mùa giải, leo hạng và nhận thưởng khi mùa kết thúc.
        </p>
      )}

      {/* 3. TIER ROADMAP (5 Columns, Clean labels, No text truncation/wrapping issues) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-0.5">
          <span>Lộ trình thăng hạng</span>
          <span className="font-mono text-[10px] text-slate-400 font-normal">5 Cấp độ</span>
        </div>

        <ul className="grid grid-cols-5 gap-1 sm:gap-1.5" aria-label="Các hạng và mốc XP">
          {tiers.map((t) => {
            const isCurrent = me && t.id === currentTier.id;
            const tStyle = TIER_STYLE[t.id];

            return (
              <li
                key={t.id}
                className={`relative rounded-xl border p-1 sm:p-1.5 flex flex-col items-center justify-between text-center transition-all ${
                  isCurrent
                    ? `${tStyle.activeRing} bg-slate-50/90 dark:bg-slate-800/60 shadow-2xs`
                    : "border-slate-200/80 dark:border-slate-800/90 bg-white/50 dark:bg-slate-900/40 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Visual Active Pin indicator */}
                {isCurrent && (
                  <span
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1 py-px rounded-full bg-[#0059bb] text-white text-[8px] font-black uppercase tracking-wider shadow-2xs leading-none whitespace-nowrap z-10"
                    title="Vị trí hiện tại của bạn"
                  >
                    Bạn
                  </span>
                )}

                <div className="py-0.5">
                  <TierShieldIcon tierId={t.id} className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                </div>

                <div className="w-full mt-1">
                  <span
                    className={`block font-bold text-[10px] sm:text-[11px] leading-tight truncate tracking-tight ${
                      isCurrent ? tStyle.text : "text-slate-700 dark:text-slate-300"
                    }`}
                    title={t.name}
                  >
                    {t.name}
                  </span>
                  <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                    {formatRankXp(t.minXp)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. PREVIOUS SEASON ACHIEVEMENTS & REWARDS (Distinct Banner, Proper Affordances) */}
      {prev && prev.rewardCoins > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          {prev.claimed ? (
            /* Claimed state: Elegant Status Badge (Rule 18: No fake disabled primary button) */
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <TierShieldIcon tierId={prev.tier.id} className="w-5 h-5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {prev.season.name}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] truncate font-medium">
                    Đạt hạng <strong className="font-bold text-slate-900 dark:text-white">{prev.tier.name}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Đã nhận thưởng</span>
              </div>
            </div>
          ) : prev.claimable ? (
            /* Claimable state: Clear single CTA (Rule 18) */
            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <TierShieldIcon tierId={prev.tier.id} className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-bold">
                      {prev.season.name} đã kết thúc
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 text-xs">
                      Bạn đạt hạng <strong className="font-bold">{prev.tier.name}</strong>
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400 shrink-0">
                  +{prev.rewardCoins} Coins
                </span>
              </div>

              <button
                type="button"
                id="season-claim-reward"
                onClick={handleClaim}
                disabled={claiming}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 disabled:opacity-50"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>{claiming ? "Đang nhận..." : `Nhận ${prev.rewardCoins} Coins Thưởng`}</span>
              </button>
            </div>
          ) : null}

          {message && (
            <p role="status" className="text-[11px] font-bold text-slate-600 dark:text-slate-300 px-1">
              {message}
            </p>
          )}
        </div>
      )}
    </section>
  );
};
