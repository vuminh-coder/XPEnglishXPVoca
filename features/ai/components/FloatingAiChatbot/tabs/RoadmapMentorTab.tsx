"use client";
import React, { useEffect, useState } from "react";
import { useStudyPlanStore } from "@/stores/studyPlanStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  Flame,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Headphones,
  FileText,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

interface LocalTask {
  id: string;
  title: string;
  type: "VOCAB" | "LISTENING" | "GRAMMAR" | "READING" | "SPEAKING";
  description: string;
  path: string;
  duration: number;
  xpReward: number;
  isCompleted: boolean;
}

const DEFAULT_TODAY_TASKS: LocalTask[] = [
  {
    id: "task_vocab_1",
    title: "Tích lũy 15 từ vựng mục tiêu",
    type: "VOCAB",
    description: "Học từ mới theo Spaced Repetition",
    path: "/vocabulary",
    duration: 10,
    xpReward: 15,
    isCompleted: true,
  },
  {
    id: "task_video_2",
    title: "Luyện nghe 1 video song ngữ",
    type: "LISTENING",
    description: "Nghe chép chính tả hoặc Shadowing",
    path: "/myvideo",
    duration: 15,
    xpReward: 20,
    isCompleted: false,
  },
  {
    id: "task_grammar_3",
    title: "Củng cố 1 cấu trúc ngữ pháp AI",
    type: "GRAMMAR",
    description: "Học lý thuyết & làm trắc nghiệm",
    path: "/study/grammar",
    duration: 10,
    xpReward: 15,
    isCompleted: false,
  },
];

export default function RoadmapMentorTab() {
  const { plan, loadPlan } = useStudyPlanStore();
  const { addToast } = useNotificationStore();
  const [tasks, setTasks] = useState<LocalTask[]>(DEFAULT_TODAY_TASKS);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    loadPlan();
    // Load local completed states from localStorage if present
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xp_voca_roadmap_daily_tasks");
        if (saved) {
          setTasks(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
  }, [loadPlan]);

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_voca_roadmap_daily_tasks", JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);
  const allCompleted = completedCount === tasks.length;

  const handleClaimReward = () => {
    if (isClaimed) return;
    setIsClaimed(true);
    useUserStore.getState().awardXp(50);
    useUserStore.getState().awardCoins(20);
    addToast({
      title: "🎉 Nhận Thưởng Lộ Trình Thành Công!",
      message: "Bạn đã nhận được +50 XP và +20 Vàng thưởng ngày!",
      type: "success",
    });
  };

  const getTaskIcon = (type: LocalTask["type"]) => {
    switch (type) {
      case "VOCAB":
        return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
      case "LISTENING":
        return <Headphones className="w-3.5 h-3.5 text-indigo-500" />;
      case "GRAMMAR":
        return <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-[#0059bb]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/60 dark:bg-slate-950/60 overflow-y-auto p-3 sm:p-4 space-y-4 no-scrollbar">
      {/* 1. Goal Target Banner Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#0059bb]/10 via-purple-500/10 to-amber-500/10 border border-[#0059bb]/20 dark:border-purple-800/40 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-md shadow-[#0059bb]/20 shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">
                Mục Tiêu Cá Nhân
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display mt-0.5">
                {plan?.targetExam || "TOEIC"} • Mục Tiêu {plan?.targetScore || 750}+
              </h4>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1 font-mono">
            <Flame className="w-3 h-3 text-amber-500 fill-current" />
            <span>Chặng 1 / 3</span>
          </span>
        </div>

        {/* Daily Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-slate-600 dark:text-slate-300">Tiến độ nhiệm vụ hôm nay:</span>
            <span className="font-mono text-[#0059bb] dark:text-sky-400 font-bold">
              {completedCount} / {tasks.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0059bb] to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Today's Daily Quests List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display">
            <Compass className="w-3.5 h-3.5 text-[#0059bb]" /> Nhiệm Vụ Hôm Nay
          </h4>
          <span className="text-[10px] font-bold text-slate-400 font-mono">
            Làm mới sau 12h
          </span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs ${
                task.isCompleted
                  ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 opacity-90"
                  : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggleTask(task.id)}
                  className="mt-0.5 text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer shrink-0"
                  title={task.isCompleted ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/10" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getTaskIcon(task.type)}
                    </span>
                    <h5
                      className={`text-xs font-bold leading-tight truncate ${
                        task.isCompleted
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                    {task.description} • {task.duration} phút
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold">
                  +{task.xpReward} XP
                </span>

                <Link
                  href={task.path}
                  className={`h-7 px-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 ${
                    task.isCompleted
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                      : "bg-[#0059bb] hover:bg-[#004899] text-white shadow-xs shadow-[#0059bb]/20 active:scale-95"
                  }`}
                >
                  <span>{task.isCompleted ? "Xem lại" : "Làm ngay"}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Claim Daily Chest Reward */}
        {allCompleted && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 animate-fade-in shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                  Đã xong 3 nhiệm vụ ngày!
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block truncate">
                  Nhận thưởng rương +50 XP & +20 Vàng
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClaimReward}
              disabled={isClaimed}
              className={`h-8 px-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 ${
                isClaimed
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 cursor-pointer font-display"
              }`}
            >
              {isClaimed ? "Đã nhận thưởng" : "Mở Rương Thưởng"}
            </button>
          </div>
        )}
      </div>

      {/* 3. Target Roadmap Milestones Overview */}
      <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-display px-1">
          <Award className="w-3.5 h-3.5 text-amber-500" /> Các Chặng Bứt Phá Mục Tiêu
        </h4>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#0059bb]/40 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#0059bb] dark:text-sky-400">Chặng 1: Xây Nền Tảng Cốt Lõi</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] border border-blue-200/60">
                Đang học (65%)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              600 Từ vựng TOEIC thường gặp & Nghe hiểu Part 1, 2
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 space-y-1 opacity-70">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">Chặng 2: Bứt Tốc Part 3 & 4 + Ngữ Pháp</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-500">
                Chưa mở
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Chiến thuật giải đề nhanh và phản xạ hội thoại dài
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 space-y-1 opacity-70">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">Chặng 3: Luyện Đề Chuẩn Mock Test</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-500">
                Chưa mở
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Thi thử áp lực thời gian thật và khắc phục bẫy đề thi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
