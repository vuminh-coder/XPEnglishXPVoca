"use client";
import React, { useEffect, useState } from "react";
import { useStudyPlanStore, DailyTask } from "@/lib/store/studyPlanStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Button, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Trophy,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Gift,
  AlertCircle,
  Flame,
  Zap,
  Coins,
  Shield,
  Layers,
  HelpCircle,
  Activity
} from "lucide-react";
import Link from "next/link";

// Helper to generate dynamic context metadata based on taskType
const getTaskMetadata = (type: string) => {
  const t = type.toLowerCase();
  if (t === "listening") {
    return {
      title: "Luyện nghe TOEIC/IELTS",
      tips: [
        "Lắng nghe kỹ âm cuối (ending sounds) và nối âm.",
        "Nghe không phụ đề lần đầu tiên để tối đa phản xạ tự nhiên.",
        "Ghi chú lại 3 từ vựng mới nghe thấy trong đoạn hội thoại."
      ],
      practicePath: "/study/listening",
      gradient: "from-blue-400 via-indigo-500 to-indigo-650",
      glow: "shadow-indigo-500/20",
      ringColor: "ring-indigo-400 dark:ring-indigo-800",
      iconBg: "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      difficulty: "Trung bình",
      difficultyColor: "bg-amber-100 dark:bg-amber-955/20 text-amber-600 dark:text-amber-400"
    };
  }
  if (t === "reading") {
    return {
      title: "Luyện đọc hiểu nâng cao",
      tips: [
        "Sử dụng kỹ thuật Skimming để nắm bắt ý chính toàn bài.",
        "Scanning các con số, tên riêng để trả lời câu hỏi chi tiết.",
        "Gạch chân các trạng từ liên kết câu để hiểu mạch tư duy tác giả."
      ],
      practicePath: "/study/reading",
      gradient: "from-emerald-400 via-teal-500 to-teal-650",
      glow: "shadow-emerald-500/20",
      ringColor: "ring-teal-400 dark:ring-teal-800",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      difficulty: "Khó",
      difficultyColor: "bg-red-100 dark:bg-red-955/20 text-red-650 dark:text-red-400"
    };
  }
  if (t === "speaking") {
    return {
      title: "Luyện phát âm từ vựng",
      tips: [
        "Nhấp vào micro và phát âm rõ ràng từ vựng tiếng Anh.",
        "Chú ý phát âm các phụ âm cuối (ending sounds) thật chuẩn xác.",
        "Nghe phát âm mẫu của từ nhiều lần trước khi thực hành nói."
      ],
      practicePath: "/study/practice?subMode=speaking",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      glow: "shadow-orange-500/20",
      ringColor: "ring-orange-450 dark:ring-orange-850",
      iconBg: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455",
      difficulty: "Dễ",
      difficultyColor: "bg-emerald-100 dark:bg-emerald-955/20 text-emerald-650 dark:text-emerald-400"
    };
  }
  if (t === "writing") {
    return {
      title: "Luyện viết chính tả từ",
      tips: [
        "Nghe kỹ phát âm mẫu và điền chính xác từng ký tự tiếng Anh.",
        "Chú ý phân biệt nguyên âm đứng cạnh nhau để tránh gõ sai.",
        "Luyện tập viết từ hàng ngày giúp nhớ sâu mặt chữ tiếng Anh."
      ],
      practicePath: "/study/practice?subMode=writing",
      gradient: "from-purple-400 via-pink-500 to-rose-600",
      glow: "shadow-pink-500/20",
      ringColor: "ring-pink-400 dark:ring-pink-800",
      iconBg: "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      difficulty: "Dễ",
      difficultyColor: "bg-emerald-100 dark:bg-emerald-955/20 text-emerald-650 dark:text-emerald-400"
    };
  }
  if (t === "grammar") {
    return {
      title: "Củng cố ngữ pháp",
      tips: [
        "Xem lại công thức và ví dụ trước khi làm bài tập áp dụng.",
        "Tự đặt ít nhất 2 câu thực tế dùng cấu trúc vừa học.",
        "Ghi chép lại các trường hợp ngoại lệ (irregular forms)."
      ],
      practicePath: "/study/grammar",
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      glow: "shadow-cyan-500/20",
      ringColor: "ring-cyan-400 dark:ring-cyan-800",
      iconBg: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
      difficulty: "Dễ",
      difficultyColor: "bg-emerald-100 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-400"
    };
  }
  // Default vocabulary
  return {
    title: "Tích lũy từ vựng chủ đề",
    tips: [
      "Học qua phương pháp Spaced Repetition (Lặp lại ngắt quãng).",
      "Tưởng tượng hình ảnh hoặc câu chuyện liên quan đến từ mới.",
      "Thực hành làm quiz từ vựng ngay để ghi nhớ sâu vào trí nhớ dài hạn."
    ],
    practicePath: "/vocabulary",
    gradient: "from-sky-400 via-indigo-500 to-violet-650",
    glow: "shadow-sky-500/20",
    ringColor: "ring-sky-400 dark:ring-sky-800",
    iconBg: "bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-455",
    difficulty: "Dễ",
    difficultyColor: "bg-emerald-100 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-400"
  };
};

// Helper for dynamic border glows on bento cards based on lesson types
const getHoverStyles = (type: string) => {
  const t = type.toLowerCase();
  if (t === "listening") return "hover:border-blue-500/50 dark:hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.08)]";
  if (t === "reading") return "hover:border-emerald-500/50 dark:hover:border-emerald-400/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]";
  if (t === "speaking") return "hover:border-orange-500/50 dark:hover:border-orange-400/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.08)]";
  if (t === "writing") return "hover:border-purple-500/50 dark:hover:border-purple-400/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.08)]";
  if (t === "grammar") return "hover:border-cyan-500/50 dark:hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.08)]";
  return "hover:border-sky-500/50 dark:hover:border-sky-400/30 hover:shadow-[0_0_15px_rgba(14,165,233,0.08)]";
};

