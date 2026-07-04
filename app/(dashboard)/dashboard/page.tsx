"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Clock,
  Flame,
  Globe,
  PenLine,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const vocabPercent = Math.min(
    100,
    Math.round((user.wordsLearned / MOCK_VOCABULARIES.length) * 100),
  );
  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);
  const studyPercent = Math.min(100, Math.round((user.minutesStudied / 15) * 100));
  const achievementsPercent = Math.min(100, Math.round((3 / 6) * 100));
  const remainingWords = Math.max(0, 10 - user.wordsLearned);

  const quickActions = [
    {
      title: "Luyện tập từ vựng",
      description: "Flashcard, quiz và điền từ",
      href: "/study/practice",
      icon: PenLine,
      accent: "from-cyan-500 to-sky-500",
    },
    {
      title: "Hội thoại AI",
      description: "Luyện nói như người bản xứ",
      href: "/ai/conversation",
      icon: Bot,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      title: "Khám phá chủ đề",
      description: "Bộ từ theo chủ đề và mức độ",
      href: "/vocabulary",
      icon: Globe,
      accent: "from-amber-500 to-orange-500",
    },
    {
      title: "Cộng đồng",
      description: "Chia sẻ tiến độ và thử thách",
      href: "/community",
      icon: Users,
      accent: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Trang chủ học tập</h1>
        <p className="page-subtitle text-muted max-w-2xl" style={{ marginTop: "6px" }}>
          Một ngày học ngắn, rõ mục tiêu và có cảm giác tiến bộ liên tục.
        </p>
      </div>

      <div className="bezel">
        <div className="bezel-inner overflow-hidden rounded-[30px] bg-gradient-to-br from-sky-600 via-cyan-500 to-violet-600 p-6 text-white md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                <Sparkles className="h-3.5 w-3.5" />
                Focus hôm nay
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Chào mừng quay lại, {user.fullName}!
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                Bạn còn {remainingWords} từ để chạm mốc 10 từ hôm nay. Bắt đầu bằng một phiên học ngắn 5 phút.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <Flame className="h-7 w-7 text-amber-300" />
              <div>
                <div className="text-xl font-black text-amber-300">{user.currentStreak} ngày</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Streak hiện tại</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Từ đã học", value: `${user.wordsLearned}/${MOCK_VOCABULARIES.length}`, progress: vocabPercent, icon: BookOpen, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/30" },
          { label: "XP tích lũy", value: `${user.totalXp} XP`, progress: xpPercent, icon: Zap, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
          { label: "Thời gian học", value: `${user.minutesStudied}m`, progress: studyPercent, icon: Clock, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
          { label: "Huy hiệu", value: "3/6", progress: achievementsPercent, icon: Trophy, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bezel lift">
              <div className="bezel-inner flex h-full flex-col justify-between bg-white p-4 dark:bg-neutral-900">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`icon-well ${item.color}`}>
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted dark:bg-neutral-800">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">{item.value}</div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted">
                    <span>Tiến độ</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="bezel">
            <div className="bezel-inner p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Tiếp tục học</p>
                  <h3 className="mt-1 text-lg font-black text-gray-900 dark:text-gray-100">Bài học hôm nay nên bắt đầu từ đây</h3>
                </div>
                <Link href="/study/practice" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
                  Bắt đầu <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[24px] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 dark:border-sky-900/40 dark:from-sky-950/20 dark:to-neutral-900">
                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-600">
                    <Target className="h-4 w-4" />
                    Phiên 5 phút
                  </div>
                  <h4 className="mt-3 text-xl font-black text-gray-900 dark:text-gray-100">Ôn từ vựng về công việc</h4>
                  <p className="mt-2 text-sm text-muted">
                    Học 8 từ mới, lặp lại 3 câu mẫu và nhận phản hồi ngay lập tức.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    3 mục tiêu hoàn thành hôm nay
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Ôn 10 từ cũ", detail: "Nhắc lại trong 2 phút" },
                    { title: "Luyện phát âm", detail: "Ngay sau khi học" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-neutral-900">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</div>
                      <div className="mt-1 text-xs font-medium text-muted">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bezel">
            <div className="bezel-inner p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Đề xuất tiếp theo</p>
                  <h3 className="mt-1 text-lg font-black text-gray-900 dark:text-gray-100">Các lộ trình phù hợp với bạn</h3>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  { title: "Travel Essentials", detail: "12 từ mới • mức dễ", chip: "Mới bắt đầu" },
                  { title: "Workplace English", detail: "8 từ mới • mức trung bình", chip: "Phổ biến" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800 dark:bg-neutral-900/70">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</div>
                    <div className="mt-1 text-sm text-muted">{item.detail}</div>
                    <div className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm dark:bg-neutral-800 dark:text-slate-300">
                      {item.chip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bezel">
            <div className="bezel-inner p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Nhiệm vụ hôm nay</p>
              <div className="mt-4 space-y-3">
                {[
                  { title: "Học 10 từ mới", done: 6, total: 10 },
                  { title: "Hoàn thành 3 bài quiz", done: 1, total: 3 },
                  { title: "Ôn tập 15 từ cũ", done: 15, total: 15 },
                ].map((task) => (
                  <div key={task.title} className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-neutral-900">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{task.title}</span>
                      <span className="text-xs font-semibold text-slate-500">{task.done}/{task.total}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" style={{ width: `${Math.min(100, (task.done / task.total) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bezel">
            <div className="bezel-inner p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Lối tắt nhanh</p>
              <div className="mt-4 grid gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.title} href={action.href} className="group rounded-[20px] border border-slate-200/70 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-neutral-900">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-2xl bg-gradient-to-br ${action.accent} p-2.5 text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{action.title}</div>
                          <div className="mt-1 text-sm text-muted">{action.description}</div>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
