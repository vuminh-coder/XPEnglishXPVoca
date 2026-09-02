"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import DashboardLoading from "./loading";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useUiStore } from "@/stores/uiStore";
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
  ChevronRight,
  X,
  Wand2,
  Headphones,
  Mic,
  Volume2,
  MessageSquare,
  BarChart3,
  Award,
  Video,
  Gift,
  RotateCcw,
  Search,
  Check,
  CheckCircle2,
  Layout,
  Star,
  FileText,
  Minus,
  Quote,
  Shuffle,
  Play,
  Menu,
  Sun,
  Moon,
  Home,
  Compass,
  ListOrdered,
} from "lucide-react";
import { getXpProgress } from "@/shared/utils/calculateXP";
import { LEVEL_TITLES } from "@/shared/constants";
import { Button, Badge } from "@/shared/components/ui";
import {
  getWeeklySkillMinutes,
  hydrateSkillMinutesFromBackend,
  SKILL_CONFIGS,
  SkillType,
} from "@/stores/skillChartStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { FormattedAiText } from "@/shared/components/FormattedAiText";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

const Duolingo3DFlame = ({ className = "w-20 h-20 sm:w-24 sm:h-24" }: { className?: string }) => (
  <motion.div
    className={`relative flex items-center justify-center ${className}`}
    animate={{
      scale: [1, 1.05, 1],
      y: [0, -3, 0],
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Crystal 3D Dual-Tone Flame Image with 100% Clean Transparent Alpha */}
    <img
      src="/images/streak-flame-crystal.png"
      alt="Streak Crystal Flame"
      className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(245,158,11,0.25)] relative z-10 select-none pointer-events-none transform hover:scale-105 transition-transform duration-300"
    />
  </motion.div>
);

/**
 * Custom hook to smoothly interpolate 7 Y-coordinates for continuous Bezier path morphing across tab switches
 */
function useInterpolatedYPoints(targetYPoints: number[], duration = 320) {
  const [currentYPoints, setCurrentYPoints] = useState<number[]>(targetYPoints);
  const startYRef = useRef<number[]>(targetYPoints);
  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    startYRef.current =
      currentYPoints.length === targetYPoints.length
        ? [...currentYPoints]
        : [...targetYPoints];
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextY = startYRef.current.map((startVal, idx) => {
        const targetVal = targetYPoints[idx] ?? startVal;
        return startVal + (targetVal - startVal) * ease;
      });

      setCurrentYPoints(nextY);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetYPoints.join(",")]);

  return currentYPoints;
}

