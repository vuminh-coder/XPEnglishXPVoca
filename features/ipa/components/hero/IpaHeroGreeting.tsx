"use client";

import React, { useState } from "react";
import { BookmarkCheck, Target, Swords } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { IpaMetricCard } from "../shared/IpaMetricCard";

export interface IpaHeroGreetingProps {
  user: any;
  userTitle?: string;
  masteredCount?: number;
  totalCount?: number;
  averageScore?: number;
  pairsLearnedCount?: number;
  streakDays?: number;
  defaultShowMetrics?: boolean;
  onNavigateTab?: (tab: "matrix" | "practice_lab" | "minimal_pairs") => void;
  className?: string;
}

export const IpaHeroGreeting: React.FC<IpaHeroGreetingProps> = ({
  user,
  userTitle = "Phonics Explorer",
  masteredCount = 18,
  totalCount = 44,
  averageScore = 88,
  pairsLearnedCount = 7,
  streakDays,
  defaultShowMetrics,
  onNavigateTab,
  className = "",
}) => {
  const displayName = formatCleanName(user?.fullName || user?.username || user?.email || "Học viên");
  const actualStreak = streakDays ?? user?.currentStreak ?? 1;
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  // Toggle switch state with localStorage persistence (defaults to collapsed/hidden)
  const [showMetrics, setShowMetrics] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("xp_ipa_hero_show_metrics");
      if (saved !== null) return saved === "true";
    }
    return defaultShowMetrics ?? false;
  });

  const handleToggle = () => {
    const nextState = !showMetrics;
    setShowMetrics(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_ipa_hero_show_metrics", String(nextState));
    }
  };

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm shadow-slate-200/40 dark:shadow-black/30 select-none transition-shadow ${className}`}
    >
      {/* Upper Greeting Row with Avatar, Name & Toggle Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="shrink-0">
            <UserAvatar
              avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
              imageUrl={user?.imageUrl}
              emoji={user?.avatarEmoji}
              name={displayName}
              size="w-11 h-11 sm:w-12 sm:h-12"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                Studio Phát Âm IPA • {displayName}
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                Lv.{user?.level || 1} • {userTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
              <span>
                Đã làm chủ <strong className="text-slate-800 dark:text-slate-200">{masteredCount}/{totalCount}</strong> âm
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[#0059bb] dark:text-sky-400 font-bold">{progressPercent}% Hoàn thành</span>
            </p>
          </div>
        </div>

        {/* Header Right: iOS-Style Smooth Spring Toggle Switch */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0 select-none">
          <span
            onClick={handleToggle}
            className={`text-xs cursor-pointer select-none transition-colors duration-200 ${
              showMetrics
                ? "font-semibold text-slate-800 dark:text-slate-200"
                : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Chỉ số chi tiết
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showMetrics}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0059bb] active:scale-95 ${
              showMetrics ? "bg-[#0059bb]" : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
            title={showMetrics ? "Gạt tắt để ẩn các chỉ số (thu gọn)" : "Gạt bật để xem 4 thẻ chỉ số (mở rộng)"}
          >
            <span className="sr-only">Bật/Tắt hiển thị chỉ số chi tiết</span>
            <motion.span
              animate={{ x: showMetrics ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 32 }}
              className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0"
            />
          </button>
        </div>
      </div>

      {/* Collapsible Section: Divider & 4 Bento Metric Cards (Ultra-Smooth Fluid Height & Opacity) */}
      <AnimatePresence initial={false}>
        {showMetrics && (
          <motion.div
            key="ipa-hero-metrics-collapsible"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 14,
              transition: {
                height: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                marginTop: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.26, delay: 0.08, ease: "easeOut" },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
              transition: {
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                marginTop: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.16, ease: "easeIn" },
              },
            }}
            className="overflow-hidden"
          >
            <div className="space-y-3.5 sm:space-y-4">
              {/* Thin Horizontal Divider */}
              <div className="h-px bg-slate-100 dark:bg-slate-800/80 w-full" />

              {/* 4 Bento Metric Cards Grid with Subtle Stagger Fade */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              >
              {/* Metric 1: Mastered Sounds */}
              <IpaMetricCard
                icon={<BookmarkCheck className="w-5 h-5 stroke-[2.2]" />}
                iconBgClass="bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50"
                value={masteredCount}
                unit={`/${totalCount} âm`}
                label="Âm đã thuần thục"
                subText="Chuẩn Oxford / Cambridge"
                onClick={() => onNavigateTab && onNavigateTab("matrix")}
              />

              {/* Metric 2: AI Fluency Score */}
              <IpaMetricCard
                icon={<Target className="w-5 h-5 stroke-[2.2]" />}
                iconBgClass="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                value={averageScore}
                unit="%"
                label="Độ chuẩn xác AI trung bình"
                subText="Khẩu hình & Cao độ âm"
                onClick={() => onNavigateTab && onNavigateTab("practice_lab")}
              />

              {/* Metric 3: Minimal Pairs Completed */}
              <IpaMetricCard
                icon={<Swords className="w-5 h-5 stroke-[2.2]" />}
                iconBgClass="bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50"
                value={pairsLearnedCount}
                unit="/12 cặp"
                label="Cặp âm đã phân biệt"
                subText="Đấu trường tai nghe"
                onClick={() => onNavigateTab && onNavigateTab("minimal_pairs")}
              />

              {/* Metric 4: Pronunciation Streak */}
              <IpaMetricCard
                icon={
                  <img
                    src="/images/streak-flame-crystal.png"
                    alt="Streak Flame"
                    className="w-6 h-6 object-contain drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] select-none pointer-events-none"
                  />
                }
                iconBgClass="bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/50 p-1 overflow-hidden"
                value={actualStreak}
                unit="ngày"
                label="Chuỗi luyện phát âm"
                subText="Kỷ lục liên tiếp"
              />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
