"use client";
import React, { useEffect, useState } from "react";
import { useStudyPlanStore, DailyTask } from "@/lib/store/studyPlanStore";
import { Button, Card, Badge } from "@/components/ui";
import {
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Trophy,
  Calendar,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function StudyPlanPage() {
  const { plan, isLoading, loadPlan, generatePlan, toggleTask } = useStudyPlanStore();
  const [targetExam, setTargetExam] = useState<"TOEIC" | "IELTS">("TOEIC");
  const [targetScore, setTargetScore] = useState<string>("750");
  const [targetDate, setTargetDate] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState<string>("Intermediate");
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  
  // Active selected task for detail drawer
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);

  useEffect(() => {
    loadPlan();
    // Default target date to 30 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    setTargetDate(defaultDate.toISOString().split("T")[0]);
  }, [loadPlan]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetScore || !targetDate) return;
    
    const success = await generatePlan({
      targetExam,
      targetScore: parseInt(targetScore),
      targetDate,
      currentLevel,
      weeklyHours,
    });
    if (success) {
      setSelectedTask(null);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "listening":
        return <Headphones className="h-5 w-5" />;
      case "reading":
        return <BookOpen className="h-5 w-5" />;
      case "speaking":
        return <Mic className="h-5 w-5" />;
      case "writing":
        return <PenTool className="h-5 w-5" />;
      default:
        return <Compass className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
        <p className="text-sm font-semibold text-muted">Đang tải lộ trình học AI của bạn...</p>
      </div>
    );
  }

  // 1. FORM SETUP STATE (No plan active)
  if (!plan) {
    return (
      <div className="mx-auto max-w-3xl animate-fade-in space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/50 bg-sky-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:border-sky-900/30 dark:bg-sky-950/20">
            <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
            Trợ lý Lộ trình AI 2026
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Thiết kế Lộ trình học tiếng Anh cá nhân hóa
          </h1>
          <p className="text-base text-muted max-w-xl mx-auto">
            Nhận giáo án 30 ngày tự động thích ứng với mục tiêu điểm số IELTS hoặc TOEIC của bạn chỉ trong vài giây.
          </p>
        </div>

        <div className="bezel">
          <form onSubmit={handleGenerate} className="bezel-inner bg-white dark:bg-neutral-900 p-6 md:p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Kỳ thi mục tiêu</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetExam("TOEIC");
                      setTargetScore("750");
                    }}
                    className={`bezel text-center ${targetExam === "TOEIC" ? "ring-2 ring-sky-400" : ""}`}
                  >
                    <div className="bezel-inner py-3 font-bold text-sm">TOEIC</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetExam("IELTS");
                      setTargetScore("6.5");
                    }}
                    className={`bezel text-center ${targetExam === "IELTS" ? "ring-2 ring-sky-400" : ""}`}
                  >
                    <div className="bezel-inner py-3 font-bold text-sm">IELTS</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Điểm số mục tiêu</label>
                {targetExam === "TOEIC" ? (
                  <select
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-neutral-950 dark:text-slate-200"
                  >
                    <option value="550">TOEIC 550+ (Cơ bản)</option>
                    <option value="750">TOEIC 750+ (Khá)</option>
                    <option value="850">TOEIC 850+ (Giỏi)</option>
                    <option value="950">TOEIC 950+ (Xuất sắc)</option>
                  </select>
                ) : (
                  <select
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-neutral-950 dark:text-slate-200"
                  >
                    <option value="5">IELTS 5.0 (Cơ bản)</option>
                    <option value="6">IELTS 6.0 (Trung cấp)</option>
                    <option value="7">IELTS 7.0 (Nâng cao)</option>
                    <option value="8">IELTS 8.0 (Thành thạo)</option>
                  </select>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Ngày thi dự kiến</label>
                <div className="relative">
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-neutral-950 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Cam kết học tập</label>
                <select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-neutral-950 dark:text-slate-200"
                >
                  <option value="5">5 giờ / tuần (Thư thái)</option>
                  <option value="10">10 giờ / tuần (Khuyên dùng)</option>
                  <option value="15">15 giờ / tuần (Chăm chỉ)</option>
                  <option value="20">20 giờ / tuần (Cấp tốc)</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2">
                Tạo Lộ trình học AI
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. ACTIVE CURRICULUM TIMELINE TIMELINE TIMELINE (Duolingo style mapping)
  const completedTasks = plan.dailyTasks.filter((t) => t.isCompleted).length;
  const progressPercent = Math.round((completedTasks / plan.dailyTasks.length) * 100);

  return (
    <div className="mx-auto max-w-6xl animate-fade-in space-y-8">
      {/* Header Info Panel */}
      <div className="bezel">
        <div className="bezel-inner bg-gradient-to-r from-sky-500 to-indigo-600 p-6 text-white md:p-8 rounded-[30px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Trophy className="h-3.5 w-3.5 text-yellow-300" />
                Mục tiêu: {plan.targetExam} · {plan.targetScore}
              </span>
              <h1 className="text-3xl font-black tracking-tight">Lộ trình học tập của bạn</h1>
              <p className="text-sm text-white/80 max-w-md">
                Lịch trình 30 ngày được tinh chỉnh riêng. Hoàn thành nhiệm vụ mỗi ngày để thăng cấp và tích lũy XP!
              </p>
            </div>

            <div className="min-w-[200px] space-y-2">
              <div className="flex justify-between text-xs font-extrabold uppercase tracking-wider text-white/90">
                <span>Tiến độ 30 ngày</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-yellow-300 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="text-xs text-white/70 text-right">
                Đã hoàn thành {completedTasks}/{plan.dailyTasks.length} nhiệm vụ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side is Duolingo Checkpoints Path, Right Side is Detail Panel */}
      <div className="grid gap-8 lg:grid-cols-5 items-start">
        {/* Timeline Path column (3-cols width on desktop) */}
        <div className="lg:col-span-3 flex flex-col items-center py-6 bg-slate-50 dark:bg-neutral-950/40 rounded-[30px] border border-slate-100 dark:border-neutral-900 p-6 relative overflow-hidden">
          <div className="absolute top-0 bottom-0 w-1.5 bg-slate-200 dark:bg-neutral-800 left-1/2 -translate-x-1/2 z-0" />
          
          <div className="space-y-12 w-full max-w-md relative z-10">
            {plan.dailyTasks.map((task, idx) => {
              // Calculate side shifts (Left, Center, Right) like Duolingo path
              const positionMod = idx % 4;
              let translationClass = "translate-x-0";
              if (positionMod === 1) translationClass = "translate-x-12";
              else if (positionMod === 3) translationClass = "-translate-x-12";

              const isActive = !task.isCompleted && (idx === 0 || plan.dailyTasks[idx - 1]?.isCompleted);
              const isLocked = !task.isCompleted && !isActive && idx > 0 && !plan.dailyTasks[idx - 1]?.isCompleted;
              const isSelected = selectedTask?.id === task.id;

              let nodeBg = "bg-white border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 text-slate-400";
              if (task.isCompleted) {
                nodeBg = "bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20";
              } else if (isActive) {
                nodeBg = "bg-gradient-to-br from-sky-400 to-indigo-500 border-sky-500 text-white shadow-lg shadow-sky-500/20 ring-4 ring-sky-300 dark:ring-sky-950/50 animate-pulse";
              }

              return (
                <div key={task.id} className={`flex flex-col items-center transition-all ${translationClass}`}>
                  <button
                    onClick={() => setSelectedTask(task)}
                    className={`h-16 w-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-transform hover:scale-105 active:scale-95 ${nodeBg} ${isSelected ? "ring-4 ring-indigo-400" : ""}`}
                  >
                    {isLocked ? (
                      <Lock className="h-5.5 w-5.5 opacity-60" />
                    ) : task.isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      getTaskIcon(task.taskType)
                    )}
                  </button>
                  <span className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    Ngày {idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel column (2-cols width on desktop) */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
          {selectedTask ? (
            <div className="bezel">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Chi tiết nhiệm vụ</span>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Ngày học tập</h2>
                  </div>
                  <Badge variant={selectedTask.isCompleted ? "success" : "primary"}>
                    {selectedTask.isCompleted ? "Đã xong" : "Chưa xong"}
                  </Badge>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 dark:bg-neutral-950/50 p-4 rounded-2xl">
                  <div className="rounded-xl bg-sky-100 dark:bg-sky-950/40 p-2.5 text-sky-600 dark:text-sky-400">
                    {getTaskIcon(selectedTask.taskType)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">{selectedTask.taskType}</h3>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {selectedTask.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500 animate-bounce" />
                    <span className="font-bold text-indigo-950 dark:text-indigo-400">Phần thưởng XP</span>
                  </div>
                  <span className="font-black text-lg text-indigo-600">+{selectedTask.xpReward} XP</span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    variant={selectedTask.isCompleted ? "bezel" : "primary"}
                    className="w-full py-3.5 text-sm font-bold"
                    onClick={() => toggleTask(selectedTask.id, !selectedTask.isCompleted)}
                  >
                    {selectedTask.isCompleted ? "Đánh dấu chưa hoàn thành" : "Hoàn thành nhiệm vụ"}
                  </Button>
                  
                  {!selectedTask.isCompleted && (
                    <Link href="/study/practice" className="w-full">
                      <Button variant="bezel" className="w-full py-3.5 text-sm font-bold flex items-center justify-center gap-1.5">
                        <Compass className="h-4 w-4" />
                        Đi đến khu luyện tập
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bezel">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-8 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                  <Compass className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Khám phá hành trình</h3>
                <p className="text-sm text-muted max-w-xs mx-auto">
                  Bấm vào bất kỳ vòng tròn ngày học nào trên sơ đồ bản đồ để mở chi tiết bài học và đánh dấu hoàn thành nhiệm vụ!
                </p>
              </div>
            </div>
          )}

          {/* Reset Study Plan Action Card */}
          <div className="bezel">
            <div className="bezel-inner bg-slate-50 dark:bg-neutral-900/40 p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Thay đổi mục tiêu?</h4>
                <p className="text-xs text-muted mt-0.5">Tạo lại lộ trình học mới bất kỳ lúc nào.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                onClick={() => {
                  if (confirm("Bạn có chắc chắn muốn xóa lộ trình hiện tại và tạo lộ trình học mới?")) {
                    useStudyPlanStore.setState({ plan: null });
                  }
                }}
              >
                Tạo lại lộ trình
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
