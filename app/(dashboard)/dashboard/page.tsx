"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import {
  BookOpen,
  Zap,
  Clock,
  Trophy,
  PenLine,
  Bot,
  Globe,
  Users,
  Lightbulb,
  Target,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { MOCK_VOCABULARIES } from "@/lib/constants";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  // Calculate percentages for consistent layout heights
  const vocabPercent = Math.min(
    100,
    Math.round((user.wordsLearned / MOCK_VOCABULARIES.length) * 100),
  );
  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);
  const studyPercent = Math.min(
    100,
    Math.round((user.minutesStudied / 15) * 100),
  ); // assuming 15 mins daily goal
  const achievementsPercent = Math.min(100, Math.round((3 / 6) * 100)); // 3 unlocked out of 6

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">
          Trang chủ học tập
        </h1>
        <p
          className="page-subtitle text-muted max-w-xl"
          style={{ marginTop: "6px" }}
        >
          Theo dõi tiến độ, hoàn thành thử thách hàng ngày và cải thiện kỹ năng
          tiếng Anh mỗi ngày.
        </p>
      </div>

      {/* Welcome Banner — Double-Bezel outer shell */}
      <div className="bezel mb-6">
        <div
          className="bezel-inner relative overflow-hidden text-white flex flex-col md:flex-row justify-between items-center"
          style={{
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 55%, #6366f1 100%)",
            padding: "28px 32px",
          }}
        >
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/8 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-36 h-36 rounded-full bg-cyan-300/10 blur-2xl pointer-events-none"></div>

          <div className="welcome-text relative z-10 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">
              Chào mừng quay lại, {user.fullName}!
            </h2>
            <p className="text-white/70 text-sm font-medium">
              Hôm nay là một ngày tuyệt vời để tích lũy thêm từ vựng mới.
            </p>
          </div>

          <div className="welcome-streak relative z-10 flex items-center gap-3.5 bg-white/12 backdrop-blur-sm p-3.5 px-6 rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] tactile cursor-pointer">
            <Flame className="w-7 h-7 text-amber-300" strokeWidth={2.5} />
            <div>
              <div className="text-xl font-black text-amber-300">
                {user.currentStreak} Ngày
              </div>
              <div className="text-[10px] text-white/60 font-bold uppercase tracking-[0.15em]">
                Streak hiện tại
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid — Double-Bezel cards */}
      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stat 1 */}
        <div className="bezel lift">
          <div className="bezel-inner p-2 flex flex-col justify-between h-full bg-white dark:bg-neutral-900">
            <div className="p-2">
              <div className="flex justify-between items-start mb-3">
                <div className="icon-well bg-blue-50 dark:bg-blue-950/30 text-blue-500">
                  <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <span className="inline-block text-[9px] text-blue-500 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Học tập
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {user.wordsLearned}/{MOCK_VOCABULARIES.length}
              </div>
              <div className="text-[11px] text-muted font-bold mt-1">
                Từ đã hoàn thành
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                  style={{
                    width: `${vocabPercent}%`,
                    transition: "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bezel lift">
          <div className="bezel-inner p-2 flex flex-col justify-between h-full bg-white dark:bg-neutral-900">
            <div className="p-2">
              <div className="flex justify-between items-start mb-3">
                <div className="icon-well bg-amber-50 dark:bg-amber-950/30 text-amber-500">
                  <Zap className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <span className="inline-block text-[9px] text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Điểm XP
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {user.totalXp} XP
              </div>
              <div className="text-[11px] text-muted font-bold mt-1">
                Kinh nghiệm tích lũy
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-[9px] text-muted mb-1 font-bold">
                <span>Cấp độ {user.level}</span>
                <span>{xpPercent}%</span>
              </div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{
                    width: `${xpPercent}%`,
                    transition: "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bezel lift">
          <div className="bezel-inner p-2 flex flex-col justify-between h-full bg-white dark:bg-neutral-900">
            <div className="p-2">
              <div className="flex justify-between items-start mb-3">
                <div className="icon-well bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500">
                  <Clock className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <span className="inline-block text-[9px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Thời gian
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {user.minutesStudied}m
              </div>
              <div className="text-[11px] text-muted font-bold mt-1">
                Thời gian đã học
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                  style={{
                    width: `${studyPercent}%`,
                    transition: "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bezel lift">
          <div className="bezel-inner p-2 flex flex-col justify-between h-full bg-white dark:bg-neutral-900">
            <div className="p-2">
              <div className="flex justify-between items-start mb-3">
                <div className="icon-well bg-purple-50 dark:bg-purple-950/30 text-purple-500">
                  <Trophy className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <span className="inline-block text-[9px] text-purple-500 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Thành tích
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                3/6
              </div>
              <div className="text-[11px] text-muted font-bold mt-1">
                Huy hiệu đạt được
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                  style={{
                    width: `${achievementsPercent}%`,
                    transition: "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Goals Section — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em]">
                Thử thách hôm nay
              </h3>
              <span className="text-[9px] text-primary-500 bg-primary-50 dark:bg-primary-950/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Hàng ngày
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* Goal 1 */}
              <div className="flex items-center gap-4 p-4 bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.03] dark:border-white/[0.03] rounded-[calc(var(--radius-3xl)-6px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="icon-well bg-blue-50 dark:bg-blue-950/30 text-blue-500">
                  <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Học 10 từ mới
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{
                        width: "60%",
                        transition:
                          "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                      }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-muted font-bold mt-1.5 tracking-wide">
                    6/10 hoàn thành (+50 XP)
                  </div>
                </div>
                <Target
                  className="w-5 h-5 text-cyan-400 opacity-40"
                  strokeWidth={1.5}
                />
              </div>

              {/* Goal 2 */}
              <div className="flex items-center gap-4 p-4 bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.03] dark:border-white/[0.03] rounded-[calc(var(--radius-3xl)-6px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="icon-well bg-amber-50 dark:bg-amber-950/30 text-amber-500">
                  <PenLine className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Hoàn thành 3 bài quiz
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{
                        width: "33%",
                        transition:
                          "width 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                      }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-muted font-bold mt-1.5 tracking-wide">
                    1/3 hoàn thành (+40 XP)
                  </div>
                </div>
                <Target
                  className="w-5 h-5 text-cyan-400 opacity-40"
                  strokeWidth={1.5}
                />
              </div>

              {/* Goal 3 — Completed */}
              <div className="flex items-center gap-4 p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-800/20 rounded-[calc(var(--radius-3xl)-6px)]">
                <div className="icon-well bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500">
                  <CheckCircle2 className="w-[18px] h-[18px]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Ôn tập 15 từ cũ
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 tracking-wide">
                    12/10 hoàn thành (+30 XP)
                  </div>
                </div>
                <CheckCircle2
                  className="w-5 h-5 text-emerald-500"
                  strokeWidth={2}
                />
              </div>

              {/* Goal 4 — Completed */}
              <div className="flex items-center gap-4 p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-800/20 rounded-[calc(var(--radius-3xl)-6px)]">
                <div className="icon-well bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500">
                  <CheckCircle2 className="w-[18px] h-[18px]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Đăng 1 bài chia sẻ
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 tracking-wide">
                    1/1 hoàn thành (+20 XP)
                  </div>
                </div>
                <CheckCircle2
                  className="w-5 h-5 text-emerald-500"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tips Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em]">
            Lối tắt học tập
          </h3>

          <div className="quick-actions grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <Link href="/study/practice" className="bezel lift tactile block">
              <div className="bezel-inner p-4 flex items-center gap-4">
                <div className="icon-well bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500">
                  <PenLine className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Luyện tập từ
                  </h4>
                  <p className="text-[10px] text-muted font-medium mt-0.5">
                    Flashcard, trắc nghiệm và điền từ.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/ai/conversation" className="bezel lift tactile block">
              <div className="bezel-inner p-4 flex items-center gap-4">
                <div className="icon-well bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500">
                  <Bot className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Giao tiếp AI
                  </h4>
                  <p className="text-[10px] text-muted font-medium mt-0.5">
                    Luyện nói trực tiếp qua hội thoại.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/vocabulary" className="bezel lift tactile block">
              <div className="bezel-inner p-4 flex items-center gap-4">
                <div className="icon-well bg-amber-50 dark:bg-amber-950/30 text-amber-500">
                  <Globe className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Khám phá từ
                  </h4>
                  <p className="text-[10px] text-muted font-medium mt-0.5">
                    Xem 12 chủ đề từ vựng phong phú.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/community" className="bezel lift tactile block">
              <div className="bezel-inner p-4 flex items-center gap-4">
                <div className="icon-well bg-purple-50 dark:bg-purple-950/30 text-purple-500">
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Cộng đồng
                  </h4>
                  <p className="text-[10px] text-muted font-medium mt-0.5">
                    Thi đua bảng xếp hạng học thuật.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Learn Tips widget */}
          <div className="bezel">
            <div
              className="bezel-inner p-5 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14, 165, 233, 0.06) 0%, rgba(99, 102, 241, 0.03) 100%)",
              }}
            >
              <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-cyan-400/10 blur-xl pointer-events-none"></div>
              <div className="flex items-start gap-4">
                <div className="icon-well bg-white dark:bg-neutral-900 shadow-sm text-cyan-500 border border-black/5 dark:border-white/5">
                  <Lightbulb className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">
                    Mẹo học từ vựng hiệu quả
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Ôn tập từ vựng sau 24h và 3 ngày bằng thuật toán Spaced
                    Repetition giúp tăng 80% khả năng ghi nhớ dài hạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
