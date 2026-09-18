"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Sparkles,
  Coins,
  Swords,
  X,
  Wand2,
  Headphones,
  Home,
  Compass,
  ListOrdered,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { getXpProgress } from "@/shared/utils/calculateXP";
import { LEVEL_TITLES } from "@/shared/constants";
import {
  getWeeklySkillMinutes,
  hydrateSkillMinutesFromBackend,
  SkillType,
} from "@/stores/skillChartStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import dynamic from "next/dynamic";
import {
  DashboardHeroGreeting,
  DashboardMissionDeck,
  DashboardSkillChartCard,
  DashboardStreakStudio,
  DashboardLeaderboardCard,
  DashboardDailyQuestsCard,
  DashboardQuickActionsGrid,
} from "@/features/dashboard";

const DashboardAiTutorWidget = dynamic(
  () => import("@/features/dashboard").then((m) => m.DashboardAiTutorWidget),
  { ssr: false }
);
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";

export default function DashboardPage() {
  const { user: authUser, awardXp, awardCoins } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;
  const { challenges, initChallenges } = useDailyChallengeStore();
  const { addToast } = useNotificationStore();
  const { learned } = useVocabularyStore();

  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Database-driven States initialized deterministically for zero hydration mismatch
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeSkillTab, setActiveSkillTab] = useState<SkillType>("dictation");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(4);
  const [leaderboardTab, setLeaderboardTab] = useState<"week" | "month">("week");
  const [leaderboardCriterion, setLeaderboardCriterion] = useState<"time" | "xp">("time");

  const [isCheckedInToday, setIsCheckedInToday] = useState<boolean>(false);
  const [activeDaysInWeek, setActiveDaysInWeek] = useState<string[]>([]);
  const [isLoadingCheckin, setIsLoadingCheckin] = useState<boolean>(true);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [serverChallenges, setServerChallenges] = useState<any[]>([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState<boolean>(true);
  const [claimingChallengeId, setClaimingChallengeId] = useState<string | null>(null);
  const [chartDataVersion, setChartDataVersion] = useState(0);
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  useEffect(() => {
    // 1. Handle OAuth user payload from Google/Facebook redirect
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const oauthUserRaw = params.get("oauth_user");
      if (oauthUserRaw) {
        try {
          const decoded = decodeURIComponent(oauthUserRaw);
          if (decoded.startsWith("{")) {
            const userObj = JSON.parse(decoded);
            if (userObj && userObj.id) {
              useUserStore.getState().setUserPayload(userObj);
            }
          }
        } catch (err) {
          // Silently ignore malformed oauth_user params
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      useUserStore.getState().checkSession();
    }

    initChallenges();

    // 2. SWR Instant 0ms Local Cache Hydration & Consolidated Background Fetch
    const overviewCacheKey = `xp_voca_dashboard_overview_${user?.id || "guest"}`;
    if (typeof window !== "undefined") {
      try {
        const rawCached = localStorage.getItem(overviewCacheKey);
        if (rawCached) {
          const cached = JSON.parse(rawCached);
          if (cached.checkin) {
            setIsCheckedInToday(Boolean(cached.checkin.isCheckedInToday));
            setActiveDaysInWeek(cached.checkin.activeDaysInWeek || []);
            setIsLoadingCheckin(false);
          }
          if (cached.challenges && cached.challenges.length > 0) {
            setServerChallenges(cached.challenges);
            setIsLoadingChallenges(false);
          }
          if (cached.studyPlan?.todayTask) {
            setCurrentTask(cached.studyPlan.todayTask);
            setIsLoadingPlan(false);
          }
          setIsLoadingChart(false);
        }
      } catch (err) {
        console.warn("Failed to load cached dashboard overview:", err);
      }
    }

    let isMounted = true;
    const fetchDashboardOverview = async () => {
      try {
        const res = await fetch("/api/dashboard/overview");
        const json = await res.json();
        if (json.success && json.data && isMounted) {
          const data = json.data;

          // A. Checkin & Profile stats reconciliation
          if (data.checkin) {
            setIsCheckedInToday(Boolean(data.checkin.isCheckedInToday));
            setActiveDaysInWeek(data.checkin.activeDaysInWeek || []);

            const state = useUserStore.getState();
            const currentUser = state.user;
            if (currentUser) {
              state.updateUserStats({
                currentStreak: Math.max(currentUser.currentStreak || 1, data.checkin.currentStreak || 1),
                longestStreak: Math.max(currentUser.longestStreak || 1, data.checkin.longestStreak || 1),
                totalXp: Math.max(currentUser.totalXp || 0, data.checkin.totalXp || 0),
                coins: Math.max(currentUser.coins || 0, data.checkin.coins || 0),
                wordsLearned: Math.max(currentUser.wordsLearned || 0, data.checkin.wordsLearned || 0),
                minutesStudied: Math.max(currentUser.minutesStudied || 0, data.checkin.minutesStudied || 0),
              });
            }
          }

          // B. Daily Challenges
          if (data.challenges) {
            setServerChallenges(data.challenges);
          }

          // C. Study Plan
          if (data.studyPlan?.todayTask) {
            setCurrentTask(data.studyPlan.todayTask);
          }

          // D. Skill chart practice minutes
          if (data.skillPractice) {
            await hydrateSkillMinutesFromBackend(user?.id, data.skillPractice);
            if (isMounted) {
              setChartDataVersion((v) => v + 1);
            }
          }

          // E. Update instant SWR cache in LocalStorage
          try {
            localStorage.setItem(overviewCacheKey, JSON.stringify(data));
          } catch (e) {
            // ignore storage quota error
          }
        }
      } catch (e) {
        console.error("Error fetching dashboard overview:", e);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) {
              setIsLoadingCheckin(false);
              setIsLoadingChallenges(false);
              setIsLoadingPlan(false);
              setIsLoadingChart(false);
            }
          }, 240);
        }
      }
    };

    fetchDashboardOverview();

    return () => {
      isMounted = false;
    };
  }, [initChallenges, user?.id]);

  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const lbCacheKey = `xp_voca_lb_${leaderboardTab}`;

    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem(lbCacheKey);
        if (raw) {
          const cached = JSON.parse(raw);
          if (Array.isArray(cached) && cached.length > 0) {
            setLeaderboardData(cached);
            setIsLoadingLeaderboard(false);
          }
        }
      } catch (e) {}
    }

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/leaderboard?period=${leaderboardTab}`);
        const json = await res.json();
        if (json.success && json.data && isMounted) {
          setLeaderboardData(json.data);
          try {
            sessionStorage.setItem(lbCacheKey, JSON.stringify(json.data));
          } catch (e) {}
        }
      } catch (e) {
        console.error("Error fetching dashboard leaderboard:", e);
      } finally {
        if (isMounted) {
          setIsLoadingLeaderboard(false);
        }
      }
    };
    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [leaderboardTab]);

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

  const sortedLeaderboardData = useMemo(() => {
    if (!leaderboardData || leaderboardData.length === 0) return [];
    const list = [...leaderboardData].map((item) => ({
      ...item,
      computedMinutes:
        typeof item.minutesStudied === "number"
          ? item.minutesStudied
          : Math.max(5, Math.round((item.xp || 0) / 10)),
    }));

    if (leaderboardCriterion === "time") {
      list.sort((a, b) => b.computedMinutes - a.computedMinutes);
    } else {
      list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    }

    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [leaderboardData, leaderboardCriterion]);

  const userRankInLeaderboard = useMemo(() => {
    if (!user) return 1;
    if (sortedLeaderboardData.length > 0) {
      const found = sortedLeaderboardData.find((l) => l.id === user.id);
      if (found) return found.rank;

      if (leaderboardCriterion === "time") {
        const userMins = user.minutesStudied || 0;
        const higherCount = sortedLeaderboardData.filter(
          (l) => l.computedMinutes > userMins
        ).length;
        return higherCount + 1;
      } else {
        const higherXpCount = sortedLeaderboardData.filter(
          (l) => (l.xp || 0) > (user.totalXp || 0)
        ).length;
        return higherXpCount + 1;
      }
    }
    return 1;
  }, [user, sortedLeaderboardData, leaderboardCriterion]);

  const topLeaders = useMemo(() => {
    if (sortedLeaderboardData.length > 0) {
      return sortedLeaderboardData.slice(0, 3);
    }
    return [
      { id: "top1", fullName: "Nga Nguyễn", xp: 1450, computedMinutes: 145, avatarEmoji: "🦊" },
      {
        id: "top2",
        fullName: "Quang Nguyễn Định",
        xp: 1280,
        computedMinutes: 128,
        avatarEmoji: "🦁",
      },
      { id: "top3", fullName: "Minh Thu", xp: 1100, computedMinutes: 110, avatarEmoji: "🦉" },
    ];
  }, [sortedLeaderboardData]);

  const { percent: xpPercent } = getXpProgress(user.level, user.totalXp);

  const displayChallenges = useMemo(() => {
    if (serverChallenges.length > 0) {
      return serverChallenges;
    }
    return challenges.map((c) => ({
      ...c,
      isClaimed: claimedList.includes(c.id),
    }));
  }, [serverChallenges, challenges, claimedList]);

  const remainingWords = Math.max(0, 10 - wordsPracticedToday);
  const userTitle = LEVEL_TITLES[user.level] || user.title || "Vocabulary Builder";

  const studyPlanTargetUrl = useMemo(() => {
    if (!currentTask) return "/study/practice";
    const t = currentTask.toLowerCase();
    if (t.includes("nghe") || t.includes("dictation") || t.includes("listening")) return "/study/listening";
    if (t.includes("nói") || t.includes("shadowing") || t.includes("speaking") || t.includes("phát âm")) return "/study/shadowing";
    if (t.includes("đề") || t.includes("exam") || t.includes("toeic") || t.includes("ielts")) return "/study/exam-prep";
    return "/study/practice";
  }, [currentTask]);

  const handleClaimChallenge = async (id: string, xp: number, coins: number) => {
    if (claimingChallengeId) return;
    setClaimingChallengeId(id);

    // 1. OPTIMISTIC UPDATE: Immediate 16ms feedback
    awardXp(xp);
    awardCoins(coins);
    useUserStore.getState().addPracticeTime(5);
    setServerChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isClaimed: true } : c))
    );
    setClaimedList((prev) => (prev.includes(id) ? prev : [...prev, id]));

    addToast({
      type: "success",
      title: "Nhận thưởng thành công!",
      message: `+${xp} XP và +${coins} Vàng đã được cộng vào tài khoản!`,
      duration: 3000,
    });

    // 2. BACKGROUND PERSISTENCE: Sync with server asynchronously
    try {
      const res = await fetch("/api/user/challenges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: id }),
      });
      const json = await res.json();

      if (json.success && (json.data?.totalXp || json.data?.coins)) {
        useUserStore.getState().updateUserStats({
          totalXp: json.data.totalXp,
          coins: json.data.coins,
        });
      }
    } catch (err) {
      console.warn("Background claim sync error (optimistic state preserved):", err);
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

    // 1. OPTIMISTIC UPDATE: Instant 16ms UI feedback
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

    // Update local cache optimistically
    try {
      const cacheKey = `xp_voca_dashboard_overview_${user?.id || "guest"}`;
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached.checkin) {
          cached.checkin.isCheckedInToday = true;
          const curDays = cached.checkin.activeDaysInWeek || [];
          if (!curDays.includes(todayStr)) {
            cached.checkin.activeDaysInWeek = [...curDays, todayStr];
          }
          cached.checkin.currentStreak = (cached.checkin.currentStreak || 1) + 1;
          localStorage.setItem(cacheKey, JSON.stringify(cached));
        }
      }
    } catch {
      // ignore
    }

    // 2. BACKGROUND PERSISTENCE
    try {
      const res = await fetch("/api/user/daily-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();

      if (json.success && json.data) {
        useUserStore.getState().updateUserStats({
          currentStreak: json.data.currentStreak,
          longestStreak: json.data.longestStreak,
          totalXp: json.data.totalXp,
          coins: json.data.coins,
        });
      }
    } catch (e) {
      console.warn("Background check-in sync error (optimistic state preserved):", e);
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
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12"
      suppressHydrationWarning
    >
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
              <span>
                {user?.coins ?? 0}{" "}
                <span className="font-medium text-[11px] text-amber-600/80 dark:text-amber-400/80">
                  Vàng
                </span>
              </span>
            </Link>

            <Link
              href="/analytics"
              className="h-9 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200/80 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all cursor-pointer"
              title="Xem chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>
                {user?.currentStreak || 1}{" "}
                <span className="font-medium text-[11px] text-orange-500/80">
                  Ngày
                </span>
              </span>
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
            layoutId="dashboardHeaderActiveTab"
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
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS WITH STAGGERED ENTRANCE */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. TOP ANNOUNCEMENT BANNER */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Wand2 className="w-4.5 h-4.5 stroke-[2] text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    Phòng Luyện Writing AI & Dictation Audio Studio đã sẵn sàng!
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block truncate">
                    Thực hành chép chính tả với bảng điều khiển âm thanh 44 sóng âm cao cấp và nhận gợi ý sửa lỗi từ AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/study/listening">
                  <button
                    type="button"
                    className="h-8 px-3 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Khám phá</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowAnnouncement(false)}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer"
                  title="Đóng thông báo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. HERO PROFILE GREETING & 4 MICRO-METRIC CARDS */}
        <DashboardHeroGreeting
          user={user}
          userTitle={userTitle}
          xpPercent={xpPercent}
          savedWordsCount={savedWordsCount}
          isLoadingCheckin={isLoadingCheckin}
        />

        {/* 3. BENTO 2-COLUMN MAIN CANVAS (Left: 7/12, Right: 5/12 - 0px CLS Standard) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ─── LEFT COLUMN (7/12) ─── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* 3.1. Today's Mission Deck */}
            <DashboardMissionDeck
              currentTask={currentTask}
              isLoadingPlan={isLoadingPlan}
              remainingWords={remainingWords}
              wordsPracticedToday={wordsPracticedToday}
              studyPlanTargetUrl={studyPlanTargetUrl}
            />

            {/* 3.2. Per-Skill 5-Tab Practice Chart */}
            <DashboardSkillChartCard
              activeSkillTab={activeSkillTab}
              setActiveSkillTab={setActiveSkillTab}
              selectedDayIndex={selectedDayIndex}
              setSelectedDayIndex={setSelectedDayIndex}
              skillWeeklyChartData={skillWeeklyChartData}
              skillTotalMinutes={skillTotalMinutes}
              maxSkillMinutes={maxSkillMinutes}
              targetYPoints={targetYPoints}
              isLoadingChart={isLoadingChart}
            />

            {/* 3.3. AI Tutor Workspace & Vocabulary Sub-Action */}
            <DashboardAiTutorWidget
              aiQuestion={aiQuestion}
              setAiQuestion={setAiQuestion}
              isAiLoading={isAiLoading}
              aiAnswer={aiAnswer}
              handleQuickAskSubmit={handleQuickAskSubmit}
            />
          </div>

          {/* ─── RIGHT COLUMN (5/12) ─── */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* 3.4. Duolingo Gamified Streak Studio */}
            <DashboardStreakStudio
              user={user}
              isLoadingCheckin={isLoadingCheckin}
              isCheckedInToday={isCheckedInToday}
              isCheckingIn={isCheckingIn}
              weekDays={weekDays}
              handleCheckIn={handleCheckIn}
            />

            {/* 3.5. Community Leaderboard Widget with Spring Pills */}
            <DashboardLeaderboardCard
              leaderboardTab={leaderboardTab}
              setLeaderboardTab={setLeaderboardTab}
              leaderboardCriterion={leaderboardCriterion}
              setLeaderboardCriterion={setLeaderboardCriterion}
              isLoadingLeaderboard={isLoadingLeaderboard}
              userRankInLeaderboard={userRankInLeaderboard}
              user={user}
              topLeaders={topLeaders}
            />

            {/* 3.6. Daily Quests Card with Filter Sub-Tabs */}
            <DashboardDailyQuestsCard
              displayChallenges={displayChallenges}
              isLoadingChallenges={isLoadingChallenges}
              claimingChallengeId={claimingChallengeId}
              handleClaimChallenge={handleClaimChallenge}
            />
          </div>
        </div>

        {/* 4. DEDICATED FULL-WIDTH QUICK ACTION BENTO TILES (4 CARDS) */}
        <DashboardQuickActionsGrid />
      </PageEntranceWrapper>
    </div>
  );
}
