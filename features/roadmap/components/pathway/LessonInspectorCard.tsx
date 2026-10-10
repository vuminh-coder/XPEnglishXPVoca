"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  Play,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  Bot,
} from "lucide-react";
import { Badge } from "@/shared/components/ui";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { RoadmapTask } from "../../types";

interface LessonInspectorCardProps {
  selectedTask: RoadmapTask | null;
}

/**
 * LessonInspectorCard
 * Cột đồng hành cố định cân bằng 1:1 (Fixed Viewport Companion - Tổng cao ~430px):
 * 1. Card Chi Tiết Bài Học (cao ~235px)
 * 2. Card Trợ Lý AI Mentor & Thông Số (cao ~185px, lấp đầy hoàn hảo khoảng trống, không cần cuộn lướt)
 */
export const LessonInspectorCard: React.FC<LessonInspectorCardProps> = ({
  selectedTask,
}) => {
  return (
    <aside className="hidden lg:block lg:col-span-4 sticky top-6 self-start space-y-3">
      {/* 1. CARD CHI TIẾT BÀI HỌC (~235px) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
        {/* Header với icon BookOpen chuẩn phong cách bài học của web */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0059bb] stroke-[2.2]" />
            <span>Chi Tiết Bài Học</span>
          </span>
          {selectedTask && (
            <Badge
              variant={selectedTask.isCompleted ? "success" : "warning"}
              className="text-[10px] font-mono font-bold"
            >
              {selectedTask.isCompleted ? "Đã xong" : "Chưa làm"}
            </Badge>
          )}
        </div>

        {selectedTask ? (
          <div className="space-y-2.5">
            {/* Title & Description */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold font-mono text-[#0059bb] dark:text-sky-400">
                Ngày {selectedTask.dayNum}
              </span>
              <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-snug line-clamp-1">
                {selectedTask.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                {selectedTask.description}
              </p>
            </div>

            {/* Compact AI Tip Callout */}
            <div className="p-2 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100/80 dark:border-slate-700/80 space-y-0.5">
              <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500 stroke-[2.2]" />
                <span>Mẹo ăn điểm:</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                {selectedTask.tips[0] || "Chú ý nghe kỹ từ khóa và loại bỏ các đáp án gây nhiễu."}
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="pt-0.5">
              <Link href={selectedTask.practicePath} className="w-full block">
                <button
                  type="button"
                  className="w-full h-9 bg-[#0059bb] hover:bg-[#004899] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 font-display cursor-pointer active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Bắt Đầu Luyện Tập (+{selectedTask.xpReward} XP)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 px-3 space-y-2 text-slate-500 dark:text-slate-400">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto mb-1 border border-blue-200/60 dark:border-blue-800/40">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
              Chọn Bài Học Để Bắt Đầu
            </h4>
            <p className="text-[11px] font-medium leading-relaxed max-w-xs mx-auto">
              Nhấp vào bài học bất kỳ ở danh sách lộ trình bên trái để xem mẹo làm bài và bắt đầu luyện tập.
            </p>
          </div>
        )}
      </div>

      {/* 2. CARD TRỢ LÝ AI MENTOR ĐỒNG HÀNH (Lấp đầy khoảng trống, tính toán chiều cao ~185px, không cần cuộn) */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
        {/* Header với icon Bot đồng bộ AI Tutor của web */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5.5 h-5.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200/60 dark:border-purple-800/40">
              <Bot className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
              Trợ Lý AI Mentor
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
            Tư vấn 24/7
          </span>
        </div>

        {/* 3 Quick Metric Chips với icon sắc nét */}
        {selectedTask && (
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                <Clock className="w-2.5 h-2.5 stroke-[2.2]" />
                <span>Thời lượng</span>
              </div>
              <div className="text-[11px] font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                {selectedTask.durationMinutes || 15}p
              </div>
            </div>

            <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                <Target className="w-2.5 h-2.5 stroke-[2.2]" />
                <span>Độ khó</span>
              </div>
              <div className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                {selectedTask.difficulty || "Vừa sức"}
              </div>
            </div>

            <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 stroke-[2.2]" />
                <span>Kỹ năng</span>
              </div>
              <div className="text-[11px] font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                {selectedTask.taskType || "General"}
              </div>
            </div>
          </div>
        )}

        {/* AI Insight Box */}
        <div className="p-2 rounded-xl bg-purple-50/50 dark:bg-slate-800/50 border border-purple-100/80 dark:border-slate-700/80">
          <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
            {selectedTask
              ? `Gemini AI sẵn sàng giải thích bẫy đề thi và phân tích mẹo làm bài cho "${selectedTask.title}".`
              : "Chọn một bài học để nhận phân tích bẫy đề thi từ Gemini AI."}
          </p>
        </div>

        {/* Action Button: Ask AI Mentor */}
        <button
          type="button"
          onClick={() => {
            if (selectedTask) {
              useAiChatbotStore
                .getState()
                .openWithQuestion(
                  `Phân tích bẫy đề thi và hướng dẫn mẹo làm bài chi tiết cho: ${selectedTask.title}`
                );
            } else {
              useAiChatbotStore.getState().openRoadmapDirectly();
            }
          }}
          className="w-full h-8 bg-gradient-to-r from-purple-600 to-[#0059bb] hover:from-purple-700 hover:to-[#004899] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 font-display cursor-pointer active:scale-95 transition-all"
        >
          <Bot className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Hỏi Gemini AI Về Bài Này</span>
          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
