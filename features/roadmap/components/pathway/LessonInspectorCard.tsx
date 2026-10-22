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
 * Cột đồng hành cố định (Fixed Viewport Companion):
 * Thống nhất toàn bộ chi tiết bài học, thông số thời lượng/độ khó/kỹ năng, mẹo làm bài
 * và CTA vào một card "Chi Tiết Bài Học" duy nhất, loại bỏ card AI Mentor trùng lặp rời rạc.
 */
export const LessonInspectorCard: React.FC<LessonInspectorCardProps> = ({
  selectedTask,
}) => {
  return (
    <aside className="hidden lg:block lg:col-span-4 sticky top-6 self-start">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
        {/* Header với icon BookOpen chuẩn phong cách bài học của web */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0059bb] stroke-[2.2]" />
            <span>Chi Tiết Bài Học</span>
          </span>
          {selectedTask && (
            <Badge
              variant={selectedTask.isCompleted ? "success" : "warning"}
              className="text-[10px] font-mono font-bold"
            >
              {selectedTask.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
            </Badge>
          )}
        </div>

        {selectedTask ? (
          <div className="space-y-3">
            {/* Title & Description */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold font-mono text-[#0059bb] dark:text-sky-400">
                Ngày {selectedTask.dayNum}
              </span>
              <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-snug">
                {selectedTask.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {selectedTask.description}
              </p>
            </div>

            {/* 3 Quick Metric Chips: Thời lượng, Độ khó, Kỹ năng */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                  <Clock className="w-3 h-3 stroke-[2.2]" />
                  <span>Thời lượng</span>
                </div>
                <div className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedTask.durationMinutes || 15} phút
                </div>
              </div>

              <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                  <Target className="w-3 h-3 stroke-[2.2]" />
                  <span>Độ khó</span>
                </div>
                <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {selectedTask.difficulty || "Vừa sức"}
                </div>
              </div>

              <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                  <Sparkles className="w-3 h-3 stroke-[2.2]" />
                  <span>Kỹ năng</span>
                </div>
                <div className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                  {selectedTask.taskType || "General"}
                </div>
              </div>
            </div>

            {/* AI Tip Callout */}
            <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100/80 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500 stroke-[2.2]" />
                <span>Mẹo ăn điểm:</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {selectedTask.tips[0] || "Chú ý nghe kỹ từ khóa và loại bỏ các đáp án gây nhiễu."}
              </p>
            </div>

            {/* AI Mentor Quick Consultation Helper */}
            <button
              type="button"
              onClick={() => {
                useAiChatbotStore
                  .getState()
                  .openWithQuestion(
                    `Phân tích bẫy đề thi và hướng dẫn mẹo làm bài chi tiết cho: ${selectedTask.title}`
                  );
              }}
              className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 hover:bg-purple-100/80 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-display active:scale-95"
            >
              <Bot className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 stroke-[2.2]" />
              <span>Hỏi Gemini AI về bẫy đề bài này</span>
            </button>

            {/* Action CTA Button */}
            <div className="pt-1">
              <Link href={selectedTask.practicePath} className="w-full block">
                <button
                  type="button"
                  className="w-full h-9 bg-[#0059bb] hover:bg-[#004899] text-white font-bold text-xs rounded-xl shadow-xs shadow-[#0059bb]/20 flex items-center justify-center gap-2 font-display cursor-pointer active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Bắt Đầu Luyện Tập</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 px-3 space-y-2 text-slate-500 dark:text-slate-400">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto mb-1 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
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
    </aside>
  );
};