function SkeletonLoader() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 md:px-6 animate-pulse" suppressHydrationWarning>
      {/* Top Bento Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bezel md:col-span-2 h-36 bg-slate-200 dark:bg-neutral-850 rounded-[24px]" />
        <div className="bezel h-36 bg-slate-200 dark:bg-neutral-850 rounded-[24px]" />
      </div>

      {/* Grid */}
      <div className="grid gap-8 lg:grid-cols-5 items-start">
        <div className="lg:col-span-3 space-y-8">
          {[1, 2].map((week) => (
            <div key={week} className="bezel">
              <div className="bezel-inner bg-slate-50 dark:bg-neutral-950/40 p-4 sm:p-6 space-y-6 rounded-[24px] border border-slate-150 dark:border-neutral-850/60">
                <div className="h-10 w-48 bg-slate-300 dark:bg-neutral-800 rounded-lg" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 w-full bg-slate-200 dark:bg-neutral-900 rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 space-y-6 hidden lg:block">
          <div className="bezel h-96 bg-slate-100 dark:bg-neutral-900 rounded-[24px]" />
        </div>
      </div>
    </div>
  );
}

export default function StudyPlanPage() {
  const { plan, isLoading, loadPlan, generatePlan, toggleTask } = useStudyPlanStore();
  const { user } = useAuthStore();
  const [targetExam, setTargetExam] = useState<"TOEIC" | "IELTS">("TOEIC");
  const [targetScore, setTargetScore] = useState<string>("750");
  const [weeklyHours, setWeeklyHours] = useState<number>(10);

  // Unified selection state for both task detail and weekly milestones
  const [selectedNode, setSelectedNode] = useState<{
    type: "task" | "milestone" | "boss";
    id: string; // task.id or `milestone-week-${weekNum}`
    task?: DailyTask;
    milestone?: {
      week: number;
      isCompleted: boolean;
      isClaimed: boolean;
      daysCompleted: number;
    };
    bossIndex?: number;
  } | null>(null);

  // Local storage cache for claimed weekly rewards
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([]);

  useEffect(() => {
    loadPlan();
  }, [user, loadPlan]);

  // Load claimed milestone chests from localStorage
  useEffect(() => {
    if (user && plan) {
      const claimed: number[] = [];
      for (let w = 1; w <= 5; w++) {
        if (localStorage.getItem(`claimed_milestone_${user.id}_week_${w}`) === "true") {
          claimed.push(w);
        }
      }
      setClaimedMilestones(claimed);
    }
  }, [plan, user]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Goal-driven roadmap: calculate a dummy target date 30 days in the future to satisfy current API requirement
    const defaultTargetDate = new Date();
    defaultTargetDate.setDate(defaultTargetDate.getDate() + 30);
    const targetDateStr = defaultTargetDate.toISOString().split("T")[0];
    
    const success = await generatePlan({
      targetExam,
      targetScore: parseInt(targetScore),
      targetDate: targetDateStr,
      currentLevel: targetExam === "TOEIC" ? "Intermediate" : "Band 6.0",
      weeklyHours,
    });
    if (success) {
      setSelectedNode(null);
    }
  };

  const handleClaimMilestone = async (weekNum: number) => {
    if (!user) return;

    // Trigger Zustand authStore XP reward award (+50 XP) which automatically syncs to Prisma profile
    useAuthStore.getState().awardXp(50);

    // Save claim status locally
    localStorage.setItem(`claimed_milestone_${user.id}_week_${weekNum}`, "true");
    setClaimedMilestones(prev => [...prev, weekNum]);

    // Update current active node details status
    setSelectedNode({
      type: "milestone",
      id: `milestone-week-${weekNum}`,
      milestone: {
        week: weekNum,
        isCompleted: true,
        isClaimed: true,
        daysCompleted: 7
      }
    });
  };

  const getTaskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "listening":
        return <Headphones className="h-5.5 w-5.5 stroke-[2]" />;
      case "reading":
        return <BookOpen className="h-5.5 w-5.5 stroke-[2]" />;
      case "speaking":
        return <Mic className="h-5.5 w-5.5 stroke-[2]" />;
      case "writing":
        return <PenTool className="h-5.5 w-5.5 stroke-[2]" />;
      default:
        return <Compass className="h-5.5 w-5.5 stroke-[2]" />;
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  // 1. SETUP ONBOARDING VIEW (Time-free, Goal-based setup only)
  if (!plan) {
    const toeicScores = ["550", "750", "850", "950"];
    const ieltsScores = ["5.5", "6.5", "7.5", "8.5"];
    const scoresList = targetExam === "TOEIC" ? toeicScores : ieltsScores;

    return (
      <div className="mx-auto max-w-3xl space-y-8 p-4 md:p-6" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-[#0059bb]/10 dark:bg-sky-950/30 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-300">
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse stroke-[2]" />
            Lộ Trình Học Tự Do
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Thiết kế Lộ trình học tiếng Anh cá nhân hóa
          </h1>
          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-semibold leading-relaxed">
            Tạo giáo án học tập không giới hạn thời gian, tự do chinh phục mục tiêu IELTS hoặc TOEIC theo nhịp độ của riêng bạn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.1 }}
          className="bezel"
        >
          <form onSubmit={handleGenerate} className="bezel-inner bg-white dark:bg-neutral-900 p-6 md:p-8 space-y-6">
            {/* Exam Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                Kỳ thi mục tiêu
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* TOEIC */}
                <div className={`p-1 rounded-[24px] border transition-all duration-300 ${
                  targetExam === "TOEIC"
                    ? "bg-slate-100/80 dark:bg-white/5 border-[#0059bb] shadow-[0_0_15px_rgba(0,89,187,0.15)] scale-[1.02]"
                    : "bg-slate-50/50 dark:bg-neutral-950/10 border-slate-200 dark:border-neutral-800"
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetExam("TOEIC");
                      setTargetScore("750");
                    }}
                    className={`w-full p-4 rounded-[calc(24px-6px)] text-left transition-all cursor-pointer ${
                      targetExam === "TOEIC"
                        ? "bg-white dark:bg-[#0c0c0f] border-[#0059bb] shadow-sm"
                        : "bg-white dark:bg-neutral-900 border-transparent hover:border-slate-200 dark:hover:border-neutral-800"
                    } border-2 active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${
                        targetExam === "TOEIC" ? "bg-[#0059bb] text-white shadow-md shadow-blue-500/20" : "bg-slate-100 dark:bg-neutral-800 text-slate-500"
                      }`}>
                        📊
                      </div>
                      <div>
                        <p className="font-black text-sm text-slate-900 dark:text-white">TOEIC</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Giao tiếp Công sở</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* IELTS */}
                <div className={`p-1 rounded-[24px] border transition-all duration-300 ${
                  targetExam === "IELTS"
                    ? "bg-slate-100/80 dark:bg-white/5 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.15)] scale-[1.02]"
                    : "bg-slate-50/50 dark:bg-neutral-950/10 border-slate-200 dark:border-neutral-800"
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetExam("IELTS");
                      setTargetScore("6.5");
                    }}
                    className={`w-full p-4 rounded-[calc(24px-6px)] text-left transition-all cursor-pointer ${
                      targetExam === "IELTS"
                        ? "bg-white dark:bg-[#0c0c0f] border-indigo-500 shadow-sm"
                        : "bg-white dark:bg-neutral-900 border-transparent hover:border-slate-200 dark:hover:border-neutral-800"
                    } border-2 active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${
                        targetExam === "IELTS" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "bg-slate-100 dark:bg-neutral-800 text-slate-500"
                      }`}>
                        🎓
                      </div>
                      <div>
                        <p className="font-black text-sm text-slate-900 dark:text-white">IELTS</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Học thuật quốc tế</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Score & Hours selections */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                  Điểm số mục tiêu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {scoresList.map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setTargetScore(score)}
                      className={`h-11 px-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer active:scale-[0.98] ${
                        targetScore === score
                          ? targetExam === "TOEIC"
                            ? "border-[#0059bb] bg-blue-50/40 text-[#0059bb] dark:text-sky-300 dark:bg-sky-950/30 shadow-sm"
                            : "border-indigo-600 bg-indigo-50/40 text-indigo-700 dark:text-indigo-300 dark:bg-indigo-950/30 shadow-sm"
                          : "border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 bg-white dark:bg-neutral-900/40 hover:border-slate-300 dark:hover:border-neutral-700 font-bold"
                      }`}
                    >
                      {targetExam} {score}{targetExam === "TOEIC" ? "+" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time commitment */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
                  Cam kết học tập
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[5, 10, 15, 20].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setWeeklyHours(hours)}
                      className={`h-11 px-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer active:scale-[0.98] ${
                        weeklyHours === hours
                          ? "border-emerald-500 bg-emerald-50/40 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-950/30 shadow-sm"
                          : "border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 bg-white dark:bg-neutral-900/40 hover:border-slate-300 dark:hover:border-neutral-700 font-bold"
                      }`}
                    >
                      {hours} giờ / tuần
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full h-11 sm:h-12 text-xs md:text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 hover:opacity-95 text-white border-none rounded-xl sm:rounded-2xl active:scale-[0.98] transition-all"
              >
                Tạo Lộ Trình Học
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. ACTIVE TRAIL MAP VIEW
  const completedTasksCount = plan.dailyTasks.filter((t) => t.isCompleted).length;
  const progressPercent = Math.round((completedTasksCount / plan.dailyTasks.length) * 100);

  // Group existing 30 tasks into Chapters and Units:
  // Chapter 1: Lessons 1-15 (Index 0-14). Boss Challenge: Lesson 15 (Index 14)
  //   - Unit 1: Lessons 1-7 (Index 0-6). Milestone chest: Week 1
  //   - Unit 2: Lessons 8-14 (Index 7-13). Milestone chest: Week 2
  // Chapter 2: Lessons 16-30 (Index 15-29). Boss Challenge: Lesson 30 (Index 29)
  //   - Unit 3: Lessons 16-22 (Index 15-21). Milestone chest: Week 3
  //   - Unit 4: Lessons 23-29 (Index 22-28). Milestone chest: Week 4

  const chapterIndex = completedTasksCount >= 15 ? 2 : 1;
  const activeChapterTitle = chapterIndex === 1 ? "Chương 1: Nền tảng & Khởi động" : "Chương 2: Chinh phục & Về đích";
  const activeChapterDesc = chapterIndex === 1 
    ? "Xây dựng nền tảng vững chắc cho kỳ thi mục tiêu. Tiếp cận bài học bento từ dễ đến trung bình."
    : "Tối ưu hóa các điểm ngữ pháp nâng cao, luyện tốc độ phản xạ và chiến thuật làm đề thi thật.";

  // Partition tasks
  const ch1Tasks = plan.dailyTasks.slice(0, 15);
  const ch2Tasks = plan.dailyTasks.slice(15, 30);

  // Group Units
  const units = [
    {
      id: 1,
      chapter: 1,
      title: "Unit 1: Tích lũy cơ bản",
      description: "Làm quen với các chủ đề văn phòng cơ bản, nghe IPA và từ vựng thông dụng.",
      tasks: ch1Tasks.slice(0, 7), // 7 tasks
      milestoneWeek: 1
    },
    {
      id: 2,
      chapter: 1,
      title: "Unit 2: Tăng tốc phản xạ",
      description: "Tiếp xúc các cấu trúc ngữ pháp đàm thoại dài và cải thiện khả năng nghe nhanh.",
      tasks: ch1Tasks.slice(7, 14), // 7 tasks
      milestoneWeek: 2
    },
    {
      id: 3,
      chapter: 2,
      title: "Unit 3: Thực hành nâng cao",
      description: "Nắm vững kỹ năng scanning từ khóa nhanh và cách viết email chuyên nghiệp.",
      tasks: ch2Tasks.slice(0, 7), // 7 tasks
      milestoneWeek: 3
    },
    {
      id: 4,
      chapter: 2,
      title: "Unit 4: Giải đề & Tối ưu",
      description: "Khắc phục triệt để các bẫy thường gặp và hoàn chỉnh chiến thuật phân bổ thời gian.",
      tasks: ch2Tasks.slice(7, 14), // 7 tasks
      milestoneWeek: 4
    }
  ];

  // Boss tasks: Lesson 15 (Ch1 index 14), Lesson 30 (Ch2 index 14)
  const boss1Task = ch1Tasks[14];
  const boss2Task = ch2Tasks[14];

  // Helper to determine task state: Locked, Available, Learning, Completed
  const getTaskState = (task: DailyTask) => {
    if (task.isCompleted) return "Completed";
    const absoluteIndex = plan.dailyTasks.findIndex((t) => t.id === task.id);
    const isFirstUncompleted = absoluteIndex === plan.dailyTasks.findIndex((t) => !t.isCompleted);
    if (isFirstUncompleted) return "Learning";
    if (absoluteIndex > 0 && !plan.dailyTasks[absoluteIndex - 1].isCompleted) return "Locked";
    return "Available";
  };

  // Shared Detail View Component
  const renderDetailContent = (
    node: NonNullable<typeof selectedNode>,
    onClose: () => void
  ) => {
    if (node.type === "task" || node.type === "boss") {
      const selectedTask = node.task!;
      const state = getTaskState(selectedTask);
      const meta = getTaskMetadata(selectedTask.taskType);
      const absoluteIndex = plan.dailyTasks.findIndex((t) => t.id === selectedTask.id);
      
      const isBoss = node.type === "boss";

      return (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400">
                {isBoss ? "🔥 THỬ THÁCH BOSS CHƯƠNG" : `Chi tiết Bài học ${absoluteIndex + 1}`}
              </span>
              <h2 className="text-base font-black text-slate-900 dark:text-white font-display mt-0.5">
                {isBoss ? `Đấu Trùm Cuối Chapter ${node.bossIndex}` : meta.title}
              </h2>
            </div>
            <Badge 
              variant={selectedTask.isCompleted ? "success" : state === "Learning" ? "primary" : "neutral"} 
              className="font-bold px-2.5 py-0.5 rounded-full uppercase text-[10px]"
            >
              {selectedTask.isCompleted ? "Perfect" : state === "Learning" ? "Đang học" : "Đang khóa"}
            </Badge>
          </div>

          {/* AI Success Predictor Bento Card */}
          <div className="p-4 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-[#11121d] dark:to-[#0a0f18] border border-blue-500/20 dark:border-indigo-500/15 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center justify-center">
              <Activity className="h-4 w-4 text-[#0059bb] dark:text-sky-400 animate-pulse stroke-[2]" />
            </div>
            <h4 className="text-[9px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">Phân Tích Lộ Trình</h4>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-display">
                {selectedTask.isCompleted ? "100%" : isBoss ? "72%" : "88%"}
              </span>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Xác suất vượt qua</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
              {selectedTask.isCompleted 
                ? "Bài học đã hoàn chỉnh xuất sắc. Bạn có thể học lại để củng cố trí nhớ dài hạn bất cứ lúc nào."
                : isBoss 
                  ? "Khuyến nghị: Xem lại các mẹo ngữ pháp và chuẩn bị tinh thần tập trung trước khi nhấn khiêu chiến Boss."
                  : "Mục tiêu bài học nằm trong khoảng khả năng tốt của bạn. Hệ thống gợi ý hoàn thành ngay!"
              }
            </p>
          </div>

          {/* Task Info with dynamic type styling */}
          <div className="flex items-start gap-4 bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-xl border border-slate-200/60 dark:border-neutral-850/60">
            <div className={`rounded-xl p-3.5 shrink-0 ${meta.iconBg} shadow-sm`}>
              {getTaskIcon(selectedTask.taskType)}
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">Nhiệm vụ bài học</h3>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-200 font-extrabold leading-relaxed">
                {selectedTask.description.replace(/^Ngày \d+: /, "")}
              </p>
            </div>
          </div>

          {/* Reward block */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between text-sm bg-blue-50/40 dark:bg-indigo-950/20 p-3 rounded-xl border border-blue-200/50 dark:border-indigo-900/30">
              <span className="font-black text-[#0059bb] dark:text-sky-300 text-[10px] uppercase">Phần thưởng</span>
              <span className="font-black text-xs text-[#0059bb] dark:text-sky-300 font-display">
                +{selectedTask.xpReward} XP
              </span>
            </div>
            <div className="flex items-center justify-between text-sm bg-amber-50/50 dark:bg-amber-955/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
              <span className="font-black text-amber-900 dark:text-amber-300 text-[10px] uppercase">Ước tính</span>
              <span className="font-black text-xs text-amber-600 dark:text-amber-400 font-display">
                {isBoss ? "⏱️ 10m" : "⏱️ 5m"}
              </span>
            </div>
          </div>

          {/* Concentric child card tips */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">💡 Hướng dẫn & mẹo tự học</h4>
            <div className="p-3.5 bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/30 rounded-xl space-y-2">
              {meta.tips.map((tip, i) => (
                <div key={i} className="flex gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI recommendation reminder */}
          {!selectedTask.isCompleted && isBoss && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 dark:bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 font-extrabold">
              <AlertCircle className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Chế độ Boss Challenge giới hạn 10 phút đếm ngược. Thử thách bắt đầu ngay khi nhấn nút.</span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-2.5 pt-2">
            {state !== "Locked" ? (
              <>
                <Link href={meta.practicePath} className="w-full" onClick={onClose}>
                  <Button
                    variant="primary"
                    className={`w-full h-11 sm:h-12 text-xs md:text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer rounded-xl sm:rounded-2xl ${
                      isBoss ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-600 shadow-red-500/20" : "bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 shadow-blue-500/20"
                    } text-white shadow-md active:scale-[0.98] transition-all border border-white/10`}
                  >
                    {isBoss ? "KHIÊU CHIẾN BOSS CHALLENGE" : "HỌC NGAY BÀI HỌC"}
                    <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                  </Button>
                </Link>
                {!selectedTask.isCompleted && (
                  <Button
                    variant="ghost"
                    className="w-full h-10 text-xs font-extrabold cursor-pointer rounded-xl text-slate-700 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 active:scale-[0.98]"
                    onClick={async () => {
                      await toggleTask(selectedTask.id, true);
                      onClose();
                    }}
                  >
                    Đánh dấu hoàn thành bài học
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="bezel"
                className="w-full h-11 text-xs font-extrabold cursor-default rounded-xl bg-slate-100 dark:bg-neutral-850 text-slate-500 border border-slate-200/50 dark:border-neutral-800"
                disabled
              >
                Bài học đang khóa (Hãy học bài trước đó)
              </Button>
            )}
            
            {selectedTask.isCompleted && (
              <Button
                variant="bezel"
                className="w-full h-10 text-xs font-extrabold cursor-pointer rounded-xl border border-slate-200 dark:border-neutral-800 active:scale-[0.98]"
                onClick={async () => {
                  await toggleTask(selectedTask.id, false);
                  onClose();
                }}
              >
                Học lại (Đánh dấu chưa xong)
              </Button>
            )}
          </div>
        </div>
      );
    } else {
      // MILESTONE DETAILS (CHEST)
      const { week, isCompleted, isClaimed, daysCompleted } = node.milestone!;
      return (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400">
                Cột mốc chặng học
              </span>
              <h2 className="text-base font-black text-slate-900 dark:text-white font-display mt-0.5">
                Rương Cột Mốc Chặng {week}
              </h2>
            </div>
            <Badge variant={isClaimed ? "success" : isCompleted ? "primary" : "neutral"} className="font-bold px-2.5 py-0.5 rounded-full">
              {isClaimed ? "Đã nhận" : isCompleted ? "Mở khóa" : "Chưa xong"}
            </Badge>
          </div>

          <div className="flex items-start gap-4 bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-xl border border-slate-200/60 dark:border-neutral-850/60">
            <div className="rounded-xl p-3 shrink-0 bg-amber-100 dark:bg-amber-955/30 text-amber-600 flex items-center justify-center shadow-sm">
              <Gift className={`h-6 w-6 stroke-[2] ${isCompleted && !isClaimed ? "animate-bounce" : ""}`} />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">Yêu cầu rương</h3>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-200 font-extrabold leading-relaxed">
                Hoàn thành tất cả 7 bài học học tập của Chặng {week} để mở rương báu nhận +50 XP thưởng động lực.
              </p>
            </div>
          </div>

          {/* Week progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
              <span>Tiến độ bài học chặng</span>
              <span className="text-[#0059bb] dark:text-sky-400">{daysCompleted}/7 bài</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-neutral-850 rounded-full overflow-hidden border border-slate-200/50 dark:border-neutral-800/30 relative">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 relative" 
                style={{ width: `${(daysCompleted / 7) * 100}%` }}
              >
                {daysCompleted > 0 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#10b981]" />
                )}
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-between text-sm bg-amber-50/50 dark:bg-amber-955/20 p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
            <div className="flex items-center gap-2">
              <Trophy className="h-4.5 w-4.5 text-amber-500 stroke-[2]" />
              <span className="font-black text-amber-900 dark:text-amber-300 text-[10px] uppercase">Rương quà tặng</span>
            </div>
            <span className="font-black text-base text-amber-600 dark:text-amber-400 font-display">
              +50 XP
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2">
            {isCompleted ? (
              !isClaimed ? (
                <Button
                  variant="primary"
                  className="w-full h-11 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all animate-pulse"
                  onClick={() => handleClaimMilestone(week)}
                >
                  Nhận 50 XP Thưởng
                  <Gift className="h-4 w-4 stroke-[2]" />
                </Button>
              ) : (
                <Button
                  variant="bezel"
                  className="w-full h-11 text-xs font-extrabold cursor-default rounded-xl bg-slate-150 dark:bg-neutral-850 text-slate-400 border border-slate-200/50 dark:border-neutral-800"
                  disabled
                >
                  Đã nhận thưởng rương chặng
                </Button>
              )
            ) : (
              <Button
                variant="ghost"
                className="w-full h-10 text-xs font-extrabold cursor-pointer rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-[0.98]"
                onClick={onClose}
              >
                Đóng & Tiếp tục học tập
              </Button>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 md:px-6 pb-24" suppressHydrationWarning>
      
      {/* 1. BENTO STATS DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Bento 1: Chapter Progress Card */}
        <div className="bezel md:col-span-2">
          <div className="bezel-inner bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-sky-50/70 dark:from-[#0c0d14] dark:via-[#131522] dark:to-[#0c0d14] p-4 sm:p-5 rounded-[24px] border border-blue-200/80 dark:border-white/10 relative overflow-hidden h-full flex flex-col justify-between shadow-md shadow-blue-500/5">
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-blue-500/10 blur-[60px] pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-300/80 bg-[#0059bb]/10 dark:bg-sky-950/60 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-300">
                  Mục tiêu: {plan.targetExam} · {plan.targetScore}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-300/80 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  {weeklyHours} giờ / tuần
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white pt-1">
                {activeChapterTitle}
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed max-w-md hidden sm:block">
                {activeChapterDesc}
              </p>
            </div>

            <div className="space-y-1.5 pt-4 relative z-10">
              <div className="flex justify-between text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                <span>Tiến độ Chapter</span>
                <span className="text-[#0059bb] dark:text-sky-400 font-display font-black">{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300/50 dark:border-white/10 relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-[#0059bb] to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                />
              </div>
              <div className="text-[10px] text-slate-700 dark:text-slate-300 font-black">
                Đã hoàn thành {completedTasksCount}/{plan.dailyTasks.length} bài học mục tiêu
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Streak Flame & Coins Card */}
        <div className="bezel">
          <div className="bezel-inner bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-yellow-50/60 dark:from-[#0c0c0f] dark:to-[#17140e] p-4 sm:p-5 rounded-[24px] border border-amber-200/80 dark:border-amber-500/20 h-full flex flex-col justify-between relative overflow-hidden shadow-md shadow-amber-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-orange-500/10 blur-[40px] pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400">Streak liên tiếp</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Flame className="h-8 w-8 text-amber-500 fill-amber-500 animate-pulse stroke-[2]" />
                  <span className="text-3xl font-black font-display text-slate-900 dark:text-white">
                    {user?.currentStreak || 0}
                  </span>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 mt-2">ngày</span>
                </div>
              </div>
              <div className="bg-amber-100/80 dark:bg-amber-955/30 border border-amber-300/80 dark:border-amber-900/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <Coins className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 stroke-[2]" />
                <span className="text-xs font-black text-amber-800 dark:text-amber-300 font-display">
                  {user?.coins || 0}
                </span>
              </div>
            </div>

            <div className="border-t border-amber-200/60 dark:border-neutral-850 pt-3 mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold">
                Học vị hiện tại:
              </span>
              <span className="text-xs font-black text-[#0059bb] dark:text-sky-400 uppercase tracking-wider font-display">
                👑 {user?.title || "Học Viên Mới"} (Lv. {user?.level || 1})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BENTO ROADMAP & SIDEBAR DETAILED COLUMN */}
      <div className="grid gap-8 lg:grid-cols-5 items-start">
        
        {/* Left Cột: Bento Unit Trail Container */}
        <div className="lg:col-span-3 space-y-8">
          
          {units.map((unit) => {
            const isUnitCompleted = unit.tasks.every(t => t.isCompleted);
            const completedCount = unit.tasks.filter(t => t.isCompleted).length;
            const isMilestoneClaimed = claimedMilestones.includes(unit.milestoneWeek);
            
            // Check if this unit is active or locked
            const isUnitLocked = unit.id > 1 && !units[unit.id - 2].tasks.every(t => t.isCompleted);

            return (
              <div 
                key={unit.id}
                className={`bezel transition-all duration-300 ${
                  isUnitLocked ? "opacity-55" : ""
                }`}
              >
                {/* Bento outer container */}
                <div className="bezel-inner bg-white dark:bg-[#07070a] p-4 sm:p-5 md:p-6 rounded-[24px] border border-slate-200/80 dark:border-white/10 relative overflow-hidden space-y-6 shadow-sm">
                  
                  {/* Decorative faint grid lines in bento box */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                  {/* Unit Title Header - Glassmorphic design */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-neutral-900 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-md ${
                        isUnitCompleted 
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
                          : isUnitLocked 
                            ? "bg-slate-100 dark:bg-neutral-850 text-slate-400"
                            : "bg-gradient-to-br from-[#0059bb] via-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                      }`}>
                        U{unit.id}
                      </div>
                      <div>
                        <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white font-display">
                          {unit.title}
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold max-w-sm mt-0.5 leading-normal">
                          {unit.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Badge variant={isUnitCompleted ? "success" : "neutral"} className="text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                        {isUnitCompleted ? "Hoàn thành" : `Tiến độ: ${completedCount}/7`}
                      </Badge>
                    </div>
                  </div>

                  {/* Straight linear timeline layout (Responsive self-centering no absolute pixel offset hacks) */}
                  <div className="relative space-y-4 pt-1 z-10 w-full">
                    {/* Glowing timeline pipeline tube positioned exactly at left-6 (24px) */}
                    <div className="absolute left-5 sm:left-6 top-4 bottom-4 w-1 bg-slate-100 dark:bg-neutral-900 rounded-full" />
                    
                    {/* Glowing active path segment exactly aligned to left-6 */}
                    {completedCount > 0 && (
                      <div 
                        className="absolute left-5 sm:left-6 top-4 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full transition-all duration-500" 
                        style={{ height: `${(Math.min(completedCount, 6) / 7) * 100}%` }}
                      />
                    )}

                    {/* Render task items as rectangular Bento rows */}
                    {unit.tasks.map((task, idx) => {
                      const absoluteIndex = plan.dailyTasks.findIndex((t) => t.id === task.id);
                      const state = getTaskState(task);
                      const isSelected = selectedNode?.type === "task" && selectedNode?.id === task.id;
                      const meta = getTaskMetadata(task.taskType);

                      return (
                        <div key={task.id} className="relative flex items-center w-full min-h-[4.5rem]">
                          
                          {/* Timeline node connection sphere - dynamically centered at left-6 */}
                          <div className="absolute left-5 sm:left-6 -translate-x-1/2 z-20 flex items-center justify-center">
                            <motion.button
                              whileHover={state === "Locked" ? {} : { scale: 1.15 }}
                              whileTap={state === "Locked" ? {} : { scale: 0.95 }}
                              onClick={() => setSelectedNode({ type: "task", id: task.id, task })}
                              className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all shadow-md relative cursor-pointer ${
                                state === "Completed"
                                  ? "bg-gradient-to-br from-emerald-400 to-teal-500 border-white dark:border-neutral-950 text-white shadow-emerald-500/10"
                                  : state === "Learning"
                                    ? "bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-650 border-white dark:border-neutral-950 text-white ring-2 ring-offset-2 ring-indigo-400"
                                    : "bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-400 dark:text-neutral-500"
                              }`}
                              disabled={state === "Locked"}
                            >
                              {/* 3D reflection highlight */}
                              {state !== "Locked" && (
                                <div className="absolute top-0.5 left-1 right-1 h-1.5 bg-white/25 rounded-full blur-[0.3px]" />
                              )}
                              
                              {state === "Completed" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                              ) : state === "Locked" ? (
                                <Lock className="h-3 w-3 opacity-60" />
                              ) : (
                                <div className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                              )}
                            </motion.button>
                          </div>

                          {/* Lesson Card Capsule - Rectangular bento row with dynamic hover classes, starts at ml-12 to perfectly clear the timeline */}
                          <div 
                            onClick={() => {
                              if (state !== "Locked") {
                                setSelectedNode({ type: "task", id: task.id, task });
                              }
                            }}
                            className={`flex-1 min-w-0 ml-10 sm:ml-12 flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-250 cursor-pointer ${
                              state === "Locked"
                                ? "bg-slate-50/40 dark:bg-neutral-900/10 border-slate-100 dark:border-neutral-850/20 text-slate-300 dark:text-slate-500 pointer-events-none"
                                : isSelected
                                  ? "bg-slate-100/50 dark:bg-white/5 border-indigo-500 dark:border-indigo-400/50 shadow-md " + getHoverStyles(task.taskType)
                                  : state === "Learning"
                                    ? "bg-[#0b0c10]/40 dark:bg-[#161824]/20 border-indigo-500/40 dark:border-indigo-500/25 shadow-sm hover:border-indigo-550 dark:hover:border-indigo-400 " + getHoverStyles(task.taskType)
                                    : "bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-850/50 " + getHoverStyles(task.taskType)
                            }`}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              {/* Small type badge */}
                              <div className={`p-2.5 rounded-xl shrink-0 ${state === "Locked" ? "bg-slate-100 dark:bg-neutral-950 text-slate-300" : meta.iconBg} shadow-sm`}>
                                {getTaskIcon(task.taskType)}
                              </div>
                              <div className="text-left min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                                    Bài {absoluteIndex + 1}
                                  </span>
                                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase shrink-0 ${state === "Locked" ? "bg-slate-100 dark:bg-neutral-950 text-slate-300" : meta.difficultyColor}`}>
                                    {meta.difficulty}
                                  </span>
                                </div>
                                <h4 className={`text-xs font-bold mt-0.5 truncate ${state === "Locked" ? "text-slate-400 dark:text-slate-600" : "text-slate-800 dark:text-slate-200"}`}>
                                  {meta.title}
                                </h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 hidden sm:inline">
                                +{task.xpReward} XP
                              </span>
                              {state === "Completed" ? (
                                <span className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                                  Perfect
                                </span>
                              ) : state === "Learning" ? (
                                <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 flex items-center gap-0.5 animate-pulse">
                                  Đang học
                                  <ChevronRight className="h-3 w-3" />
                                </span>
                              ) : (
                                <Lock className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}

                    {/* Checkpoint Chest Row (Unit end) */}
                    <div className="relative flex items-center w-full min-h-[3.5rem] pt-1">
                      {/* Node connection - aligned exactly to left-6 */}
                      <div className="absolute left-5 sm:left-6 -translate-x-1/2 z-20 flex items-center justify-center">
                        <button
                          onClick={() => setSelectedNode({
                            type: "milestone",
                            id: `milestone-week-${unit.milestoneWeek}`,
                            milestone: {
                              week: unit.milestoneWeek,
                              isCompleted: isUnitCompleted,
                              isClaimed: isMilestoneClaimed,
                              daysCompleted: completedCount
                            }
                          })}
                          className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all shadow-md relative cursor-pointer ${
                            isMilestoneClaimed
                              ? "bg-slate-105 dark:bg-neutral-850 border-slate-350/50 dark:border-neutral-800 text-slate-400"
                              : isUnitCompleted
                                ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-500 border-white dark:border-neutral-900 text-white animate-bounce shadow-lg shadow-amber-500/20"
                                : "bg-slate-55 dark:bg-neutral-855 border-slate-205 dark:border-neutral-800 text-slate-350 dark:text-neutral-600"
                          }`}
                        >
                          <Gift className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Capsule representation - aligned to ml-12 */}
                      <div
                        onClick={() => setSelectedNode({
                          type: "milestone",
                          id: `milestone-week-${unit.milestoneWeek}`,
                          milestone: {
                            week: unit.milestoneWeek,
                            isCompleted: isUnitCompleted,
                            isClaimed: isMilestoneClaimed,
                            daysCompleted: completedCount
                          }
                        })}
                        className={`flex-1 min-w-0 ml-10 sm:ml-12 flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                          isMilestoneClaimed
                            ? "bg-slate-50/20 dark:bg-neutral-900/10 border-slate-200 dark:border-neutral-850/20 text-slate-400 hover:bg-slate-50/45 dark:hover:bg-[#0c0c0f]/20"
                            : isUnitCompleted
                              ? "bg-amber-50/10 dark:bg-amber-950/5 border-amber-400/60 dark:border-amber-400/30 text-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.1)] hover:border-amber-500"
                              : "bg-transparent border-slate-200 dark:border-neutral-850 text-slate-400 dark:text-slate-400 hover:bg-slate-50/20 dark:hover:bg-[#0c0c0f]/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Gift className={`h-4.5 w-4.5 shrink-0 ${isUnitCompleted && !isMilestoneClaimed ? "text-amber-500 animate-pulse" : ""}`} />
                          <span className="text-[11px] font-bold">
                            {isMilestoneClaimed ? `Cột mốc Chặng ${unit.milestoneWeek} (Đã nhận thưởng)` : `Mở khóa Rương cột mốc Chặng ${unit.milestoneWeek}`}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-amber-550 dark:text-amber-400 uppercase shrink-0 ml-2">
                          +50 XP
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

          {/* 3. CHAPTER BOSS CHALLENGES CARD PORTALS */}
          {/* Chapter 1 Boss (At index 14) */}
          {boss1Task && (() => {
            const isCh1Completed = units.slice(0, 2).every(u => u.tasks.every(t => t.isCompleted));
            const state = getTaskState(boss1Task);
            const isSelected = selectedNode?.type === "boss" && selectedNode?.id === boss1Task.id;

            return (
              <motion.div
                whileHover={state === "Locked" ? {} : { scale: 1.01 }}
                className={`bezel transition-all duration-300 ${
                  state === "Locked" ? "opacity-55" : ""
                }`}
              >
                <div 
                  onClick={() => {
                    if (state !== "Locked") {
                      setSelectedNode({ type: "boss", id: boss1Task.id, task: boss1Task, bossIndex: 1 });
                    }
                  }}
                  className={`bezel-inner p-5 sm:p-6 rounded-[24px] cursor-pointer relative overflow-hidden transition-all border ${
                    boss1Task.isCompleted
                      ? "bg-gradient-to-r from-emerald-950/20 via-neutral-900 to-neutral-950 border-emerald-500/20"
                      : state === "Locked"
                        ? "bg-slate-100/50 dark:bg-neutral-900/10 border-slate-200 dark:border-neutral-850/20"
                        : "bg-gradient-to-r from-red-950/30 via-[#0c0c0f] to-red-950/20 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/50"
                  }`}
                >
                  {/* Dynamic pulse background for active boss challenge */}
                  {!boss1Task.isCompleted && state === "Learning" && (
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                        boss1Task.isCompleted
                          ? "bg-emerald-500 text-white"
                          : state === "Locked"
                            ? "bg-slate-150 dark:bg-neutral-805 text-slate-400"
                            : "bg-red-500 text-white animate-bounce shadow-md shadow-red-500/30"
                      }`}>
                        👹
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400">
                            Thử thách Boss - Kết thúc Chapter 1
                          </span>
                          {boss1Task.isCompleted && (
                            <Badge variant="success" className="text-[9px] uppercase px-1.5 py-0.2">DEFEATED</Badge>
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                          Boss Challenge 1: Chinh phục Nền tảng
                        </h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-normal max-w-md">
                          Bài kiểm tra tổng hợp 15 câu hỏi nâng cao giới hạn trong 10 phút. Đòi hỏi độ phản xạ nhanh.
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex justify-end">
                      {boss1Task.isCompleted ? (
                        <span className="text-xs font-black text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Đã Vượt Qua
                        </span>
                      ) : state === "Learning" ? (
                        <Button variant="primary" className="py-2.5 px-4.5 text-xs font-black bg-red-650 hover:bg-red-600 text-white rounded-xl shadow-md cursor-pointer tracking-wider">
                          KHIÊU CHIẾN
                        </Button>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                          <Lock className="h-4 w-4" /> Đang khóa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Chapter 2 Boss (At index 29) */}
          {boss2Task && (() => {
            const state = getTaskState(boss2Task);
            const isSelected = selectedNode?.type === "boss" && selectedNode?.id === boss2Task.id;

            return (
              <motion.div
                whileHover={state === "Locked" ? {} : { scale: 1.01 }}
                className={`bezel transition-all duration-300 ${
                  state === "Locked" ? "opacity-55" : ""
                }`}
              >
                <div 
                  onClick={() => {
                    if (state !== "Locked") {
                      setSelectedNode({ type: "boss", id: boss2Task.id, task: boss2Task, bossIndex: 2 });
                    }
                  }}
                  className={`bezel-inner p-5 sm:p-6 rounded-[24px] cursor-pointer relative overflow-hidden transition-all border ${
                    boss2Task.isCompleted
                      ? "bg-gradient-to-r from-emerald-950/20 via-neutral-900 to-neutral-955 border-emerald-500/20"
                      : state === "Locked"
                        ? "bg-slate-100/50 dark:bg-neutral-900/10 border-slate-200 dark:border-neutral-850/20"
                        : "bg-gradient-to-r from-red-950/30 via-[#0c0c0f] to-red-950/20 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/50"
                  }`}
                >
                  {/* Dynamic pulse background for active boss challenge */}
                  {!boss2Task.isCompleted && state === "Learning" && (
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                        boss2Task.isCompleted
                          ? "bg-emerald-500 text-white"
                          : state === "Locked"
                            ? "bg-slate-150 dark:bg-neutral-805 text-slate-400"
                            : "bg-red-500 text-white animate-bounce shadow-md shadow-red-500/30"
                      }`}>
                        👑
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400">
                            Thử thách Boss - Kết thúc Chapter 2
                          </span>
                          {boss2Task.isCompleted && (
                            <Badge variant="success" className="text-[9px] uppercase px-1.5 py-0.2">DEFEATED</Badge>
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                          Final Boss: Trận chiến Cuối cùng
                        </h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-normal max-w-md">
                          Tổng hợp toàn bộ kiến thức nâng cao, bài giải đề hoàn chỉnh để mở khóa Chứng nhận và hoàn tất Lộ trình.
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex justify-end">
                      {boss2Task.isCompleted ? (
                        <span className="text-xs font-black text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Đã Vượt Qua
                        </span>
                      ) : state === "Learning" ? (
                        <Button variant="primary" className="py-2.5 px-4.5 text-xs font-black bg-red-650 hover:bg-red-600 text-white rounded-xl shadow-md cursor-pointer tracking-wider">
                          QUYẾT CHIẾN
                        </Button>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                          <Lock className="h-4 w-4" /> Đang khóa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

        </div>

        {/* Right Cột: Sticky Detail Panel (Desktop only) */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24 hidden lg:block font-sans">
          
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring", stiffness: 90, damping: 15 }}
                className="bezel animate-spring"
              >
                <div className="bezel-inner bg-white dark:bg-[#0c0c0f] p-6 border border-slate-100/50 dark:border-white/5 shadow-xl relative overflow-hidden">
                  {renderDetailContent(selectedNode, () => setSelectedNode(null))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bezel"
              >
                <div className="bezel-inner bg-white dark:bg-[#0c0c0f] p-8 text-center space-y-5 border border-slate-100/50 dark:border-white/5">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-850">
                    <Compass className="h-7 w-7 text-slate-400 animate-spin" style={{ animationDuration: "16s" }} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-display">Bắt đầu hành trình</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-bold">
                    Bấm vào bất kỳ bài học hoặc cột mốc chặng học nào trên sơ đồ quãng đường để xem chi tiết, nhận mẹo tự học và tham gia bài học tương ứng.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset study plan */}
          <div className="bezel">
            <div className="bezel-inner bg-slate-50 dark:bg-[#07070a] p-4 flex items-center justify-between border border-slate-100/50 dark:border-white/5">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Thiết lập lại lộ trình?</h4>
                <p className="text-[10px] text-slate-550 mt-0.5 font-semibold">Tạo lộ trình học tập mới bất cứ lúc nào.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-rose-500 hover:bg-rose-55/20 hover:text-rose-600 dark:hover:bg-rose-950/20 cursor-pointer rounded-xl transition-colors"
                onClick={() => {
                  if (confirm("Bạn có chắc chắn muốn xóa lộ trình hiện tại và thiết lập một lộ trình học mới từ đầu?")) {
                    useStudyPlanStore.setState({ plan: null });
                    setSelectedNode(null);
                  }
                }}
              >
                Thiết lập lại
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. MOBILE BOTTOM SHEET DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedNode && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            />
            {/* Slide up Drawer Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white dark:bg-[#0c0c0f] border-t border-slate-200 dark:border-neutral-850 p-6 pb-8 lg:hidden max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="space-y-4">
                {/* Drag handle block */}
                <div className="w-12 h-1 bg-slate-350 dark:bg-neutral-800 rounded-full mx-auto mb-2" />

                {renderDetailContent(selectedNode, () => setSelectedNode(null))}

                <Button
                  variant="ghost"
                  className="w-full py-3 text-xs font-bold text-rose-500 cursor-pointer rounded-xl border border-rose-100/50 dark:border-rose-955/20 mt-4 active:scale-[0.98] transition-all"
                  onClick={() => {
                    if (confirm("Bạn có chắc chắn muốn xóa lộ trình và tạo mới?")) {
                      useStudyPlanStore.setState({ plan: null });
                      setSelectedNode(null);
                    }
                  }}
                >
                  Thiết lập lại lộ trình
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
