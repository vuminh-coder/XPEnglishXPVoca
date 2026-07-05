"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Card, Badge, Button } from "@/components/ui";
import { ArrowLeft, Lock, CheckCircle, Sparkles } from "lucide-react";

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
  if (!user) return null;

  const achievements: Achievement[] = [
    {
      id: "first_steps",
      name: "Bước đầu tiên",
      description: "Học 10 từ vựng đầu tiên",
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
      description: "Duy trì chuỗi học 7 ngày liên tiếp",
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
      description: "Tích lũy 100 từ vựng trong bộ sưu tập",
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
      description: "Tích lũy 1000 XP từ các hoạt động học tập",
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
      name: "Essay Pro",
      description: "Đạt cấp độ 5 trở lên trong hệ thống",
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
      description: "Đạt tổng cộng 3000 XP — chứng minh bạn là cao thủ",
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
      name: "Big Spender",
      description: "Sở hữu ít nhất 1 Streak Freeze trong kho vật phẩm",
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
      name: "Legend",
      description: "Đạt cấp độ 10 — trở thành huyền thoại của XP Voca",
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

  const rarityColors: Record<string, string> = {
    common: "border-slate-200 dark:border-neutral-800",
    rare: "border-sky-300/50 dark:border-sky-800/50",
    epic: "border-purple-300/50 dark:border-purple-800/50",
    legendary: "border-amber-300/50 dark:border-amber-800/50",
  };

  const rarityBadge: Record<string, string> = {
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
    <div className="mx-auto max-w-5xl animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Button variant="bezel" size="sm" className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Bộ sưu tập Huy chương
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Đã mở khóa {unlockedCount}/{achievements.length} huy chương
          </p>
        </div>
        <Badge variant="primary" className="text-sm font-black px-3 py-1.5">
          {unlockedCount}/{achievements.length}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-700"
          style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
        />
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((ach) => (
          <div key={ach.id} className="bezel">
            <div
              className={`bezel-inner p-5 flex items-start gap-4 transition-all ${
                ach.unlocked ? "bg-white dark:bg-neutral-900" : "bg-slate-50/50 dark:bg-neutral-950/30 opacity-70"
              } border ${rarityColors[ach.rarity]}`}
            >
              {/* Icon */}
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  ach.unlocked
                    ? "bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 shadow-sm"
                    : "bg-slate-100 dark:bg-neutral-800 grayscale"
                }`}
              >
                {ach.unlocked ? ach.icon : <Lock className="h-5 w-5 text-slate-400" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 truncate">
                    {ach.name}
                  </h3>
                  <Badge variant={rarityBadge[ach.rarity] as any} className="text-[10px] shrink-0">
                    {rarityLabel[ach.rarity]}
                  </Badge>
                </div>

                <p className="text-xs text-muted">{ach.description}</p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>{ach.condition}</span>
                    <span>{ach.progress}/{ach.target}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        ach.unlocked
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                          : "bg-slate-300 dark:bg-neutral-600"
                      }`}
                      style={{ width: `${Math.min(100, (ach.progress / ach.target) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center gap-1.5">
                  {ach.unlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Đã nhận +{ach.xpBonus} XP
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      Phần thưởng: +{ach.xpBonus} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}