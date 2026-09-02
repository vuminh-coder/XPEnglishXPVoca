"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Badge, Button } from "@/shared/components/ui";
import { DoubleBezelCard } from "@/shared/components/ui/DoubleBezelCard";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  Sparkles,
  Award,
  Trophy,
  Zap,
  Flame,
  User,
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  condition: string;
  unlocked: boolean;
  progress: number;
  target: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export default function AchievementsPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  if (!user) return null;

  const achievements: Achievement[] = [
    {
      id: "first_steps",
      name: "Bước đầu tiên",
      description: "Học 10 từ vựng đầu tiên trong hệ thống",
      icon: "🎓",
      xpBonus: 50,
      condition: "Học ≥ 10 từ",
      unlocked: user.wordsLearned >= 10,
      progress: Math.min(user.wordsLearned, 10),
      target: 10,
      rarity: "common",
    },
    {
      id: "streak_master",
      name: "Streak Master",
      description: "Duy trì chuỗi học liên tiếp 7 ngày",
      icon: "🔥",
      xpBonus: 150,
      condition: "Streak ≥ 7 ngày",
      unlocked: user.currentStreak >= 7,
      progress: Math.min(user.currentStreak, 7),
      target: 7,
      rarity: "rare",
    },
    {
      id: "bookworm",
      name: "Bookworm",
      description: "Tích lũy 100 từ vựng trong sổ tay bộ sưu tập",
      icon: "📚",
      xpBonus: 200,
      condition: "Học ≥ 100 từ",
      unlocked: user.wordsLearned >= 100,
      progress: Math.min(user.wordsLearned, 100),
      target: 100,
      rarity: "epic",
    },
    {
      id: "arena_champion",
      name: "Arena Champion",
      description: "Tích lũy 1000 XP từ các hoạt động học tập & PvP",
      icon: "⚔️",
      xpBonus: 250,
      condition: "Tổng XP ≥ 1000",
      unlocked: user.totalXp >= 1000,
      progress: Math.min(user.totalXp, 1000),
      target: 1000,
      rarity: "rare",
    },
    {
      id: "essay_pro",
      name: "Master Level 5",
      description: "Đạt cấp độ 5 trở lên trong bảng xếp hạng người học",
      icon: "✍️",
      xpBonus: 175,
      condition: "Level ≥ 5",
      unlocked: user.level >= 5,
      progress: Math.min(user.level, 5),
      target: 5,
      rarity: "rare",
    },
    {
      id: "perfect_score",
      name: "Perfect Score",
      description: "Đạt tổng cộng 3000 XP — chứng minh bạn là học giả xuất sắc",
      icon: "🎯",
      xpBonus: 300,
      condition: "Tổng XP ≥ 3000",
      unlocked: user.totalXp >= 3000,
      progress: Math.min(user.totalXp, 3000),
      target: 3000,
      rarity: "epic",
    },
    {
      id: "big_spender",
      name: "Shop Pioneer",
      description: "Sở hữu ít nhất 1 Streak Freeze bảo vệ chuỗi",
      icon: "🛒",
      xpBonus: 100,
      condition: "Streak Freeze ≥ 1",
      unlocked: (user.streakFreezes ?? 0) >= 1,
      progress: Math.min(user.streakFreezes ?? 0, 1),
      target: 1,
      rarity: "common",
    },
    {
      id: "legend",
      name: "Legend of XP Voca",
      description: "Đạt cấp độ 10 — trở thành huyền thoại rạng danh cộng đồng",
      icon: "👑",
      xpBonus: 500,
      condition: "Level ≥ 10",
      unlocked: user.level >= 10,
      progress: Math.min(user.level, 10),
      target: 10,
      rarity: "legendary",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalBonusXp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpBonus, 0);

  const filteredAchievements = achievements.filter((a) => {
    if (filter === "unlocked") return a.unlocked;
    if (filter === "locked") return !a.unlocked;
    return true;
  });

  const rarityColors: Record<string, string> = {
    common: "border-slate-200/90 dark:border-slate-800",
    rare: "border-sky-300/60 dark:border-sky-800/60",
    epic: "border-purple-300/60 dark:border-purple-800/60",
    legendary: "border-amber-300/60 dark:border-amber-800/60",
  };

  const rarityBadge: Record<string, "neutral" | "primary" | "legendary" | "danger"> = {
    common: "neutral",
    rare: "primary",
    epic: "legendary",
    legendary: "danger",
  };

  const rarityLabel: Record<string, string> = {
    common: "Phổ thông",
    rare: "Hiếm",
    epic: "Sử thi",
    legendary: "Huyền thoại",
  };

  return (
    <PageEntranceWrapper className="min-h-screen pb-16">
      {/* ─── 1. STANDARDIZED APPTOPHEADER ─── */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem
            active={filter === "all"}
            onClick={() => setFilter("all")}
            icon={<Award className="w-3.5 h-3.5 text-amber-500" />}
            label={`Tất Cả (${achievements.length})`}
          />
          <HeaderPillItem
            active={filter === "unlocked"}
            onClick={() => setFilter("unlocked")}
            icon={<CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
            label={`Đã Đạt (${unlockedCount})`}
          />
          <HeaderPillItem
            active={filter === "locked"}
            onClick={() => setFilter("locked")}
            icon={<Lock className="w-3.5 h-3.5" />}
            label={`Chưa Đạt (${achievements.length - unlockedCount})`}
            hideOnSmall
          />
          <HeaderPillItem
            href="/profile"
            icon={<User className="w-3.5 h-3.5" />}
            label="Hồ Sơ"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── 2. FLUID ULTRA-WIDE MAIN CONTAINER ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        
        {/* HERO SPOTLIGHT STAGE */}
        <MotionItem>
          <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-r from-amber-600 via-amber-500 to-yellow-600 text-white shadow-md shadow-amber-500/15 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 sm:w-60 h-48 sm:h-60 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
                    Huy Chương Thành Tích
                  </span>
                  <span className="text-[11px] font-semibold text-amber-100/90">
                    Mở khóa huy chương nhận thưởng XP đặc biệt
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
                  Bộ Sưu Tập Huy Chương ({unlockedCount}/{achievements.length})
                </h1>
                <p className="text-xs sm:text-sm text-amber-100/95 leading-relaxed font-normal">
                  Bạn đã mở khóa thành công {unlockedCount} trên tổng số {achievements.length} danh hiệu cao quý và nhận tổng cộng +{totalBonusXp} XP thưởng.
                </p>

                {/* Progress Bar in Hero */}
                <div className="pt-2 max-w-md">
                  <div className="h-2.5 rounded-full bg-black/20 overflow-hidden backdrop-blur-sm p-0.5">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-700 shadow-xs"
                      style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shrink-0">
                <div className="w-10 h-10 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center text-white">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Đã Nhận Thưởng</div>
                  <div className="text-[11px] text-amber-100">+{totalBonusXp} Bonus XP</div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ─── 3. ACHIEVEMENTS GRID ─── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredAchievements.map((ach) => (
            <MotionItem key={ach.id}>
              <DoubleBezelCard
                className={`p-4 sm:p-5 flex items-start gap-4 transition-all hover:shadow-md ${
                  ach.unlocked
                    ? "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800"
                    : "bg-slate-50/70 dark:bg-slate-900/50 opacity-75 border-slate-200/70 dark:border-slate-800/60"
                } ${rarityColors[ach.rarity]}`}
              >
                {/* Icon */}
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                    ach.unlocked
                      ? "bg-linear-to-br from-amber-100 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30 border-amber-300/60 dark:border-amber-700/50 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60 grayscale"
                  }`}
                >
                  {ach.unlocked ? ach.icon : <Lock className="h-5 w-5 text-slate-400" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                      {ach.name}
                    </h3>
                    <Badge variant={rarityBadge[ach.rarity]} size="sm">
                      {rarityLabel[ach.rarity]}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span>{ach.condition}</span>
                      <span>{ach.progress}/{ach.target}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          ach.unlocked
                            ? "bg-linear-to-r from-emerald-500 to-teal-500"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                        style={{ width: `${Math.min(100, (ach.progress / ach.target) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {ach.unlocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Đã nhận +{ach.xpBonus} XP
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Phần thưởng: +{ach.xpBonus} XP
                      </span>
                    )}
                  </div>
                </div>
              </DoubleBezelCard>
            </MotionItem>
          ))}
        </div>
      </div>
    </PageEntranceWrapper>
  );
}