export default function DashboardPage() {
  const { user: authUser, awardXp, awardCoins } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;
  const { challenges, initChallenges } = useDailyChallengeStore();
  const { addToast } = useNotificationStore();
  const { learned } = useVocabularyStore();
  const { toggleSidebar, theme, toggleTheme } = useUiStore();

  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeSkillTab, setActiveSkillTab] = useState<
    "dictation" | "shadowing" | "speaking" | "vocab" | "writing"
  >("dictation");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(4);
  const [leaderboardTab, setLeaderboardTab] = useState<"week" | "month">("week");
  const [leaderboardCriterion, setLeaderboardCriterion] = useState<
    "time" | "xp"
  >("time");

  // Database-driven States
  const [isCheckedInToday, setIsCheckedInToday] = useState(false);
  const [activeDaysInWeek, setActiveDaysInWeek] = useState<string[]>([]);
  const [isLoadingCheckin, setIsLoadingCheckin] = useState(true);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [serverChallenges, setServerChallenges] = useState<any[]>([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  const [claimingChallengeId, setClaimingChallengeId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Handle OAuth user payload from Google/Facebook redirect
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const oauthUserRaw = params.get("oauth_user");
      if (oauthUserRaw) {
        try {
          const userObj = JSON.parse(decodeURIComponent(oauthUserRaw));
          if (userObj && userObj.id) {
            useUserStore.getState().setUserPayload(userObj);
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          }
        } catch (err) {
          console.error("Error parsing oauth_user payload:", err);
        }
      }
      useUserStore.getState().checkSession();
    }

    initChallenges();

    // 2. Fetch Live Daily Checkin Status from PostgreSQL
    const fetchCheckinStatus = async () => {
      try {
        setIsLoadingCheckin(true);
        const res = await fetch("/api/user/daily-checkin");
        const json = await res.json();
        if (json.success && json.data) {
          setIsCheckedInToday(Boolean(json.data.isCheckedInToday));
          setActiveDaysInWeek(json.data.activeDaysInWeek || []);
        }
      } catch (e) {
        console.error("Error fetching live checkin status:", e);
      } finally {
        setIsLoadingCheckin(false);
      }
    };
    fetchCheckinStatus();

    // 3. Fetch Live Daily Challenges from PostgreSQL
    const fetchChallenges = async () => {
      try {
        setIsLoadingChallenges(true);
        const res = await fetch("/api/user/challenges");
        const json = await res.json();
        if (json.success && json.data?.challenges) {
          setServerChallenges(json.data.challenges);
        }
      } catch (e) {
        console.error("Error fetching live challenges:", e);
      } finally {
        setIsLoadingChallenges(false);
      }
    };
    fetchChallenges();
  }, [initChallenges]);

  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoadingLeaderboard(true);
        const res = await fetch(`/api/leaderboard?period=${leaderboardTab}`);
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
  }, [leaderboardTab]);

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

  const [chartDataVersion, setChartDataVersion] = useState(0);

  // Hydrate 7-day skill practice minutes from backend database on mount
  useEffect(() => {
    if (user?.id) {
      hydrateSkillMinutesFromBackend(user.id).then(() => {
        setChartDataVersion((v) => v + 1);
      });
    }
  }, [user?.id]);

  // Per-skill weekly practice computation
  const currentSkillConfig = SKILL_CONFIGS[activeSkillTab];
  const skillWeeklyChartData = useMemo(() => {
    return getWeeklySkillMinutes(user?.id, activeSkillTab);
  }, [user, activeSkillTab, chartDataVersion]);

  const skillTotalMinutes = useMemo(() => {
    return skillWeeklyChartData.reduce((acc, curr) => acc + curr.minutes, 0);
  }, [skillWeeklyChartData]);

  const maxSkillMinutes = useMemo(() => {
    const rawMax = Math.max(...skillWeeklyChartData.map((d) => d.minutes), 0);
    return Math.max(60, Math.ceil(rawMax / 15) * 15);
  }, [skillWeeklyChartData]);

  const targetYPoints = useMemo(() => {
    return skillWeeklyChartData.map((d) => {
      const ratio = Math.min(1, Math.max(0, d.minutes) / maxSkillMinutes);
      return 200 - ratio * 176;
    });
  }, [skillWeeklyChartData, maxSkillMinutes]);

  const animatedYPoints = useInterpolatedYPoints(targetYPoints, 320);

  // Database-Synced 7-Day Stepper
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + dayDiff);

    const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    return labels.map((label, index) => {
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(startOfWeek.getDate() + index);
      const dateStr = targetDate.toISOString().slice(0, 10);
      const todayStr = today.toISOString().slice(0, 10);

      let status: "learned" | "missed" | "current" | "pending" = "pending";
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const hasLearned = activeDaysInWeek.includes(dateStr) || (isToday && isCheckedInToday);

      if (hasLearned) {
        status = "learned";
      } else if (isToday) {
        status = "current";
      } else if (isPast) {
        status = "missed";
      } else {
        status = "pending";
      }

      return { day: label, status, dateStr };
    });
  }, [activeDaysInWeek, isCheckedInToday]);

  const savedWordsCount = useMemo(() => {
    if (!user) return 0;
    const count = learned.filter(
      (item) =>
        (item.userId === user.id || item.userId === "local_user") &&
        (item.isFavorite || (item.proficiency && item.proficiency > 0))
    ).length;
    return Math.max(count, user.wordsLearned || 0);
  }, [learned, user]);

  const userRankInLeaderboard = useMemo(() => {
    if (!user) return 1;
    if (leaderboardData.length > 0) {
      const found = leaderboardData.find((l) => l.id === user.id);
      if (found) return found.rank;
      const higherXpCount = leaderboardData.filter(
        (l) => l.xp > (user.totalXp || 0)
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

  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);

  // Computed Challenge display: priority to serverChallenges if available, else local store
  const displayChallenges = useMemo(() => {
    if (serverChallenges.length > 0) {
      return serverChallenges;
    }
    return challenges.map((c) => ({
      ...c,
      isClaimed: claimedList.includes(c.id),
    }));
  }, [serverChallenges, challenges, claimedList]);

  const completedChallenges = displayChallenges.filter(
    (c) => (c.progress >= c.target || c.isCompleted) && c.isClaimed
  ).length;

  const remainingWords = Math.max(0, 10 - wordsPracticedToday);
  const userTitle =
    LEVEL_TITLES[user.level] || user.title || "Vocabulary Builder";

  // Dynamic routing based on study task
  const studyPlanTargetUrl = useMemo(() => {
    if (!currentTask) return "/study/practice";
    const t = currentTask.toLowerCase();
    if (t.includes("nghe") || t.includes("dictation") || t.includes("listening")) return "/study/listening";
    if (t.includes("nói") || t.includes("shadowing") || t.includes("speaking") || t.includes("phát âm")) return "/study/shadowing";
    if (t.includes("đề") || t.includes("exam") || t.includes("toeic") || t.includes("ielts")) return "/study/exam-prep";
    return "/study/practice";
  }, [currentTask]);

  const quickActions = [
    {
      title: "Luyện Nghe (Dictation)",
      shortTitle: "Luyện Nghe",
      badge: "Audio Studio & Sóng âm",
      href: "/study/listening",
      icon: Headphones,
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25",
      accent:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Luyện Nói (Shadowing)",
      shortTitle: "Luyện Nói",
      badge: "AI Chấm điểm 6 tiêu chí",
      href: "/study/shadowing",
      icon: Mic,
      gradient: "from-[#0059bb] to-indigo-600",
      shadow: "shadow-blue-500/25",
      accent:
        "bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border-blue-500/20",
    },
    {
      title: "Thi Thử Đề Chuẩn (Exam)",
      shortTitle: "Thi Thử Đề",
      badge: "37 Đề TOEIC & IELTS",
      href: "/study/exam-prep",
      icon: FileText,
      gradient: "from-rose-500 to-red-600",
      shadow: "shadow-rose-500/25",
      accent:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
    {
      title: "Đấu Trường 1v1 (PvP)",
      shortTitle: "Đấu Trường",
      badge: "Thách đấu Realtime",
      href: "/study/pvp",
      icon: Swords,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/25",
      accent:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  const handleClaimChallenge = async (id: string, xp: number, coins: number) => {
    if (claimingChallengeId) return;
    setClaimingChallengeId(id);

    try {
      const res = await fetch("/api/user/challenges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: id }),
      });
      const json = await res.json();

      if (json.success) {
        awardXp(xp);
        awardCoins(coins);
        useUserStore.getState().addPracticeTime(5);
        setServerChallenges((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isClaimed: true } : c))
        );
        addToast({
          type: "success",
          title: "Nhận thưởng thành công!",
          message: `+${xp} XP và +${coins} Vàng đã được cộng vào tài khoản!`,
          duration: 3000,
        });
      } else {
        // Fallback for local
        const updated = [...claimedList, id];
        setClaimedList(updated);
        awardXp(xp);
        awardCoins(coins);
        addToast({
          type: "success",
          title: "Nhận thưởng thành công!",
          message: `+${xp} XP và +${coins} Vàng đã được cộng vào tài khoản!`,
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error claiming challenge:", err);
    } finally {
      setClaimingChallengeId(null);
    }
  };

  const handleCheckIn = async () => {
    if (isCheckingIn || isCheckedInToday) {
      addToast({
        type: "info",
        title: "Đã điểm danh hôm nay",
        message: "Bạn đã hoàn thành điểm danh hôm nay. Hãy tiếp tục duy trì chuỗi nhé!",
        duration: 3000,
      });
      return;
    }

    setIsCheckingIn(true);
    try {
      const res = await fetch("/api/user/daily-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();

      if (json.success) {
        setIsCheckedInToday(true);
        const todayStr = new Date().toISOString().slice(0, 10);
        setActiveDaysInWeek((prev) => Array.from(new Set([...prev, todayStr])));
        awardXp(15);
        awardCoins(20);
        useUserStore.getState().addPracticeTime(5);

        addToast({
          type: "success",
          title: "Điểm danh thành công!",
          message: "+15 XP, +20 Vàng và +5 phút luyện tập đã được cộng vào tài khoản!",
          duration: 3000,
        });
      } else {
        addToast({
          type: "info",
          title: "Thông báo",
          message: json.error || "Bạn đã điểm danh hôm nay rồi!",
        });
      }
    } catch (e) {
      console.error("Checkin error:", e);
      addToast({
        type: "error",
        title: "Lỗi kết nối",
        message: "Không thể kết nối máy chủ để điểm danh.",
      });
    } finally {
      setIsCheckingIn(false);
    }
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
          mode: "quick_ask",
          messages: [
            {
              role: "user",
              text: aiQuestion,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setAiAnswer(data.reply);
        const xpEarned = data.xpAwarded || 10;
        awardXp(xpEarned);
        addToast({
          type: "success",
          title: "AI Tutor đã trả lời",
          message: `+${xpEarned} XP cho tinh thần chủ động học hỏi.`,
        });
      } else {
        setAiAnswer("AI Tutor đang bận. Vui lòng gửi lại câu hỏi sau giây lát.");
      }
    } catch (e) {
      console.error(e);
      setAiAnswer("Không có kết nối mạng. Vui lòng kiểm tra lại đường truyền.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. UNIVERSAL 56PX (h-14) TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="h-9 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all cursor-pointer"
              title="Cửa hàng vật phẩm & Số Vàng"
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span>{user?.coins ?? 0} <span className="font-medium text-[11px] text-amber-600/80 dark:text-amber-400/80">Vàng</span></span>
            </Link>

            <Link
              href="/analytics"
              className="h-9 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200/80 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all cursor-pointer"
              title="Xem chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{user?.currentStreak || 1} <span className="font-medium text-[11px] text-orange-500/80">Ngày</span></span>
            </Link>

            <Link
              href="/study/listening"
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Luyện Bài Mới</span>
            </Link>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<Home className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Trang chủ"
          />
          <HeaderPillItem
            href="/roadmap"
            icon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
            label="Lộ trình"
          />
          <HeaderPillItem
            href="/vocabulary"
            icon={<ListOrdered className="w-3.5 h-3.5 text-emerald-500" />}
            label="Danh sách từ"
            hideOnSmall
          />
          <HeaderPillItem
            href="/study/listening"
            icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
            label="Dictation"
            hideOnSmall
          />
          <HeaderPillItem
            href="/study/pvp"
            icon={<Swords className="w-3.5 h-3.5 text-rose-500" />}
            label="Đấu trường"
            hideOnMedium
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. TOP ANNOUNCEMENT BANNER (ACCORDION PILL) */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Wand2 className="w-4.5 h-4.5 stroke-[2] text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    Phòng Luyện Writing AI & Dictation Audio Studio đã sẵn sàng!
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                    Thực hành chép chính tả với bảng điều khiển âm thanh 44 sóng âm cao cấp và nhận gợi ý sửa lỗi từ AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/study/listening">
                  <button className="h-8 px-3 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all">
                    <span>Khám phá</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowAnnouncement(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Đóng thông báo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. HERO PROFILE & 4 MICRO-METRIC DOUBLE-BEZEL CARDS */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
          {/* Upper Greeting & User Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="shrink-0">
                <UserAvatar
                  avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                  imageUrl={user?.imageUrl}
                  emoji={user?.avatarEmoji}
                  name={user?.fullName || user?.username || "Bạn"}
                  size="w-12 h-12 sm:w-13 sm:h-13"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                    Chào mừng trở lại, {formatCleanName(user.fullName || user.username || user.email)}!
                  </h1>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                    Lv.{user.level} • {userTitle}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Kiên trì luyện tập từng ngày để bứt phá mục tiêu Tiếng Anh của bạn!
                </p>
              </div>
            </div>

            {/* Quick Shortlink Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/myvideo">
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Video/Audio</span>
                </button>
              </Link>
              <Link href="/community">
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Góp ý</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 4 Double-Bezel Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Metric 1: Streak (Amber Gold) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-800/60 shadow-2xs group">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform p-1 overflow-hidden">
                <img
                  src="/images/streak-flame-crystal.png"
                  alt="Streak Flame 3D"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                  {user.currentStreak}{" "}
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                    ngày
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  Chuỗi học liên tiếp
                </div>
              </div>
            </div>

            {/* Metric 2: Study Time (Sky Blue) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-sky-300 dark:hover:border-sky-800/60 shadow-2xs group">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                  {Math.floor((user.minutesStudied || 15) / 60)}h{" "}
                  {(user.minutesStudied || 15) % 60}m
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  Thời gian luyện tập
                </div>
              </div>
            </div>

            {/* Metric 3: Saved Words (Emerald Green) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/60 shadow-2xs group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <BookmarkCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                  {savedWordsCount}{" "}
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                    từ
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  Vốn từ đã tích lũy
                </div>
              </div>
            </div>

            {/* Metric 4: Total XP & Level Bar (Royal Blue) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-800/60 shadow-2xs group">
              <div className="w-10 h-10 rounded-lg bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                    {user.totalXp}{" "}
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-sans">
                      XP
                    </span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[9.5px] shrink-0">
                    {xpPercent}%
                  </span>
                </div>
                <div className="w-full mt-0.5">
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-purple-600 transition-all duration-500"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    Tiến độ cấp độ Lv.{user.level}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN BENTO GRID (CỘT TRÁI ~61.8% - CỘT PHẢI ~38.2% TỶ LỆ VÀNG CÂN ĐỐI HOÀN HẢO) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-5 sm:gap-6">
          {/* CỘT TRÁI: LEARNING HUB & ANALYTICS (1.62fr Width) */}
          <div className="space-y-5 sm:space-y-6">
            {/* 3.1. LỘ TRÌNH HÔM NAY (ROYAL BLUE HERO MISSION DECK) */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#0059bb] via-[#004fba] to-[#00388a] text-white border border-blue-400/30 shadow-lg shadow-blue-900/25 space-y-4 relative overflow-hidden">
              {/* Subtle ambient decorative gradient orbs */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge & Progress */}
              <div className="flex items-center justify-between gap-2 relative z-10">
                <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-white font-mono font-black text-xs flex items-center gap-1.5 border border-white/25 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>LỘ TRÌNH HÔM NAY</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-blue-100 font-mono text-xs font-bold">
                  Tiến trình:{" "}
                  <span className="text-white font-black text-sm tabular-nums">
                    {10 - remainingWords}
                  </span>
                  /10 từ
                </span>
              </div>

              {/* Title & Description */}
              <div className="relative z-10">
                <h2 className="text-base sm:text-lg font-extrabold text-white font-display leading-snug tracking-tight">
                  {currentTask ||
                    "Ngày 14: Luyện nghe TOEIC Part 6: Text Completion & Liên từ/Trạng từ nâng cao. Hoàn thành 10 câu chép chính tả và ghi chú từ vựng."}
                </h2>
              </div>

              {/* 3 Frosted Glass Metadata Pods */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 relative z-10">
                <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
                  <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-100">Mục tiêu</div>
                  <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-white font-mono mt-0.5">
                    {remainingWords} từ mới
                  </div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
                  <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-100">Thời gian</div>
                  <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-white font-mono mt-0.5">
                    ~15 phút
                  </div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
                  <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-amber-200">Phần thưởng</div>
                  <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-amber-300 font-mono mt-0.5">
                    +50 XP
                  </div>
                </div>
              </div>

              {/* Progress Bar & Clean White Button CTA (Nằm ngang nhau trên cả mobile & desktop) */}
              <div className="flex items-center justify-between gap-2.5 sm:gap-4 pt-3 sm:pt-3.5 border-t border-white/30 relative z-10">
                <div className="flex-1 min-w-0 sm:max-w-xs space-y-1">
                  <div className="h-2 sm:h-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 transition-all duration-500 shadow-sm"
                      style={{
                        width: `${Math.min(100, ((10 - remainingWords) / 10) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <Link href={studyPlanTargetUrl} className="shrink-0">
                  <button
                    type="button"
                    className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0059bb] font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 transition-all group whitespace-nowrap"
                  >
                    <span>Bắt đầu học ngay</span>
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#0059bb]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform text-[#0059bb]">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* 3.2. BIỂU ĐỒ PHÂN TÍCH KỸ NĂNG 7 NGÀY (SKILL ANALYTICS DOCK) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              {/* Header Title & Weekly Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                    7 NGÀY
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                    Thời lượng luyện tập kỹ năng
                  </h3>
                </div>

                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono shadow-2xs border"
                  style={{
                    backgroundColor: `${currentSkillConfig.color}15`,
                    borderColor: `${currentSkillConfig.color}35`,
                    color: currentSkillConfig.color,
                  }}
                >
                  Tổng: {skillTotalMinutes} phút
                </span>
              </div>

              {/* Segmented Skill Switcher Pill Dock (Speed Dock Style) */}
              <div
                role="tablist"
                aria-label="Lựa chọn kỹ năng phân tích biểu đồ"
                className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 overflow-x-auto scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {(
                  [
                    { id: "dictation", label: "Dictation", Icon: Headphones },
                    { id: "shadowing", label: "Shadowing", Icon: Mic },
                    { id: "speaking", label: "Nói (AI)", Icon: SpeakingIcon },
                    { id: "vocab", label: "Từ vựng", Icon: BookOpen },
                    { id: "writing", label: "Viết (AI)", Icon: Wand2 },
                  ] as const
                ).map((tab) => {
                  const isActive = activeSkillTab === tab.id;
                  const Icon = tab.Icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isActive}
                      onClick={() => setActiveSkillTab(tab.id)}
                      className={`relative flex-1 py-1.5 px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 z-10 select-none ${
                        isActive
                          ? "text-slate-900 dark:text-white shadow-2xs font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSkillTabIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg -z-10 shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive SVG Chart Waveform Canvas */}
              <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden">
                <div className="w-full relative">
                  <svg
                    viewBox="0 0 700 210"
                    className="w-full h-auto overflow-visible select-none"
                  >
                    <defs>
                      <linearGradient
                        id={currentSkillConfig.gradientId}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor={currentSkillConfig.color}
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="60%"
                          stopColor={currentSkillConfig.color}
                          stopOpacity="0.08"
                        />
                        <stop
                          offset="100%"
                          stopColor={currentSkillConfig.color}
                          stopOpacity="0.00"
                        />
                      </linearGradient>
                      <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                      </filter>
                    </defs>

                    {/* Level 4: 60m */}
                    <line
                      x1="52"
                      y1="24"
                      x2="690"
                      y2="24"
                      stroke="currentColor"
                      className="text-slate-200/60 dark:text-slate-800"
                      strokeDasharray="3 3"
                    />
                    <text x="42" y="24" textAnchor="end" dominantBaseline="central" className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold">
                      {maxSkillMinutes}m
                    </text>

                    {/* Level 3: 45m */}
                    <line
                      x1="52"
                      y1="68"
                      x2="690"
                      y2="68"
                      stroke="currentColor"
                      className="text-slate-200/60 dark:text-slate-800"
                      strokeDasharray="3 3"
                    />
                    <text x="42" y="68" textAnchor="end" dominantBaseline="central" className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold">
                      {Math.round(maxSkillMinutes * 0.75)}m
                    </text>

                    {/* Level 2: 30m */}
                    <line
                      x1="52"
                      y1="112"
                      x2="690"
                      y2="112"
                      stroke="currentColor"
                      className="text-slate-200/60 dark:text-slate-800"
                      strokeDasharray="3 3"
                    />
                    <text x="42" y="112" textAnchor="end" dominantBaseline="central" className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold">
                      {Math.round(maxSkillMinutes * 0.5)}m
                    </text>

                    {/* Level 1: 15m */}
                    <line
                      x1="52"
                      y1="156"
                      x2="690"
                      y2="156"
                      stroke="currentColor"
                      className="text-slate-200/60 dark:text-slate-800"
                      strokeDasharray="3 3"
                    />
                    <text x="42" y="156" textAnchor="end" dominantBaseline="central" className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold">
                      {Math.round(maxSkillMinutes * 0.25)}m
                    </text>

                    {/* Baseline Line: 0m (y=200) */}
                    <line
                      x1="52"
                      y1="200"
                      x2="690"
                      y2="200"
                      stroke="currentColor"
                      className="text-slate-200/90 dark:text-slate-800"
                    />
                    <text x="42" y="200" textAnchor="end" dominantBaseline="central" className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold">
                      0m
                    </text>

                    {(() => {
                      const colWidth = 638 / 7;
                      const animatedPoints = skillWeeklyChartData.map(
                        (d, i) => {
                          const x = 52 + (i + 0.5) * colWidth;
                          const y =
                            animatedYPoints[i] ??
                            200 - (Math.min(1, Math.max(0, d.minutes) / maxSkillMinutes) * 176);
                          return { x, y, day: d.day, minutes: d.minutes };
                        }
                      );

                      const fullCurvePoints = [
                        { x: 52, y: animatedPoints[0].y },
                        ...animatedPoints,
                        { x: 690, y: animatedPoints[6].y },
                      ];

                      let pathD = `M 52,${animatedPoints[0].y}`;
                      for (let i = 0; i < fullCurvePoints.length - 1; i++) {
                        const p0 = fullCurvePoints[i];
                        const p1 = fullCurvePoints[i + 1];
                        const cp1x = p0.x + (p1.x - p0.x) / 2;
                        const cp1y = p0.y;
                        const cp2x = p0.x + (p1.x - p0.x) / 2;
                        const cp2y = p1.y;
                        pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
                      }

                      const areaD = `${pathD} L 690,200 L 52,200 Z`;
                      const activeIndex = selectedDayIndex !== null ? selectedDayIndex : 4;
                      const selPoint = animatedPoints[activeIndex];

                      return (
                        <g>
                          {/* Gradient Area Fill */}
                          <path
                            d={areaD}
                            fill={`url(#${currentSkillConfig.gradientId})`}
                            className="transition-colors duration-300"
                          />

                          {/* Smooth Bezier Line (Nét mỏng thanh thoát 1.8px) */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke={currentSkillConfig.color}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-colors duration-300"
                          />

                          {/* Floating Text trực tiếp trên biểu đồ cách dọc 12px */}
                          {selPoint && (
                            <text
                              x={selPoint.x}
                              y={Math.max(18, selPoint.y - 12)}
                              textAnchor="middle"
                              fill={currentSkillConfig.color}
                              className="font-mono text-[21px] sm:text-[16px] font-black tracking-tight select-none pointer-events-none"
                            >
                              {selPoint.minutes} phút
                            </text>
                          )}

                          {/* Invisible Column Hitboxes for Click & Touch */}
                          {animatedPoints.map((p, idx) => (
                            <rect
                              key={`col-hitbox-${idx}`}
                              x={52 + idx * colWidth}
                              y="0"
                              width={colWidth}
                              height="210"
                              fill="transparent"
                              className="cursor-pointer"
                              onClick={() =>
                                setSelectedDayIndex(
                                  selectedDayIndex === idx ? null : idx
                                )
                              }
                            />
                          ))}
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* 7 Interactive Day Column Buttons (Khớp 100% trực diện với 7 điểm dữ liệu trên biểu đồ) */}
                <div
                  style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
                  className="grid grid-cols-7 text-center pt-0 pb-1.5 gap-0"
                >
                  {skillWeeklyChartData.map((d, i) => {
                    const isSelected = (selectedDayIndex !== null ? selectedDayIndex : 4) === i;
                    const isToday = i === 4;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setSelectedDayIndex(selectedDayIndex === i ? null : i)
                        }
                        className={`py-1.5 px-0.5 rounded-t-lg text-center transition-all cursor-pointer font-mono text-[11px] sm:text-xs ${
                          isSelected
                            ? isToday
                              ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-amber-500 bg-amber-50/60 dark:bg-amber-950/30"
                              : "text-[#0059bb] dark:text-sky-400 font-black border-b-2 border-[#0059bb] dark:border-sky-400 bg-blue-50/60 dark:bg-blue-950/30"
                            : isToday
                            ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold border-b-2 border-transparent"
                        }`}
                      >
                        <span className="leading-tight block font-extrabold">
                          {d.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Action Card Embedded */}
              <div className="p-3 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                    <BookOpen className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      Mở rộng vốn từ vựng học thuật!
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                      Khám phá bộ từ 8,900+ kèm ví dụ thực tế & bài tập ngữ cảnh
                    </p>
                  </div>
                </div>

                <Link href="/vocabulary">
                  <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0">
                    Học từ mới
                  </button>
                </Link>
              </div>
            </div>

            {/* 3.3. TRỢ LÝ AI TUTOR NHANH (INTERACTIVE WORKSPACE) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Hỏi Đáp Nhanh Cùng AI Tutor
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  +10 XP / câu hỏi
                </span>
              </div>

              <form onSubmit={handleQuickAskSubmit} className="space-y-2">
                <label
                  htmlFor="ai-prompt-input"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 block"
                >
                  Đặt câu hỏi từ vựng, ngữ pháp hoặc dịch thuật:
                </label>
                <div className="flex gap-2">
                  <input
                    id="ai-prompt-input"
                    type="text"
                    className="flex-1 h-10 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 transition-all placeholder:text-slate-400"
                    placeholder="VD: Phân biệt 'affect' và 'effect' khi viết essay?"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || !aiQuestion.trim()}
                    className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer disabled:opacity-40 transition-all active:scale-95"
                  >
                    {isAiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Gửi câu hỏi</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {isAiLoading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 space-y-2.5 shadow-inner"
                  >
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#0059bb] dark:text-sky-400 animate-pulse" />
                      <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                        AI Tutor đang tư duy & giải nghĩa...
                      </span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="h-3.5 w-full rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                      <div className="h-3.5 w-4/5 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                      <div className="h-3.5 w-2/3 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {aiAnswer && !isAiLoading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed shadow-inner space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 pb-2">
                      <span className="font-extrabold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 text-xs font-display">
                        <Bot className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                        <span>Phản hồi từ AI Tutor</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => speakLessonText(aiAnswer, { rate: 1.0 })}
                        className="px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    </div>
                    <FormattedAiText content={aiAnswer} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CỘT PHẢI: GAMIFIED SIDEBAR (1fr Width) */}
          <div className="space-y-5 sm:space-y-6">
            {/* 3.4. DUOLINGO-STYLE GAMIFIED STREAK STUDIO */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3 relative overflow-hidden">
              {/* 1. Speech Bubble (Bong bóng thoại cổ vũ - Ngắt nhịp 2 dòng cân đối) */}
              <div className="relative mx-auto max-w-[290px] sm:max-w-[320px] text-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                  <span className="font-bold text-amber-600 dark:text-amber-400">Chuỗi streak rực lửa!</span>
                  <span className="block mt-0.5 text-slate-600 dark:text-slate-300">Luyện tập mỗi ngày để nối dài streak.</span>
                </p>
                {/* Speech Bubble Pointer Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-50 dark:bg-slate-800/90 border-r border-b border-slate-200/80 dark:border-slate-700 rotate-45" />
              </div>

              {/* 2. Hero Mascot 3D Flame & Streak Counter */}
              <div className="flex flex-col items-center justify-center pt-1 text-center">
                <Duolingo3DFlame className="w-20 h-20 sm:w-24 sm:h-24" />

                {/* Streak Numeral with 3D Depth */}
                <div className="mt-1">
                  <div className="text-4xl sm:text-5xl font-black font-display bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)]">
                    {user.currentStreak || 1}
                  </div>
                  <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 mt-1 font-display">
                    ngày streak
                  </div>
                </div>
              </div>

              {/* 3. Minimalist 7-Day Circle Stepper (With Loading Skeleton) */}
              {isLoadingCheckin ? (
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pt-1 animate-pulse">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div className="h-3 w-5 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pt-1">
                  {weekDays.map((wd, i) => {
                    const isToday = wd.status === "current";
                    const isLearned = wd.status === "learned";

                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        {/* Day Label */}
                        <span
                          className={`text-[11px] font-mono font-bold ${
                            isToday
                              ? "text-amber-600 dark:text-amber-400 font-black"
                              : isLearned
                              ? "text-slate-800 dark:text-slate-200"
                              : "text-slate-500 dark:text-slate-400 font-semibold"
                          }`}
                        >
                          {wd.day}
                        </span>

                        {/* Circle Dot with 3D Material */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                            isLearned
                              ? "bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-xs shadow-orange-500/25 ring-1 ring-amber-400/20"
                              : isToday
                              ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-4 ring-amber-400/35 shadow-md shadow-amber-500/35 animate-pulse"
                              : "bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80"
                          }`}
                        >
                          {isLearned ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : isToday ? (
                            <Flame className="w-3.5 h-3.5 fill-white stroke-none" />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 4. Milestone Reward Banner */}
              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/25 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      Đủ 7 ngày nhận ngay <span className="text-amber-600 dark:text-amber-400 font-mono font-black">+100 Vàng</span>
                    </p>
                    {/* Mini Progress Track */}
                    <div className="w-32 h-1.5 bg-slate-200/80 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                        style={{
                          width: `${(weekDays.filter((w) => w.status === "learned" || w.status === "current").length / 7) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono text-[11px] font-bold">
                  {weekDays.filter((w) => w.status === "learned" || w.status === "current").length}/7 ngày
                </span>
              </div>

              {/* 5. Full-Width Energetic Action Button (QUYẾT TÂM) */}
              <div className="pt-0.5">
                {isCheckedInToday ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-default select-none border-t border-white/20"
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    <span>ĐÃ ĐIỂM DANH HÔM NAY</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckIn}
                    disabled={isCheckingIn || isLoadingCheckin}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0059bb] to-blue-600 hover:from-[#004fba] hover:to-blue-700 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-t border-white/20 disabled:opacity-60"
                  >
                    {isCheckingIn ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Flame className="w-4 h-4 fill-white stroke-none" />
                    )}
                    <span>{isCheckingIn ? "Đang điểm danh..." : "ĐIỂM DANH (+15 XP)"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3.5. BẢNG XẾP HẠNG (COMMUNITY LEADERBOARD) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-500">
                  <Trophy className="w-4 h-4 stroke-[2.2]" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Bảng Xếp Hạng
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-0.5 bg-slate-100 dark:bg-slate-800/90 rounded-lg flex items-center gap-0.5 text-[11px] font-bold font-mono border border-slate-200/50 dark:border-slate-700/50">
                    <button
                      onClick={() => setLeaderboardTab("week")}
                      className={`px-2.5 sm:px-3 py-0.5 min-w-[42px] sm:min-w-[46px] text-center rounded-md transition-all ${
                        leaderboardTab === "week"
                          ? "bg-white dark:bg-slate-900 shadow-xs font-black text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
                      }`}
                    >
                      Tuần
                    </button>
                    <button
                      onClick={() => setLeaderboardTab("month")}
                      className={`px-2.5 sm:px-3 py-0.5 min-w-[42px] sm:min-w-[46px] text-center rounded-md transition-all ${
                        leaderboardTab === "month"
                          ? "bg-white dark:bg-slate-900 shadow-xs font-black text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
                      }`}
                    >
                      Tháng
                    </button>
                  </div>
                  <Link
                    href="/community/leaderboard"
                    className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline shrink-0"
                  >
                    Xem tất cả ➔
                  </Link>
                </div>
              </div>

              {/* Criterion Switcher (Segmented Control Pill) */}
              <div className="p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/50 dark:border-slate-700/50 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setLeaderboardCriterion("time")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    leaderboardCriterion === "time"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-blue-400 shadow-xs font-black"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Thời gian học</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardCriterion("xp")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    leaderboardCriterion === "xp"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-blue-400 shadow-xs font-black"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Điểm XP</span>
                </button>
              </div>

              {/* Leaderboard Rows */}
              <div className="space-y-2 pt-1">
                {isLoadingLeaderboard ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between animate-pulse"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                          <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* User Row (Live Synced) */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-black text-blue-600 dark:text-sky-400 font-mono shrink-0">
                          #{userRankInLeaderboard}
                        </span>
                        <UserAvatar
                          avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                          imageUrl={user?.imageUrl}
                          emoji={user?.avatarEmoji}
                          name={user?.fullName || user?.username || "Bạn"}
                          size="w-6 h-6"
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          Bạn (Hiện tại)
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-600 text-white shadow-2xs">
                        {leaderboardCriterion === "xp"
                          ? `${user?.totalXp || 0} XP`
                          : `${user?.minutesStudied || 0}m`}
                      </span>
                    </div>

                    {/* Top 3 Leaders */}
                    {topLeaders.map((leader: any, idx: number) => {
                      const displayScore =
                        leaderboardCriterion === "xp"
                          ? `${leader.xp} XP`
                          : `${leader.minutesStudied ?? Math.max(5, Math.round(leader.xp / 10))}m`;

                      return (
                        <div
                          key={leader.id || idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-md text-[11px] font-mono font-black shadow-2xs ${
                                idx === 0
                                  ? "bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30"
                                  : idx === 1
                                  ? "bg-slate-200/60 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-300/40"
                                  : "bg-amber-600/15 text-amber-700 dark:text-amber-500 border border-amber-600/30"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <UserAvatar
                              avatar={leader.avatarUrl || leader.imageUrl || leader.avatar}
                              imageUrl={leader.imageUrl}
                              emoji={leader.avatarEmoji}
                              name={leader.fullName || leader.username || "Học viên"}
                              size="w-6 h-6"
                            />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {leader.fullName}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {displayScore}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            {/* 3.6. NHIỆM VỤ HÀNG NGÀY (DAILY QUESTS - DATABASE SYNCED) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600 dark:text-sky-400 stroke-[2.2]" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Nhiệm Vụ Hôm Nay
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200 dark:border-blue-800">
                  {completedChallenges}/{displayChallenges.length} ĐÃ XONG
                </span>
              </div>

              <div className="space-y-2">
                {displayChallenges.map((ch) => {
                  const hasReachedGoal = ch.progress >= ch.target || ch.isCompleted;
                  const isClaimed = Boolean(ch.isClaimed);
                  const isTaskFullyCompleted = hasReachedGoal && isClaimed;
                  const isClaiming = claimingChallengeId === ch.id;

                  return (
                    <div
                      key={ch.id}
                      className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                          {ch.id === "write_essay" ? (
                            <PenLine className="w-3.5 h-3.5 text-amber-500 stroke-[2]" />
                          ) : ch.id === "review_cards" ? (
                            <RotateCcw className="w-3.5 h-3.5 text-blue-500 stroke-[2]" />
                          ) : ch.id === "learn_words" ? (
                            <BookOpen className="w-3.5 h-3.5 text-emerald-500 stroke-[2]" />
                          ) : ch.id === "speak_practice" ? (
                            <Mic className="w-3.5 h-3.5 text-purple-500 stroke-[2]" />
                          ) : ch.id === "win_pvp" ? (
                            <Swords className="w-3.5 h-3.5 text-rose-500 stroke-[2]" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-blue-500 stroke-[2]" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <h4
                            className={`text-xs font-bold truncate ${
                              isTaskFullyCompleted
                                ? "text-slate-400 dark:text-slate-500 line-through"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {ch.title}
                          </h4>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isTaskFullyCompleted ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
                            <Check className="w-3 h-3 stroke-[3]" /> ĐÃ NHẬN
                          </span>
                        ) : hasReachedGoal ? (
                          <button
                            type="button"
                            disabled={isClaiming}
                            onClick={() =>
                              handleClaimChallenge(
                                ch.id,
                                ch.xpReward,
                                ch.coinReward
                              )
                            }
                            className="px-2.5 py-1 text-[10px] font-mono font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-2xs active:scale-95 transition-transform uppercase cursor-pointer whitespace-nowrap disabled:opacity-60"
                          >
                            {isClaiming ? "Đang nhận..." : `Nhận +${ch.xpReward} XP`}
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-bold text-[10px]">
                            {ch.progress}/{ch.target}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. DEDICATED FULL-WIDTH QUICK ACTION BENTO TILES (4 CARDS) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shrink-0">
                PHÍM TẮT
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                <span className="sm:hidden">Không Gian Luyện Tập</span>
                <span className="hidden sm:inline">Truy Cập Nhanh Không Gian Học Tập</span>
              </h3>
            </div>
            <Link
              href="/study"
              className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 flex items-center gap-1 group transition-colors cursor-pointer shrink-0"
            >
              <span className="hidden sm:inline">Khám phá toàn bộ phòng học</span>
              <span className="sm:hidden font-semibold">Khám phá toàn bộ</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  key={action.title}
                  className="h-full"
                >
                  <Link
                    href={action.href}
                    className="group block p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 shadow-2xs hover:shadow-md relative overflow-hidden h-full"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shrink-0 shadow-sm ${action.shadow} group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                          <span className="sm:hidden">{action.shortTitle}</span>
                          <span className="hidden sm:inline">{action.title}</span>
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                          {action.badge}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
