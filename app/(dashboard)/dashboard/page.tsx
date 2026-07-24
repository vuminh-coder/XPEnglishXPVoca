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
  User as UserIcon,
  Shield,
  ChevronRight,
  X,
  SlidersHorizontal,
  Wand2,
} from "lucide-react";
import { getXpProgress } from "@/lib/utils/calculateXP";
import { LEVEL_TITLES } from "@/lib/constants";
import { Button, Badge, DoubleBezelCard, NestedActionButton } from "@/components/ui";

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
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeSkillTab, setActiveSkillTab] = useState<"dictation" | "shadowing" | "speaking" | "vocab" | "writing">("dictation");

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
  const userTitle = LEVEL_TITLES[user.level] || user.title || "Word Explorer";

  const maxWeeklyXp = Math.max(...weeklyXp.map((d) => d.xp), 1);

  const quickActions = [
    {
      title: "Luyện từ vựng",
      badge: "Flashcard & Quiz",
      href: "/study/practice",
      icon: PenLine,
      accent: "from-cyan-500/20 to-sky-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Đấu trường PvP",
      badge: "So tài Realtime",
      href: "/study/pvp",
      icon: Swords,
      accent: "from-indigo-500/20 to-violet-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
    {
      title: "Khám phá chủ đề",
      badge: "Bộ từ 3,900+",
      href: "/vocabulary",
      icon: Globe,
      accent: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      title: "Cửa hàng vật phẩm",
      badge: "Vàng & Trang phục",
      href: "/shop",
      icon: Coins,
      accent: "from-yellow-500/20 to-amber-500/20 text-yellow-600 dark:text-amber-400 border-yellow-500/30",
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
      message: `+${xp} XP và +${coins} Vàng đã được cộng vào tài khoản!`,
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
      setAiAnswer(
        "Không có kết nối mạng. Vui lòng kiểm tra lại đường truyền.",
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div
      className="space-y-5 md:space-y-7 pb-24 md:pb-8 px-1 md:px-0 relative select-none"
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

      {/* 0. Top Announcement Banner Card (Image 3 Style) */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-[20px] bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-3.5 relative shadow-[0_2px_12px_rgba(0,0,0,0.02)] select-none"
          >
            <div className="flex items-start md:items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Wand2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1d6ee6] text-white">
                    ✨ Mới ra mắt
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">
                    Luyện Writing với AI chấm bài đã có mặt!
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                  Được đội ngũ chấm chữa kỹ lưỡng để mang đến trải nghiệm tốt nhất cho bạn! Viết bài IELTS, TOEIC, VSTEP theo đề thi thật, AI chấm điểm sát tiêu chí thật kèm nhận xét chi tiết, chỉ cho bạn cách tiến bộ từng ngày. Cùng chinh phục Writing hiệu quả hơn nhé! ✍️
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
              <Link href="/ai/tutor">
                <button className="px-4 py-2 rounded-full bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-black transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer">
                  Thử ngay <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                title="Đóng thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header: Chào mừng trở lại & Action Buttons (Image 3 Style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
        className="p-5 rounded-[20px] bg-white dark:bg-neutral-900 border border-[#e9eef5] dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span>Chào mừng trở lại, {user.fullName || "Minh Vu Van"}! 👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Cố gắng lên nhé bạn ơi — mình tin bạn sẽ ngày càng tiến bộ!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-[#20b26c] hover:bg-[#1b9a5d] text-white text-xs font-black transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer">
            📹 Thêm Video/Audio tự chọn
          </button>
          <button className="px-4 py-2 rounded-full bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-black transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer">
            💬 Chia sẻ và góp ý cho App
          </button>
        </div>
      </motion.div>

      {/* 2. Original Bento Grid with Image 3 Tokens */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-max"
      >
        {/* ROW 1: Learning Path (2 cols) & Streak Card (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-br from-blue-600/5 via-sky-500/5 to-indigo-500/5 dark:from-blue-600/15 dark:via-sky-500/10 dark:to-indigo-500/15">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="primary"
                  className="gap-1 bg-blue-600/10 text-blue-600 dark:text-sky-400 py-0.5 px-2.5 font-black text-[11px]"
                >
                  <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                  LỘ TRÌNH HÔM NAY
                </Badge>
                <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                  Tiến trình: <span className="text-blue-600 dark:text-sky-400">{10 - remainingWords}</span>/10 từ
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                {currentTask || "Ngày 12: Học 15 từ vựng mới và ôn tập Spaced Repetition các từ cũ thuộc chủ đề Từ vựng Finance."}
              </h2>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-xs">
                  🎯 <span className="text-blue-600 dark:text-sky-400 font-black">{remainingWords}</span> từ chưa học
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-xs">
                  ⏱️ ~15 phút
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
                  ⚡ +50 XP
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-blue-500/10 dark:border-white/5">
              <div className="flex-1 max-w-[200px] h-2 rounded-full bg-slate-200/80 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, ((10 - remainingWords) / 10) * 100)}%` }}
                />
              </div>

              <Link href="/study/practice" className="shrink-0">
                <Button
                  variant="primary"
                  className="h-10 px-5 font-black text-xs sm:text-sm rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                >
                  Bắt đầu học
                </Button>
              </Link>
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* Streak Tracker Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display">
                STREAK HỌC TẬP
              </span>
              <Flame className="h-5 w-5 text-amber-500 animate-pulse stroke-[2]" />
            </div>

            <div className="text-center my-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 font-display tracking-tight flex items-center justify-center gap-1">
                <span>{user.currentStreak}</span>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">ngày</span>
              </div>
            </div>

            <div className="flex justify-between gap-1 bg-slate-50 dark:bg-neutral-950 p-2 rounded-2xl border border-slate-200/60 dark:border-neutral-800">
              {weekDays.map((wd, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400">
                    {wd.day}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      wd.status === "learned"
                        ? "bg-amber-500 text-white shadow-xs"
                        : wd.status === "current"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white animate-bounce shadow-xs"
                          : "bg-slate-200/80 text-slate-400 dark:bg-neutral-800 dark:text-neutral-500"
                    }`}
                  >
                    {wd.status === "learned" ? "🔥" : wd.status === "current" ? "⚡" : "•"}
                  </div>
                </div>
              ))}
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* ROW 2: Challenges Panel (2 cols) & Stats Summary (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 space-y-3 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 dark:text-sky-400 stroke-[2.2]" />
                <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                  Nhiệm vụ hôm nay
                </h2>
              </div>
              <Badge variant="primary" className="font-extrabold text-[11px] py-0.5 px-2">
                HOÀN THÀNH {completedChallenges}/{challenges.length}
              </Badge>
            </div>

            <div className="space-y-2.5">
              {challenges.map((ch) => {
                const hasReachedGoal = ch.progress >= ch.target;
                const isClaimed = claimedList.includes(ch.id);

                return (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200/60 dark:border-neutral-800/80 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg w-8 h-8 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs">
                        {ch.icon}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-xs font-black truncate ${
                            isClaimed
                              ? "text-slate-400 dark:text-slate-500 line-through"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {ch.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:block text-right">
                        <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300">
                          <span className="text-blue-600 dark:text-sky-400 font-black">{ch.progress}</span>/{ch.target}
                        </span>
                        <div className="h-1.5 w-20 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden mt-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isClaimed ? "bg-emerald-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"
                            }`}
                            style={{ width: `${Math.min(100, (ch.progress / ch.target) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        {hasReachedGoal ? (
                          isClaimed ? (
                            <Badge variant="success" className="font-extrabold text-[10px] py-1 px-2.5">
                              ĐÃ NHẬN
                            </Badge>
                          ) : (
                            <button
                              onClick={() => handleClaimChallenge(ch.id, ch.xpReward, ch.coinReward)}
                              className="px-3 h-8 text-[11px] font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-xs active:scale-95 transition-transform uppercase tracking-wider cursor-pointer whitespace-nowrap"
                            >
                              Nhận +{ch.xpReward} XP
                            </button>
                          )
                        ) : (
                          <Badge variant="neutral" className="text-[10px] font-black py-1 px-2.5">
                            {ch.progress}/{ch.target}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* Quick Stats Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 space-y-3 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 block border-b border-slate-100 dark:border-neutral-850 pb-2 font-display">
                CHỈ SỐ TỔNG QUAN
              </span>

              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg text-sky-600 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <BookOpen className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Từ đã học
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-display">
                    {user.wordsLearned} <span className="text-slate-400 font-medium">/ 3903</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg text-amber-600 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Zap className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Kinh nghiệm
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-display">
                    {user.totalXp} XP <span className="text-amber-500 text-[10px]">(LV.{user.level})</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Clock className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Thời gian học
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-display">
                    {user.minutesStudied}m <span className="text-emerald-500 text-[10px]">({studyPercent}%)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                      <Coins className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Kho Vàng
                    </span>
                  </div>
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-display">
                    {user.coins ?? 0} Vàng
                  </span>
                </div>
              </div>
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* ROW 3: AI Tutor (2 cols) & PVP Arena (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <form onSubmit={handleQuickAskSubmit} className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 flex items-center gap-2 font-display">
                  <Bot className="h-4 w-4 text-cyan-600 dark:text-cyan-400 stroke-[2.2]" />{" "}
                  HỎI ĐÁP NHANH CÙNG AI TUTOR
                </h3>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +10 XP / câu hỏi
                </span>
              </div>

              <div className="space-y-1">
                <label htmlFor="ai-prompt-input" className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Đặt câu hỏi từ vựng hoặc ngữ pháp:
                </label>
                <div className="flex gap-2">
                  <input
                    id="ai-prompt-input"
                    type="text"
                    className="w-full h-10 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
                    placeholder="Ví dụ: Phân biệt 'make' và 'do'?"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isAiLoading || !aiQuestion.trim()}
                    className="h-10 px-4 font-black flex items-center gap-1 text-xs rounded-xl bg-blue-600 text-white shadow-md shrink-0 active:scale-95 transition-transform cursor-pointer"
                  >
                    {isAiLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin stroke-[2]" />
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
                  className="mt-3 bg-slate-50 dark:bg-neutral-950 p-3 rounded-xl border border-slate-200/80 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed overflow-hidden shadow-inner"
                >
                  <span className="font-black text-blue-600 dark:text-cyan-400 block mb-1 text-[11px] uppercase tracking-wide">
                    🤖 AI Tutor:
                  </span>
                  {aiAnswer}
                </motion.div>
              )}
            </AnimatePresence>
          </DoubleBezelCard>
        </motion.div>

        {/* PVP Arena Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display">
                ĐẤU TRƯỜNG PVP
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                14 Online
              </span>
            </div>

            <div className="py-2">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                So tài từ vựng 1v1
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  ⚡ Realtime
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  🏆 Thăng hạng
                </span>
              </div>
            </div>

            <div className="mt-2">
              <Link href="/study/pvp" className="w-full block">
                <Button
                  variant="primary"
                  className="w-full h-10 px-4 font-black text-xs rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Swords className="h-4 w-4 stroke-[2]" /> Thách đấu
                </Button>
              </Link>
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* ROW 4: Streak Calendar (2 cols) & Weekly XP Chart (1 col) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-white/5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display">
                LỊCH HỌC 28 NGÀY
              </span>
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 shadow-xs" /> Học
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-slate-200 dark:bg-neutral-800" /> Lỡ
                </span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {streakCalendar.map((cell, i) => (
                <div
                  key={i}
                  className={`h-6 sm:h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                    cell.active
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400"
                  }`}
                  title={cell.date}
                >
                  {cell.date.slice(3)}
                </div>
              ))}
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* Weekly XP Bar Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl h-full" innerClassName="p-5 h-full flex flex-col justify-between min-h-[160px] rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-white/5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display">
                XP 7 NGÀY
              </span>
              <Badge variant="primary" className="text-[10px] font-extrabold py-0.5 px-2">
                {user.totalXp} XP
              </Badge>
            </div>

            <div className="flex items-end justify-between gap-1.5 h-24 pt-2">
              {weeklyXp.map((d, i) => {
                const heightPercent = Math.max(10, (d.xp / maxWeeklyXp) * 100);
                const isToday = i === 5;
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300">
                      {d.xp}
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        isToday
                          ? "bg-gradient-to-t from-blue-600 to-sky-400 shadow-xs"
                          : "bg-slate-200 dark:bg-neutral-800"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-300">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </DoubleBezelCard>
        </motion.div>

        {/* ROW 5: Quick Shortcuts Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <DoubleBezelCard outerClassName="p-1.5 rounded-3xl" innerClassName="p-5 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 block border-b border-slate-100 dark:border-white/5 pb-2 font-display">
              PHÍM TẮT NHANH
            </span>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    key={action.title}
                  >
                    <Link
                      href={action.href}
                      className="group block rounded-xl border border-slate-200/70 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/50 p-3 hover:border-blue-500/40 transition-all duration-200 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-xl bg-gradient-to-br ${action.accent} p-2 border shrink-0`}>
                          <Icon className="h-4 w-4 stroke-[2]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                            {action.title}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                            {action.badge}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </DoubleBezelCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

