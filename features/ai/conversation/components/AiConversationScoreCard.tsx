"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Target,
  MessageSquare,
  CheckCircle,
  CheckCircle2,
  Clock,
  Lightbulb,
  Sparkles,
  History,
  RotateCcw,
} from "lucide-react";
import { Topic, Message, SessionEvaluation } from "../types";

interface AiConversationScoreCardProps {
  currentTopic: Topic;
  sessionEvaluation: SessionEvaluation;
  completedGoalsCount: number;
  userTurnsCount: number;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  grammarCorrections: Array<{
    original: string;
    corrected: string;
    explanation?: string;
    betterPhrasing?: string;
  }>;
  messages: Message[];
  onRestartNewSession: () => void;
}

export function AiConversationScoreCard({
  currentTopic,
  sessionEvaluation,
  completedGoalsCount,
  userTurnsCount,
  elapsedTime,
  formatElapsedTime,
  grammarCorrections,
  messages,
  onRestartNewSession,
}: AiConversationScoreCardProps) {
  const [showChatHistory, setShowChatHistory] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 min-h-0 overflow-y-auto space-y-3"
    >
      {/* Top Overall Score Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-2xs shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Đánh Giá Buổi Luyện Viết
                </h2>
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                  Hoàn Tất
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Chủ đề: <strong className="text-slate-900 dark:text-white">{currentTopic.name}</strong> ({currentTopic.nameEn})
              </p>
            </div>
          </div>

          {/* Overall Score Badge */}
          <div className="flex items-center gap-3 sm:self-center">
            <div
              className={`px-3 py-1 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs ${sessionEvaluation.color}`}
            >
              <span>Hạng {sessionEvaluation.grade}</span>
              <span>•</span>
              <span>{sessionEvaluation.label}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Điểm Tổng Kết
              </span>
              <span className="text-lg sm:text-xl font-black text-[#0059bb] dark:text-sky-400 font-display tabular-nums">
                {sessionEvaluation.overallScore}/100
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Phần Thưởng
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-display tabular-nums">
                +{sessionEvaluation.xpAward} XP
              </span>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-500" /> Mục tiêu hoàn thành
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {completedGoalsCount}/{currentTopic.goals.length} ({sessionEvaluation.goalsScore}%)
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0059bb]" /> Lượt tương tác
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {userTurnsCount} câu
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Chuẩn ngữ pháp
            </span>
            <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {sessionEvaluation.grammarScore}%
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Thời gian luyện
            </span>
            <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
              {formatElapsedTime(elapsedTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Bento Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Cột Trái: Lỗi Ngữ Pháp & Gợi Ý Phrasing Tự Nhiên (8/12) */}
        <div className="lg:col-span-8 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> TỔNG HỢP NGỮ PHÁP & DIỄN ĐẠT TỰ NHIÊN
            </h3>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">
              {grammarCorrections.length} ghi chú
            </span>
          </div>

          {grammarCorrections.length > 0 ? (
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {grammarCorrections.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-400 shrink-0 font-mono text-xs">
                      #{idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      {item.corrected && (
                        <div>
                          <span className="text-rose-600 dark:text-rose-400 line-through mr-1 font-semibold">
                            {item.original}
                          </span>
                          ➔{" "}
                          <strong className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">
                            {item.corrected}
                          </strong>
                          {item.explanation && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {item.explanation.replace(/^\((.*)\)$/, "$1").trim()}
                            </p>
                          )}
                        </div>
                      )}
                      {item.betterPhrasing && (
                        <div className="text-emerald-800 dark:text-emerald-200 font-medium pt-1">
                          <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-1.5">
                            ✨ Diễn đạt tự nhiên:
                          </span>
                          "{item.betterPhrasing}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center space-y-1.5">
              <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                Diễn đạt rất tốt!
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bạn không gặp lỗi ngữ pháp nghiêm trọng nào trong suốt buổi đối thoại hôm nay.
              </p>
            </div>
          )}

          {/* Toggle View Full Chat History */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowChatHistory(!showChatHistory)}
              className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>{showChatHistory ? "Ẩn đoạn hội thoại chi tiết" : "Xem lại toàn bộ đoạn hội thoại"}</span>
            </button>

            {showChatHistory && (
              <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 max-h-[200px] overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className="text-xs space-y-0.5">
                    <span
                      className={`font-bold ${
                        m.role === "ai" ? "text-[#0059bb] dark:text-sky-400" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {m.role === "ai" ? "AI Tutor:" : "Bạn:"}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cột Phải: Lời Khuyên & Nút Hành Động (4/12) */}
        <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
          {/* Advice Card */}
          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0059bb]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Lời Khuyên Giao Tiếp
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-900/30">
              "{currentTopic.advice}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={onRestartNewSession}
              className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Bắt Đầu Buổi Mới (+15 XP/câu)
            </button>

            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors block text-center"
            >
              Về Bảng Điều Khiển
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
