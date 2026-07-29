"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore } from "@/lib/store/userStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BookmarkCheck,
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
  User as UserIcon,
  Shield,
  ChevronRight,
  X,
  SlidersHorizontal,
  Wand2,
  Headphones,
  Mic,
  MessageSquare,
  BarChart3,
  Award,
  CheckCircle2,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { LEVEL_TITLES } from "@/lib/constants";
import { Button, Badge } from "@/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
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
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeSkillTab, setActiveSkillTab] = useState<
    "dictation" | "shadowing" | "speaking" | "vocab" | "writing"
  >("dictation");
  const [leaderboardTab, setLeaderboardTab] = useState<"week" | "month">(
    "week",
  );
  const [leaderboardCriterion, setLeaderboardCriterion] = useState<
    "time" | "xp"
  >("time");

  useEffect(() => {
    initChallenges();
    if (typeof window !== "undefined") {
      const todayStr = new Date().toISOString().slice(0, 10);
      const storedDate = localStorage.getItem("xp_claimed_challenges_date");
      if (storedDate !== todayStr) {
        localStorage.setItem("xp_claimed_challenges_date", todayStr);
        localStorage.removeItem("xp_claimed_challenges");
        setClaimedList([]);
      } else {
        const stored = localStorage.getItem("xp_claimed_challenges");
        if (stored) {
          try {
            setClaimedList(JSON.parse(stored));
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [initChallenges]);

  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoadingLeaderboard(true);
        const res = await fetch("/api/leaderboard");
        const json = await res.json();
        if (json.success && json.data) {
          setLeaderboardData(json.data);
        }
      } catch (e) {
        console.error("Error fetching dashboard leaderboard:", e);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };
    fetchLeaderboard();
  }, []);

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

  // Real weekly XP computation
  const weeklyXp = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + dayDiff);

    let dailyXpMap: Record<string, number> = {};
    if (typeof window !== "undefined" && user) {
      try {
        const stored = localStorage.getItem(`xp_voca_daily_xp_${user.id}`);
        dailyXpMap = stored ? JSON.parse(stored) : {};
      } catch (e) {}
    }

    const dates = [
      "18 thg 7",
      "19 thg 7",
      "20 thg 7",
      "21 thg 7",
      "22 thg 7",
      "23 thg 7",
      "24 thg 7",
    ];
    return dates.map((dateStr, index) => {
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(startOfWeek.getDate() + index);
      const isoDate = targetDate.toISOString().slice(0, 10);
      const xp =
        dailyXpMap[isoDate] ||
        (index === 6 ? Math.max(5, user?.minutesStudied || 5) : 0);
      return { day: dateStr, xp };
    });
  }, [user]);

  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + dayDiff);

    let activeDates: string[] = [];
    if (typeof window !== "undefined" && user) {
      try {
        const stored = localStorage.getItem(`xp_voca_active_dates_${user.id}`);
        activeDates = stored ? JSON.parse(stored) : [];
      } catch (e) {}
    }

    const labels = ["M", "T", "W", "T", "F", "S", "S"];
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

  const savedWordsCount = useMemo(() => {
    if (!user) return 0;
    const count = learned.filter(
      (item) =>
        (item.userId === user.id || item.userId === "local_user") &&
        (item.isFavorite || (item.proficiency && item.proficiency > 0)),
    ).length;
    return Math.max(count, user.wordsLearned || 0);
  }, [learned, user]);

  const userRankInLeaderboard = useMemo(() => {
    if (!user) return 1;
    if (leaderboardData.length > 0) {
      const found = leaderboardData.find((l) => l.id === user.id);
      if (found) return found.rank;
      const higherXpCount = leaderboardData.filter(
        (l) => l.xp > (user.totalXp || 0),
      ).length;
      return higherXpCount + 1;
    }
    return 1;
  }, [user, leaderboardData]);

  const topLeaders = useMemo(() => {
    if (leaderboardData.length > 0) {
      return leaderboardData.slice(0, 3);
    }
    return [
      { id: "top1", fullName: "Nga Nguyễn", xp: 1450, avatarEmoji: "🦊" },
      {
        id: "top2",
        fullName: "Quang Nguyễn Định",
        xp: 1280,
        avatarEmoji: "🦁",
      },
      { id: "top3", fullName: "Minh Thu", xp: 1100, avatarEmoji: "🦉" },
    ];
  }, [leaderboardData]);

  if (!user) return null;

  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);
  const completedChallenges = challenges.filter(
    (c) =>
      (c.progress >= c.target || c.isCompleted) && claimedList.includes(c.id),
  ).length;
  const remainingWords = Math.max(0, 10 - wordsPracticedToday);
  const userTitle =
    LEVEL_TITLES[user.level] || user.title || "Vocabulary Builder";
  const maxWeeklyXp = Math.max(...weeklyXp.map((d) => d.xp), 10);

  const quickActions = [
    {
      title: "Luyện từ vựng",
      badge: "Flashcard & Quiz",
      href: "/study/practice",
      icon: PenLine,
      gradient: "from-blue-600 to-indigo-600",
      accent:
        "bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/20",
    },
    {
      title: "Đấu trường PvP",
      badge: "So tài Realtime",
      href: "/study/pvp",
      icon: Swords,
      gradient: "from-indigo-600 to-purple-600",
      accent:
        "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
    {
      title: "Khám phá chủ đề",
      badge: "Bộ từ 3,900+",
      href: "/vocabulary",
      icon: Globe,
      gradient: "from-emerald-600 to-teal-600",
      accent:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Cửa hàng vật phẩm",
      badge: "Vàng & Trang phục",
      href: "/shop",
      icon: Coins,
      gradient: "from-amber-500 to-orange-600",
      accent:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
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
    useUserStore.getState().addPracticeTime(5);

    addToast({
      type: "success",
      title: "Nhận thưởng thành công! 🎉",
      message: `+${xp} XP, +${coins} Vàng và +5m luyện tập đã được cộng vào tài khoản!`,
      duration: 3000,
    });
  };

  const handleCheckIn = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const checkinKey = `daily_checkin_${todayStr}`;

    if (claimedList.includes(checkinKey)) {
      addToast({
        type: "info",
        title: "Đã điểm danh hôm nay! ✨",
        message:
          "Bạn đã hoàn thành điểm danh hôm nay. Hãy tiếp tục duy trì chuỗi nhé!",
        duration: 3000,
      });
      return;
    }

    const updated = [...claimedList, checkinKey];
    setClaimedList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_claimed_challenges", JSON.stringify(updated));
    }

    awardXp(15);
    awardCoins(20);
    useUserStore.getState().addPracticeTime(5);

    addToast({
      type: "success",
      title: "Điểm danh thành công! 🔥",
      message:
        "+15 XP, +20 Vàng và +5 phút luyện tập đã được cộng vào tài khoản!",
      duration: 3000,
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
          title: "AI Tutor đã trả lời! 🤖",
          message: "+10 XP cho tinh thần chủ động học hỏi.",
        });
      } else {
        setAiAnswer(
          "AI Tutor đang bận. Vui lòng gửi lại câu hỏi sau giây lát.",
        );
      }
    } catch (e) {
      console.error(e);
      setAiAnswer("Không có kết nối mạng. Vui lòng kiểm tra lại đường truyền.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-2.5 sm:space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      {/* Mobile Landscape Orientation Overlay */}
      <div
        className="hidden max-lg:landscape:flex fixed inset-0 bg-[#f0f4f8] dark:bg-slate-950 z-50 flex-col items-center justify-center p-6 text-center select-none"
        aria-hidden="true"
      >
        <img
          src="/app-icon-horizontal-brand.png"
          alt="XP Logo"
          className="w-12 h-12 object-contain animate-bounce mb-3 shrink-0"
        />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
          Vui lòng xoay dọc điện thoại
        </h3>
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
          XP English | XP Voca hoạt động tốt nhất ở chế độ màn hình dọc.
        </p>
      </div>

      {/* 0. Top Hero Announcement Banner Card */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-row items-center justify-between gap-2 relative shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Wand2 className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <div className="min-w-0 flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#1d6ee6] text-white shadow-2xs shrink-0">
                  ✨ Mới ra mắt
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                  Luyện Writing với AI đã có mặt!
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Link href="/ai/tutor">
                <button className="px-2.5 py-1 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  Thử ngay <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                title="Đóng thông báo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. INTEGRATED HERO HEADER CARD (Micro Sharp - Chào mừng & 4 Hero Metrics) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3.5"
      >
        {/* Upper Greeting & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-1.5">
              <span>
                Chào mừng trở lại, {user.fullName || "Minh Vu Van"}! 👋
              </span>
            </h1>
            <p className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              Cố gắng lên nhé bạn ơi — mình tin bạn sẽ ngày càng tiến bộ!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <button className="px-2.5 py-1.5 rounded-md bg-[#20b26c] hover:bg-[#1b9a5d] text-white text-[11px] font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap">
              📹 Thêm Video/Audio
            </button>
            <button className="px-2.5 py-1.5 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-[11px] font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap">
              💬 Chia sẻ & góp ý
            </button>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />

        {/* Integrated 4 Micro-Sharp Hero Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Metric 1: Streak */}
          <div className="p-2 sm:p-2.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5 flex items-center gap-2">
            <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-sm bg-orange-50 dark:bg-orange-950/60 border border-orange-200/50 dark:border-orange-900/40 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs">
              <Flame className="w-3.5 h-3.5 stroke-[2.2] animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-base font-black font-display text-slate-900 dark:text-white truncate">
                {user.currentStreak}{" "}
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  ngày
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-slate-400 truncate">
                Chuỗi hiện tại
              </div>
            </div>
          </div>

          {/* Metric 2: Study Time */}
          <div className="p-2 sm:p-2.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5 flex items-center gap-2">
            <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-sm bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-900/40 text-blue-500 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-base font-black font-display text-slate-900 dark:text-white truncate">
                0h {user.minutesStudied || 5}m
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-slate-400 truncate">
                Thời gian luyện tập
              </div>
            </div>
          </div>

          {/* Metric 3: Saved Words */}
          <div className="p-2 sm:p-2.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5 flex items-center gap-2">
            <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-sm bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-900/40 text-emerald-500 flex items-center justify-center shrink-0 shadow-2xs">
              <BookmarkCheck className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-base font-black font-display text-slate-900 dark:text-white truncate">
                {savedWordsCount}{" "}
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  từ
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-slate-400 truncate">
                Từ đã lưu
              </div>
            </div>
          </div>

          {/* Metric 4: XP Level */}
          <div className="p-2 sm:p-2.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-sm bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center shrink-0">
                  <Target className="w-3 h-3 stroke-[2.2]" />
                </div>
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white">
                  {user.totalXp}{" "}
                  <span className="text-[9px] font-bold text-indigo-500">
                    XP
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase px-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                Lv.{user.level}
              </span>
            </div>
            <div className="mt-1">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-0.5">
                <span className="truncate">{userTitle}</span>
                <span>{xpPercent}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN BENTO GRID (Cột Trái 7/12 - Cột Phải 5/12 - Sharp Micro Spacing) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-3.5"
      >
        {/* CỘT TRÁI: MAIN LEARNING HUB (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* Hero Daily Learning Command Card */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900/40 border border-blue-200/60 dark:border-blue-800/30 shadow-xs space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="primary"
                  className="gap-1 bg-blue-600/10 text-blue-600 dark:text-sky-400 py-0.5 px-2 font-bold text-[10px] rounded border border-blue-500/20"
                >
                  <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                  LỘ TRÌNH HÔM NAY
                </Badge>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  Tiến trình:{" "}
                  <span className="text-blue-600 dark:text-sky-400 font-display text-xs font-black">
                    {10 - remainingWords}
                  </span>
                  /10 từ
                </span>
              </div>

              <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white font-display leading-snug line-clamp-2 sm:line-clamp-none">
                {currentTask ||
                  "Ngày 13: Luyện nghe TOEIC Part 6: Text Completion & Liên từ/Trạng từ. Hoàn thành 10 câu trắc nghiệm nghe và ghi chú các từ mới."}
              </h2>

              <div className="grid grid-cols-3 gap-1 sm:flex sm:items-center sm:gap-1.5">
                <span className="inline-flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-2xs whitespace-nowrap">
                  🎯{" "}
                  <span className="text-blue-600 dark:text-sky-400 font-black">
                    {remainingWords}
                  </span>{" "}
                  từ chưa học
                </span>
                <span className="inline-flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-2xs whitespace-nowrap">
                  ⏱️ ~15 phút
                </span>
                <span className="inline-flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-2xs whitespace-nowrap">
                  ⚡ +50 XP
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-blue-500/10 dark:border-white/5">
                <div className="flex-1 max-w-xs h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, ((10 - remainingWords) / 10) * 100)}%`,
                    }}
                  />
                </div>

                <Link href="/study/practice" className="shrink-0">
                  <Button
                    variant="primary"
                    className="h-8 px-3.5 font-bold text-xs rounded bg-[#1d6ee6] hover:bg-[#155bc5] text-white shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                    rightIcon={<ArrowRight className="w-3 h-3 stroke-[2.5]" />}
                  >
                    Bắt đầu học
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Interactive Skill Analytics & 7-Day Graph Card */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3.5">
              {/* Skill Tabs Bar */}
              <div className="p-0.5 bg-slate-100 dark:bg-slate-950 rounded-md flex items-center gap-0.5 overflow-x-auto no-scrollbar border border-slate-200/50 dark:border-white/5">
                <button
                  onClick={() => setActiveSkillTab("dictation")}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeSkillTab === "dictation"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Headphones className="w-3 h-3" /> Dictation
                </button>
                <button
                  onClick={() => setActiveSkillTab("shadowing")}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeSkillTab === "shadowing"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Mic className="w-3 h-3" /> Shadowing
                </button>
                <button
                  onClick={() => setActiveSkillTab("speaking")}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeSkillTab === "speaking"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-3 h-3" /> Nói
                </button>
                <button
                  onClick={() => setActiveSkillTab("vocab")}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeSkillTab === "vocab"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <BookOpen className="w-3 h-3" /> Từ vựng
                </button>
                <button
                  onClick={() => setActiveSkillTab("writing")}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeSkillTab === "writing"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Wand2 className="w-3 h-3" /> Viết
                </button>
              </div>

              {/* Weekly Practice Time Line Graph (Biểu đồ đường mỏng tinh tế, không chấm) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 font-display flex items-center gap-1.5 truncate">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span className="hidden sm:inline">
                      Phút luyện tập (7 ngày gần đây)
                    </span>
                    <span className="sm:hidden">Luyện tập (7 ngày)</span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-black text-blue-600 dark:text-sky-400 shrink-0">
                    Tổng: {user.minutesStudied || 5}m
                  </span>
                </div>

                <div className="relative pt-2 bg-slate-50/40 dark:bg-slate-950/40 rounded-md border border-slate-100 dark:border-white/5 overflow-hidden">
                  {/* Ultra-Thin Smooth SVG Line & Area Chart Edge-to-Edge */}
                  <div className="w-full h-16 sm:h-20 relative">
                    <svg
                      viewBox="0 0 700 120"
                      className="w-full h-full overflow-hidden"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="lineChartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#1d6ee6"
                            stopOpacity="0.25"
                          />
                          <stop
                            offset="100%"
                            stopColor="#1d6ee6"
                            stopOpacity="0.0"
                          />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line
                        x1="0"
                        y1="20"
                        x2="700"
                        y2="20"
                        stroke="currentColor"
                        className="text-slate-200/50 dark:text-white/5"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="0"
                        y1="60"
                        x2="700"
                        y2="60"
                        stroke="currentColor"
                        className="text-slate-200/50 dark:text-white/5"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="0"
                        y1="100"
                        x2="700"
                        y2="100"
                        stroke="currentColor"
                        className="text-slate-200/50 dark:text-white/5"
                      />

                      {(() => {
                        const points = weeklyXp.map((d, i) => {
                          const x = i * (700 / 6);
                          const y = 100 - (d.xp / maxWeeklyXp) * 70;
                          return { x, y, day: d.day, xp: d.xp };
                        });

                        // Generate smooth monotone bezier curve edge-to-edge
                        let pathD = `M ${points[0].x},${points[0].y}`;
                        for (let i = 0; i < points.length - 1; i++) {
                          const p0 = points[i];
                          const p1 = points[i + 1];
                          const cp1x = p0.x + (p1.x - p0.x) / 2;
                          const cp1y = p0.y;
                          const cp2x = p0.x + (p1.x - p0.x) / 2;
                          const cp2y = p1.y;
                          pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
                        }

                        const areaD = `${pathD} L 700,100 L 0,100 Z`;

                        return (
                          <>
                            {/* Gradient Area Fill */}
                            <path d={areaD} fill="url(#lineChartGradient)" />

                            {/* Ultra-Thin Smooth Line (Edge-to-Edge 100% width) */}
                            <path
                              d={pathD}
                              fill="none"
                              stroke="#1d6ee6"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* 7 Date labels perfectly aligned in grid */}
                  <div className="grid grid-cols-7 text-center pt-1 border-t border-slate-100 dark:border-white/5">
                    {weeklyXp.map((d, i) => (
                      <span
                        key={i}
                        className={`text-[9px] font-bold ${
                          i === 6
                            ? "text-blue-600 dark:text-sky-400 font-black"
                            : "text-slate-400"
                        }`}
                      >
                        {d.day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary CTA Card embedded inside graph block */}
              <div className="p-2.5 rounded-md bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      Vào học từ mới bạn ơi!
                    </h3>
                    <p className="hidden sm:block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      Khám phá bộ từ và mở rộng vốn từ vựng
                    </p>
                  </div>
                </div>

                <Link href="/vocabulary">
                  <button className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer shrink-0">
                    Học từ mới
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Ask AI Tutor Widget */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 sm:space-y-2.5">
              <form onSubmit={handleQuickAskSubmit} className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 flex items-center gap-1.5 font-display shrink-0">
                    <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 stroke-[2.2] shrink-0" />
                    <span className="hidden sm:inline">
                      HỎI ĐÁP NHANH CÙNG AI TUTOR
                    </span>
                    <span className="sm:hidden">HỎI ĐÁP AI TUTOR</span>
                  </h3>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 shrink-0">
                    +10 XP / câu hỏi
                  </span>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="ai-prompt-input"
                    className="text-[11px] font-bold text-slate-700 dark:text-slate-300"
                  >
                    Đặt câu hỏi từ vựng hoặc ngữ pháp:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="ai-prompt-input"
                      type="text"
                      className="w-full h-10 md:h-8 px-2.5 text-xs font-medium rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all shadow-inner"
                      placeholder="Ví dụ: Phân biệt 'make' và 'do'?"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="h-10 md:h-8 px-3 font-bold flex items-center gap-1 text-xs rounded bg-[#1d6ee6] hover:bg-[#155bc5] text-white shadow-2xs shrink-0 active:scale-95 transition-transform cursor-pointer"
                    >
                      {isAiLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin stroke-[2]" />
                      ) : (
                        <Send className="h-3 w-3 stroke-[2]" />
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
                    className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed overflow-hidden shadow-inner"
                  >
                    <span className="font-bold text-blue-600 dark:text-sky-400 block mb-1 text-[11px] uppercase tracking-wide flex items-center gap-1">
                      🤖 AI Tutor trả lời:
                    </span>
                    {aiAnswer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* CỘT PHẢI: GAMIFIED COMPACT SIDEBAR (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Widget 1: FLUID CONNECTED STREAK ATTENDANCE TRACK */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 sm:space-y-3">
              {/* Header with Flame Badge & Action CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5 gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xs flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                      Điểm danh tuần này
                    </h3>
                    <span className="text-[10px] font-extrabold text-orange-500 block">
                      🔥 Chuỗi {user.currentStreak} ngày liên tiếp
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckIn}
                  className="w-full sm:w-auto justify-center px-3 py-1.5 sm:py-1 rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] font-black transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 font-display"
                >
                  🔥 Điểm danh ngay (+15 XP)
                </button>
              </div>

              {/* Fluid Connected Progress Track */}
              <div className="relative py-1 px-1">
                {/* Background Track Line */}
                <div className="h-1 bg-slate-100 dark:bg-slate-800 absolute top-[28px] left-[5%] right-[5%] z-0 rounded-full" />

                {/* Active Progress Line */}
                <div
                  className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 absolute top-[28px] left-[5%] z-0 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(0, Math.min(90, (weekDays.filter((w) => w.status === "learned" || w.status === "current").length / 7) * 90))}%`,
                  }}
                />

                {/* 7 Connected Nodes */}
                <div className="flex items-center justify-between relative z-10">
                  {weekDays.map((wd, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        {wd.day}
                      </span>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                          wd.status === "learned"
                            ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xs scale-105"
                            : wd.status === "current"
                              ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white ring-4 ring-orange-500/25 animate-bounce shadow-md"
                              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400"
                        }`}
                      >
                        {wd.status === "learned"
                          ? "🔥"
                          : wd.status === "current"
                            ? "⚡"
                            : "•"}
                      </div>

                      <span
                        className={`text-[8px] font-extrabold tracking-tight ${
                          wd.status === "current"
                            ? "text-orange-500 font-black"
                            : wd.status === "learned"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-400"
                        }`}
                      >
                        {wd.status === "current"
                          ? "Hôm nay"
                          : wd.status === "learned"
                            ? "Đã nhận"
                            : "+10XP"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Motivation Reward Strip */}
              <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-700 dark:text-amber-300 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 truncate">
                  🎁 Điểm danh đủ 7 ngày nhận ngay{" "}
                  <span className="hidden sm:inline font-black text-amber-600 dark:text-amber-400">
                    +100 Vàng & Badge
                  </span>
                </span>
                <span className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-500 text-white">
                  Thưởng tuần
                </span>
              </div>
            </div>
          </motion.div>

          {/* Widget 2: Micro Sharp Mini Leaderboard */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 sm:space-y-2.5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 gap-2">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Trophy className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    Bảng xếp hạng
                  </span>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                  <div className="p-0.5 bg-slate-100 dark:bg-slate-800 rounded flex text-[9px] font-bold">
                    <button
                      onClick={() => setLeaderboardTab("week")}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        leaderboardTab === "week"
                          ? "bg-white dark:bg-slate-900 shadow-2xs font-extrabold text-slate-900 dark:text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Tuần
                    </button>
                    <button
                      onClick={() => setLeaderboardTab("month")}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        leaderboardTab === "month"
                          ? "bg-white dark:bg-slate-900 shadow-2xs font-extrabold text-slate-900 dark:text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Tháng
                    </button>
                  </div>
                  <Link
                    href="/community/leaderboard"
                    className="text-[10px] font-bold text-blue-600 dark:text-sky-400 hover:underline shrink-0"
                  >
                    Tất cả ➔
                  </Link>
                </div>
              </div>

              {/* Criterion Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLeaderboardCriterion("time")}
                  className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1 border ${
                    leaderboardCriterion === "time"
                      ? "bg-[#1d6ee6] text-white border-transparent shadow-2xs font-extrabold"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-white/5"
                  }`}
                >
                  <Clock className="w-3 h-3" /> Thời gian
                </button>
                <button
                  onClick={() => setLeaderboardCriterion("xp")}
                  className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1 border ${
                    leaderboardCriterion === "xp"
                      ? "bg-[#1d6ee6] text-white border-transparent shadow-2xs font-extrabold"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-white/5"
                  }`}
                >
                  <Award className="w-3 h-3" /> Điểm
                </button>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-1.5 pt-0.5">
                {/* User Row (Live Synced) */}
                <div className="flex items-center justify-between p-2 rounded bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-black text-blue-600 dark:text-sky-400 shrink-0">
                      #{userRankInLeaderboard}
                    </span>
                    <div className="w-5.5 h-5.5 rounded-full bg-[#0059bb] text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-2xs">
                      {user?.avatarEmoji ||
                        (user?.fullName || "X").charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      Bạn
                    </span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500 text-white shadow-2xs font-mono">
                    {leaderboardCriterion === "xp"
                      ? `${user?.totalXp || 0} XP`
                      : `${user?.minutesStudied || 0}m`}
                  </span>
                </div>

                {/* Top 3 Leaders (Live Synced from Backend API) */}
                {topLeaders.map((leader: any, idx: number) => {
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";
                  const displayScore =
                    leaderboardCriterion === "xp"
                      ? `${leader.xp} XP`
                      : `${Math.max(5, Math.round(leader.xp / 10))}m`;

                  return (
                    <div
                      key={leader.id || idx}
                      className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs shrink-0">{medal}</span>
                        <div className="w-5.5 h-5.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[9px] flex items-center justify-center shrink-0">
                          {leader.avatarEmoji ||
                            leader.fullName?.charAt(0) ||
                            "🦉"}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-900 dark:text-white truncate block">
                            {leader.fullName}
                          </span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500 text-white shadow-2xs font-mono">
                        {displayScore}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Widget 3: Compact Daily Quests Card */}
          <motion.div variants={itemVariants}>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <div className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 stroke-[2.2]" />
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    Nhiệm vụ hôm nay
                  </h2>
                </div>
                <Badge
                  variant="primary"
                  className="font-bold text-[9px] py-0.2 px-1.5"
                >
                  {completedChallenges}/{challenges.length} HOÀN THÀNH
                </Badge>
              </div>

              <div className="space-y-1.5">
                {challenges.map((ch) => {
                  const hasReachedGoal =
                    ch.progress >= ch.target || ch.isCompleted;
                  const isClaimed = claimedList.includes(ch.id);
                  const isTaskFullyCompleted = hasReachedGoal && isClaimed;

                  return (
                    <div
                      key={ch.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs w-6 h-6 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs">
                          {ch.icon}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={`text-[11px] font-bold truncate ${
                              isTaskFullyCompleted
                                ? "text-slate-400 dark:text-slate-500 line-through"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {ch.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <div>
                          {isTaskFullyCompleted ? (
                            <Badge
                              variant="success"
                              className="font-bold text-[9px] py-0.2 px-1"
                            >
                              ĐÃ NHẬN
                            </Badge>
                          ) : hasReachedGoal ? (
                            <button
                              onClick={() =>
                                handleClaimChallenge(
                                  ch.id,
                                  ch.xpReward,
                                  ch.coinReward,
                                )
                              }
                              className="px-2 h-6 text-[9px] font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded shadow-2xs active:scale-95 transition-transform uppercase tracking-wider cursor-pointer whitespace-nowrap"
                            >
                              Nhận +{ch.xpReward} XP
                            </button>
                          ) : (
                            <Badge
                              variant="neutral"
                              className="text-[9px] font-bold py-0.2 px-1"
                            >
                              {ch.progress}/{ch.target}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. DEDICATED MICRO-SHARP FULL-WIDTH QUICK ACTIONS AT BOTTOM (100% WIDTH - 4 CARDS) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 20,
          delay: 0.06,
        }}
        className="space-y-2 pt-1"
      >
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span>PHÍM TẮT NHANH</span>
            <span className="hidden sm:inline text-slate-400 font-normal">
              (QUICK ACTIONS)
            </span>
          </h2>
          <span className="hidden sm:inline text-[10px] font-semibold text-slate-400">
            Truy cập siêu tốc ⚡
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                key={action.title}
              >
                <Link
                  href={action.href}
                  className="group block p-2 sm:p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 shadow-2xs hover:shadow-2xs relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] font-medium text-slate-400 truncate mt-0.5">
                        {action.badge}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
