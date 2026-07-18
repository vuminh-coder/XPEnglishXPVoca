"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { motion, AnimatePresence } from "framer-motion";
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
  Send,
  Loader2,
  Bot,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { Button, Badge } from "@/components/ui";

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
  const { user, awardXp, awardCoins } = useAuthStore();
  const { challenges, initChallenges } = useDailyChallengeStore();
  const { addToast } = useNotificationStore();
  const { learned } = useVocabularyStore();

  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);

  useEffect(() => {
    initChallenges();
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("xp_claimed_challenges");
      if (stored) {
        try {
          setClaimedList(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [initChallenges]);

  // Fetch current day's study plan task
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch("/api/study-plan/current");
        const json = await res.json();
        if (json.success && json.data) {
          const plan = json.data;
          const todayStr = new Date().toISOString().slice(0, 10);
          const todayTask = plan.dailyTasks.find((t: any) => {
            const taskDate = new Date(t.date).toISOString().slice(0, 10);
            return taskDate === todayStr;
          });
          if (todayTask) {
            setCurrentTask(todayTask.description);
          }
        }
      } catch (e) {
        console.error("Error fetching study plan:", e);
      }
    };
    fetchPlan();
  }, []);

  const wordsPracticedToday = useMemo(() => {
    if (!user) return 0;
    const todayStr = new Date().toISOString().slice(0, 10);
    return learned.filter((item) => {
      return (
        item.userId === user.id &&
        item.lastPracticed &&
        item.lastPracticed.slice(0, 10) === todayStr
      );
    }).length;
  }, [learned, user]);

  // Sync learn_words daily challenge progress automatically based on wordsPracticedToday
  useEffect(() => {
    if (wordsPracticedToday > 0) {
      const learnChallenge = challenges.find((c) => c.id === "learn_words");
      if (learnChallenge && learnChallenge.progress !== wordsPracticedToday) {
        const diff = wordsPracticedToday - learnChallenge.progress;
        if (diff > 0) {
          useDailyChallengeStore
            .getState()
            .incrementProgress("learn_words", diff);
        }
      }
    }
  }, [wordsPracticedToday, challenges]);

  const streakCalendar = useMemo(() => {
    if (!user) return [];
    const calendar = [];
    const today = new Date();

    // Load real active dates from localStorage
    let activeDates: string[] = [];
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`xp_voca_active_dates_${user.id}`);
        activeDates = stored ? JSON.parse(stored) : [];
      } catch (e) {}
    }

    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const cellDateStr = d.toISOString().slice(0, 10);
      const isActive = activeDates.includes(cellDateStr);
      calendar.push({
        date: d.toISOString().slice(5, 10),
        active: isActive,
      });
    }
    return calendar;
  }, [user]);

  // Real weekly XP computation
  const weeklyXp = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + dayDiff);

    // Load real daily XP mapping
    let dailyXpMap: Record<string, number> = {};
    if (typeof window !== "undefined" && user) {
      try {
        const stored = localStorage.getItem(`xp_voca_daily_xp_${user.id}`);
        dailyXpMap = stored ? JSON.parse(stored) : {};
      } catch (e) {}
    }

    const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    return labels.map((label, index) => {
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(startOfWeek.getDate() + index);
      const dateStr = targetDate.toISOString().slice(0, 10);
      const xp = dailyXpMap[dateStr] || 0;
      return { day: label, xp };
    });
  }, [user]);

  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + dayDiff);

    // Load real active dates
    let activeDates: string[] = [];
    if (typeof window !== "undefined" && user) {
      try {
        const stored = localStorage.getItem(`xp_voca_active_dates_${user.id}`);
        activeDates = stored ? JSON.parse(stored) : [];
      } catch (e) {}
    }

    const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    return labels.map((label, index) => {
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(startOfWeek.getDate() + index);
      const dateStr = targetDate.toISOString().slice(0, 10);
      const todayStr = today.toISOString().slice(0, 10);

      let status: "learned" | "missed" | "current" | "pending" = "pending";
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const hasLearned = activeDates.includes(dateStr);

      if (hasLearned) {
        status = "learned";
      } else if (isToday) {
        status = "current";
      } else if (isPast) {
        status = "missed";
      } else {
        status = "pending";
      }

      return { day: label, status };
    });
  }, [user]);

  if (!user) return null;

  const vocabPercent = Math.min(
    100,
    Math.round((user.wordsLearned / 3903) * 100),
  );
  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);
  const studyPercent = Math.min(
    100,
    Math.round((user.minutesStudied / 15) * 100),
  );
  const completedChallenges = challenges.filter((c) => c.isCompleted).length;
  const remainingWords = Math.max(0, 10 - wordsPracticedToday);

  const maxWeeklyXp = Math.max(...weeklyXp.map((d) => d.xp), 1);

  const quickActions = [
    {
      title: "Luyện tập từ vựng",
      description: "Flashcard, quiz và điền từ",
      href: "/study/practice",
      icon: PenLine,
      accent: "from-cyan-500/20 to-sky-500/20 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Đấu trường PvP",
      description: "So tài từ vựng thời gian thực",
      href: "/study/pvp",
      icon: Swords,
      accent:
        "from-indigo-500/20 to-violet-500/20 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Khám phá chủ đề",
      description: "Bộ từ theo chủ đề và mức độ",
      href: "/vocabulary",
      icon: Globe,
      accent:
        "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Cửa hàng vật phẩm",
      description: "Mua bình năng lượng & trang phục",
      href: "/shop",
      icon: Coins,
      accent:
        "from-yellow-500/20 to-amber-500/20 text-yellow-600 dark:text-yellow-400",
    },
  ];

  const handleClaimChallenge = (id: string, xp: number, coins: number) => {
    if (claimedList.includes(id)) return;
    const updated = [...claimedList, id];
    setClaimedList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_claimed_challenges", JSON.stringify(updated));
    }

    awardXp(xp);
    awardCoins(coins);

    addToast({
      type: "success",
      title: "Nhận thưởng thành công! 🎉",
      message: `Bạn nhận được +${xp} XP và +${coins} Vàng. Tiếp tục phát huy nhé!`,
      duration: 3500,
    });
  };

  const handleQuickAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              text: `Giải đáp ngắn gọn câu hỏi sau bằng tiếng Việt: ${aiQuestion}`,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setAiAnswer(data.reply);
        awardXp(10);
        addToast({
          type: "success",
          title: "AI đã trả lời! 🤖",
          message: "Bạn đã nhận được +10 XP cho việc tích cực học hỏi.",
        });
      } else {
        setAiAnswer(
          "Xin lỗi, AI Tutor tạm thời không thể kết nối. Hãy thử lại sau.",
        );
      }
    } catch (e) {
      console.error(e);
      setAiAnswer(
        "Không có kết nối mạng ổn định. Vui lòng kiểm tra lại đường truyền.",
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div
      className="space-y-6 md:space-y-8 pb-24 md:pb-8 px-1 md:px-0 relative"
      suppressHydrationWarning
    >
      {/* Mobile Landscape Orientation Overlay */}
      <div className="hidden max-lg:landscape:flex fixed inset-0 bg-[#f0f4f8] dark:bg-neutral-950 z-50 flex-col items-center justify-center p-6 text-center select-none" aria-hidden="true">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center text-blue-600 animate-bounce mb-3 overflow-hidden">
          <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
        </div>
        <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">Vui lòng xoay dọc điện thoại</h3>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">XP English | XP Voca hoạt động tốt nhất ở chế độ màn hình dọc.</p>
      </div>

      {/* 1. Header Row with Official Owl Logo */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 border-b border-slate-200/60 dark:border-neutral-800 pb-4"
      >
        <div className="space-y-1">
          <h1 className="text-xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Trang chủ học tập
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
            Lộ trình học từ vựng tiếng Anh thông minh và theo sát mục tiêu mỗi
            ngày.
          </p>
        </div>
        <Link href="/profile" className="self-start md:self-auto">
          <Button
            variant="secondary"
            className="h-10 px-4 text-xs font-black rounded-xl active:scale-[0.98] transition-all border border-amber-500/30 hover:border-amber-500/60 text-slate-900 dark:text-white shadow-sm flex items-center gap-2"
            leftIcon={
              <Trophy
                className="w-4 h-4 text-amber-500 stroke-[2]"
              />
            }
          >
            Bảng thành tích
          </Button>
        </Link>
      </motion.div>

      {/* 2. Responsive Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-max"
      >
        {/* ROW 1: Learning Path (2 cols) & Streak Tracker (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#0059bb]/10 via-sky-500/10 to-amber-500/10 h-full flex flex-col justify-between min-h-[170px] border border-blue-500/10">
              <div>
                <div className="mb-2">
                  <Badge
                    variant="primary"
                    className="gap-1.5 bg-white/80 border-blue-500/30 dark:bg-neutral-900/80 dark:border-white/10 text-xs font-black text-[#0059bb] dark:text-blue-400 py-1 px-2.5 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
                    Lộ trình hôm nay
                  </Badge>
                </div>
                <h2 className="text-base md:text-xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  {currentTask || "Unit 5: Office & Work Communications"}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                  Hãy học thêm <span className="text-[#0059bb] dark:text-sky-400 font-extrabold">{remainingWords} từ vựng mới</span> để hoàn thành mục
                  tiêu ngày hôm nay.
                </p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <Link href="/study/practice" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto h-11 sm:h-12 px-5 font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 hover:opacity-95 text-white shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 border border-blue-400/20"
                    rightIcon={
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    }
                  >
                    Bắt đầu học ngay
                  </Button>
                </Link>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center sm:text-right">
                  Tiến trình: <span className="text-[#0059bb] dark:text-sky-400 font-black">{10 - remainingWords}</span> / 10 từ
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                  Streak của bạn
                </span>
                <Flame
                  className="h-5 w-5 text-amber-500 animate-pulse stroke-[2]"
                />
              </div>
              <div className="text-center my-1.5">
                <div className="text-2xl md:text-3xl font-black text-amber-500 font-display">
                  {user.currentStreak} ngày
                </div>
              </div>

              <div className="flex justify-between gap-1 mt-1 bg-slate-50 dark:bg-neutral-900/50 p-2 rounded-xl border border-black/5 dark:border-white/5">
                {weekDays.map((wd, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">
                      {wd.day}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                        wd.status === "learned"
                          ? "bg-amber-500 text-white shadow-sm"
                          : wd.status === "current"
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white animate-bounce shadow-md"
                            : wd.status === "missed"
                              ? "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400"
                              : "bg-slate-200 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400 font-extrabold"
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
            </div>
          </div>
        </motion.div>

        {/* ROW 2: Challenges Panel (2 cols) & Combined Stats List (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-2">
                <div className="flex items-center gap-2">
                  <Target
                    className="h-4.5 w-4.5 text-[#0059bb] dark:text-sky-400 stroke-[2]"
                  />
                  <h2 className="text-sm font-black text-slate-900 dark:text-white font-display">
                    Nhiệm vụ hôm nay
                  </h2>
                </div>
                <Badge
                  variant="primary"
                  className="font-extrabold text-xs py-0.5 px-2.5"
                >
                  Hoàn thành {completedChallenges}/{challenges.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {challenges.map((ch) => {
                  const hasReachedGoal = ch.progress >= ch.target;
                  const isClaimed = claimedList.includes(ch.id);

                  return (
                    <div
                      key={ch.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/50 border border-slate-200/60 dark:border-neutral-800/60 shadow-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl w-9 h-9 rounded-xl bg-white dark:bg-neutral-850 border border-slate-200/60 dark:border-white/10 flex items-center justify-center shadow-sm shrink-0">
                          {ch.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={`text-xs sm:text-sm font-black ${
                              isClaimed
                                ? "text-slate-400 dark:text-slate-500 line-through opacity-70"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {ch.title}
                          </h3>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {ch.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-dashed border-slate-200/80 dark:border-neutral-800/80 pt-2 sm:pt-0 sm:border-0 w-full sm:w-auto shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                            Tiến trình: <span className="text-[#0059bb] dark:text-sky-400 font-black">{ch.progress}</span> / {ch.target}
                          </span>
                          <div className="h-1.5 w-24 sm:w-28 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isClaimed ? "bg-emerald-500" : "bg-gradient-to-r from-[#0059bb] to-indigo-600"
                              }`}
                              style={{
                                width: `${Math.min(100, (ch.progress / ch.target) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="w-auto sm:w-28 flex justify-end shrink-0">
                          {hasReachedGoal ? (
                            isClaimed ? (
                              <Badge
                                variant="success"
                                className="font-extrabold text-xs py-1 px-3 shadow-sm whitespace-nowrap"
                              >
                                ĐÃ NHẬN
                              </Badge>
                            ) : (
                              <button
                                onClick={() =>
                                  handleClaimChallenge(
                                    ch.id,
                                    ch.xpReward,
                                    ch.coinReward,
                                  )
                                }
                                className="px-3.5 h-9 text-center text-xs font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:opacity-95 text-white rounded-xl shadow-md active:scale-[0.98] transition-transform uppercase tracking-wider cursor-pointer border border-emerald-400/30 whitespace-nowrap"
                              >
                                Nhận +{ch.xpReward} XP
                              </button>
                            )
                          ) : (
                            <Badge
                              variant="neutral"
                              className="text-xs font-black py-1 px-3 whitespace-nowrap"
                            >
                              CHƯA XONG
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 space-y-4 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 block border-b border-slate-100 dark:border-neutral-850 pb-2">
                  Chỉ số tổng quan
                </span>

                <div className="space-y-3.5 mt-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl text-sky-600 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        Từ đã học
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                      {user.wordsLearned}/3903 ({vocabPercent}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl text-amber-600 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Zap className="h-4 w-4 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        Kinh nghiệm
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                      {user.totalXp} XP (LV {user.level})
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        Thời gian học
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                      {user.minutesStudied}m ({studyPercent}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                        <Coins className="h-4 w-4 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        Kho Vàng
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 font-display">
                      {user.coins ?? 0} Vàng
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider text-center pt-2 border-t border-slate-100 dark:border-neutral-850 mt-3">
                Cập nhật tự động ⚡
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROW 3: AI Tutor (2 cols) & PVP Arena (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between">
              <form onSubmit={handleQuickAskSubmit} className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-2 border-b border-slate-100 dark:border-neutral-850 pb-2">
                  <Bot className="h-4.5 w-4.5 text-cyan-600 dark:text-cyan-400 stroke-[2]" />{" "}
                  Hỏi đáp nhanh cùng AI Tutor
                </h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Giải đáp câu hỏi ngữ pháp hoặc từ vựng tiếng Anh
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-full h-11 px-4 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Ví dụ: Phân biệt 'make' và 'do'?"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="h-11 px-4 font-black flex items-center gap-1.5 text-xs rounded-xl bg-gradient-to-r from-[#0059bb] to-blue-600 hover:opacity-95 text-white shadow-md shrink-0 active:scale-[0.98] transition-transform"
                    >
                      {isAiLoading ? (
                        <Loader2
                          className="h-4 w-4 animate-spin stroke-[2]"
                        />
                      ) : (
                        <Send className="h-4 w-4 stroke-[2]" />
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {aiAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-neutral-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed overflow-hidden shadow-inner"
                  >
                    <span className="font-black text-[#0059bb] dark:text-cyan-400 block mb-1 text-xs uppercase tracking-wide">
                      🤖 Giải đáp từ AI Tutor:
                    </span>
                    {aiAnswer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between min-h-[150px]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Đấu trường PvP
                </span>
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  14 Online
                </span>
              </div>
              <div className="py-2.5">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                  So tài từ vựng PvP
                </h3>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  Thi đấu PvP thời gian thực cùng bạn học toàn quốc để tích lũy
                  điểm kinh nghiệm.
                </p>
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/study/pvp" className="w-full">
                  <Button
                    variant="primary"
                    className="w-full h-11 px-4 font-black text-xs sm:text-sm rounded-xl bg-gradient-to-r from-[#0059bb] via-indigo-600 to-purple-600 hover:opacity-95 text-white shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 border border-indigo-400/20"
                  >
                    <Swords className="h-4 w-4 stroke-[2]" /> Thách đấu nhanh
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROW 4: Streak Calendar (2 cols) & Weekly XP Chart (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-neutral-850">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                    Streak Calendar
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5 font-display">
                    Lịch học 28 ngày
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 shadow-xs" /> Học
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-sm bg-slate-200 dark:bg-neutral-800" />{" "}
                    Lỡ
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {streakCalendar.map((cell, i) => (
                  <div
                    key={i}
                    className={`h-6 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-black transition-all ${
                      cell.active
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                    title={cell.date}
                  >
                    {cell.date.slice(3)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bezel h-full">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-neutral-850">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                    Phân bố kinh nghiệm
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5 font-display">
                    XP 7 ngày qua
                  </h3>
                </div>
                <Badge variant="primary" className="text-xs font-extrabold py-0.5 px-2.5">
                  {user.totalXp} XP
                </Badge>
              </div>
              <div className="flex items-end justify-between gap-1 h-24 sm:h-28 pt-2">
                {weeklyXp.map((d, i) => {
                  const heightPercent = Math.max(8, (d.xp / maxWeeklyXp) * 100);
                  const isToday = i === 5;
                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-[8px] font-bold text-slate-400">
                        {d.xp}
                      </span>
                      <div
                        className={`w-full rounded-t transition-all ${
                          isToday
                            ? "bg-gradient-to-t from-sky-500 to-cyan-400"
                            : "bg-slate-200 dark:bg-neutral-800"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] font-bold text-slate-450">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROW 5: Quick shortcuts */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="bezel">
            <div className="bezel-inner p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block border-b border-slate-100 dark:border-neutral-850 pb-2">
                Phím tắt nhanh
              </span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      key={action.title}
                    >
                      <Link
                        href={action.href}
                        className="group block rounded-2xl border border-slate-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`rounded-xl bg-gradient-to-br ${action.accent} p-1.5 sm:p-2`}
                          >
                            <Icon className="h-4 w-4" strokeWidth={1.3} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {action.title}
                            </div>
                            <div className="text-[10px] text-slate-450 truncate mt-0.5 font-semibold">
                              {action.description}
                            </div>
                          </div>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-1 shrink-0"
                            strokeWidth={1.3}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
