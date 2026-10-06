"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  MessageSquare,
  CheckCircle2,
  Timer,
  Lightbulb,
  Layers,
  Sparkles,
  History,
  RotateCcw,
  Compass,
  ArrowRight,
  X,
  Volume2,
  Bot,
  User,
  Share2,
} from "lucide-react";
import { Topic, Message, SessionEvaluation, AiPersona } from "../types";
import { TOPIC_ICONS } from "../data/aiTopics";
import { DEFAULT_AI_PERSONA } from "../data/aiPersonas";
import { AiConversationShareModal } from "./AiConversationShareModal";

interface AiConversationScoreCardProps {
  currentTopic: Topic;
  allTopics?: Topic[];
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
  onSelectTopic?: (topic: Topic) => void;
  currentPersona?: AiPersona;
  difficulty?: string;
  userName?: string;
}

export function AiConversationScoreCard({
  currentTopic,
  allTopics,
  sessionEvaluation,
  completedGoalsCount,
  userTurnsCount,
  elapsedTime,
  formatElapsedTime,
  grammarCorrections,
  messages,
  onRestartNewSession,
  onSelectTopic,
  currentPersona = DEFAULT_AI_PERSONA,
  difficulty = "Beginner",
  userName = "Học viên XP",
}: AiConversationScoreCardProps) {
  // Deduplicate grammar corrections & phrasing recommendations
  const uniqueCorrections = React.useMemo(() => {
    const seen = new Set<string>();
    const result: typeof grammarCorrections = [];

    for (const item of grammarCorrections) {
      const orig = (item.original || "").trim().toLowerCase();
      const corr = (item.corrected || "").trim().toLowerCase();
      const phrasing = (item.betterPhrasing || "").trim().toLowerCase();
      const key = `${orig}__${corr}__${phrasing}`;

      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }

    return result;
  }, [grammarCorrections]);

  const [activeLeftTab, setActiveLeftTab] = useState<"feedback" | "history">("feedback");
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Dynamic Rank Icon & Color Accent according to Grade
  const getRankBadgeAndIcon = () => {
    switch (sessionEvaluation.grade) {
      case "S":
        return {
          icon: <Trophy className="w-6 h-6 text-amber-500" strokeWidth={2.2} />,
          boxBg: "bg-amber-500/10 border-amber-500/25",
        };
      case "A":
        return {
          icon: <Trophy className="w-6 h-6 text-emerald-500" strokeWidth={2.2} />,
          boxBg: "bg-emerald-500/10 border-emerald-500/25",
        };
      case "B":
        return {
          icon: <Sparkles className="w-6 h-6 text-[#0059bb] dark:text-sky-400" strokeWidth={2.2} />,
          boxBg: "bg-blue-500/10 border-blue-500/25",
        };
      case "C":
      default:
        return {
          icon: <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={2.2} />,
          boxBg: "bg-amber-500/10 border-amber-500/25",
        };
    }
  };

  const rankVisual = getRankBadgeAndIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 min-h-0 overflow-y-auto space-y-3 pb-24 sm:pb-28"
    >
      {/* 1. Top Hero Score Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-2xs shrink-0 ${rankVisual.boxBg}`}
            >
              {rankVisual.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Đánh Giá Buổi Hội Thoại
                </h2>
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                  Hoàn Tất
                </span>
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center gap-1 font-mono">
                  <Timer className="w-3 h-3 text-slate-500 dark:text-slate-400" strokeWidth={2.2} />
                  <span>{formatElapsedTime(elapsedTime)}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Chủ đề: <strong className="text-slate-900 dark:text-white">{currentTopic.name}</strong>{" "}
                ({currentTopic.nameEn})
              </p>
            </div>
          </div>

          {/* Overall Score Badge & Reward */}
          <div className="flex items-center gap-3 sm:self-center">
            <div
              className={`px-3 py-1 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs ${sessionEvaluation.color}`}
            >
              <span>Hạng {sessionEvaluation.grade}</span>
              <span>•</span>
              <span>{sessionEvaluation.label}</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Điểm Tổng Kết
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0059bb] dark:text-sky-400 font-display tabular-nums">
                {sessionEvaluation.overallScore}/100
              </span>
            </div>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Phần Thưởng
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display tabular-nums">
                +{sessionEvaluation.xpAward} XP
              </span>
            </div>
          </div>
        </div>

        {/* 2. 4 Quick Stat Metric Tiles (4 CEFR Evaluation Axes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Axis 1: Mục tiêu hoàn thành (40%) */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.2} /> Mục tiêu đạt được
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {completedGoalsCount}/{currentTopic.goals.length} ({sessionEvaluation.goalsScore}%)
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
              Trọng số 40% điểm
            </span>
          </div>

          {/* Axis 2: Chuẩn ngữ pháp (30%) */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.2} /> Chuẩn ngữ pháp
            </span>
            <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {sessionEvaluation.grammarScore}%
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
              Trọng số 30% điểm
            </span>
          </div>

          {/* Axis 3: Phản xạ & Lượt câu (20%) */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" strokeWidth={2.2} /> Lượt tương tác
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {userTurnsCount} câu ({sessionEvaluation.interactionScore}%)
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
              Trọng số 20% điểm
            </span>
          </div>

          {/* Axis 4: Vốn từ vựng CEFR (10%) */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.2} /> Vốn từ ngữ cảnh
            </span>
            <p className="text-sm sm:text-base font-bold text-purple-600 dark:text-purple-400 font-mono tabular-nums">
              {sessionEvaluation.vocabScore}%
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
              Trọng số 10% điểm
            </span>
          </div>
        </div>
      </div>

      {/* 3. Bento Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Cột Trái: Tab Góp ý & Diễn đạt VS Toàn văn hội thoại (8/12) */}
        <div className="lg:col-span-8 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
          {/* Header với Tabs chuyển đổi mượt mà */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveLeftTab("feedback")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeLeftTab === "feedback"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.2} />
                <span>Góp Ý & Diễn Đạt</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400">
                  {uniqueCorrections.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLeftTab("history")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeLeftTab === "history"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <History className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.2} />
                <span>Toàn Văn Đối Thoại</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {messages.length}
                </span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {activeLeftTab === "feedback" ? "Phân tích câu nói & gợi ý bản xứ" : "Toàn bộ lịch sử đối thoại"}
            </span>
          </div>

          {/* Nội dung Tab Góp ý */}
          {activeLeftTab === "feedback" && (
            <div className="flex-1">
              {uniqueCorrections.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                  {uniqueCorrections.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm"
                    >
                      {/* Original User utterance */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          <span className="font-mono text-slate-400 font-bold">Mục #{idx + 1}</span>
                          <span className="text-[11px] text-slate-400">Câu của bạn</span>
                        </div>
                        <p className="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-medium italic">
                          "{item.original}"
                        </p>
                      </div>

                      {/* Grammar correction if available */}
                      {item.corrected && (
                        <div className="pt-1 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                            <span>Sửa chuẩn ngữ pháp:</span>
                          </div>
                          <div className="pl-3 space-y-1">
                            <div>
                              <span className="text-rose-600 dark:text-rose-400 line-through mr-1 font-semibold">
                                {item.original}
                              </span>
                              ➔{" "}
                              <strong className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">
                                {item.corrected}
                              </strong>
                            </div>
                            {item.explanation && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.explanation.replace(/^\((.*)\)$/, "$1").trim()}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Better natural phrasing if available */}
                      {item.betterPhrasing && (
                        <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                              ✨ Diễn đạt tự nhiên bản xứ:
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                              "{item.betterPhrasing}"
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => playAudio(item.betterPhrasing!)}
                            className="shrink-0 self-start sm:self-center px-2 py-1 rounded-md bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            title="Nghe cách phát âm tự nhiên"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe mẫu</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto" strokeWidth={2.2} />
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    Diễn Đạt Xuất Sắc!
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Bạn đã phản xạ trôi chảy và không gặp lỗi ngữ pháp nghiêm trọng nào trong suốt cuộc đối thoại.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Nội dung Tab Toàn văn đối thoại */}
          {activeLeftTab === "history" && (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {messages.map((m) => {
                const isAi = m.role === "ai";
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border text-xs sm:text-sm space-y-1 ${
                      isAi
                        ? "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-900/40"
                        : "bg-slate-50 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold flex items-center gap-1.5 ${
                          isAi ? "text-[#0059bb] dark:text-sky-400" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        {isAi ? "AI Tutor" : "Bạn"}
                      </span>
                      <button
                        type="button"
                        onClick={() => playAudio(m.text)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 rounded transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {m.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cột Phải: Lời Khuyên, SM-2, & Nút Hành Động (4/12) */}
        <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            {/* Advice Card - Không bọc nested box kép */}
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={2} />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Lời Khuyên Giao Tiếp
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{currentTopic.advice}"
              </p>
            </div>

            {/* SM-2 Spaced Repetition Auto-Sync Tile - Secondary Button theo Rule 18 */}
            {uniqueCorrections.length > 0 && (
              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-purple-500" strokeWidth={2} /> Thẻ Ôn Tập SM-2
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-mono">
                    {uniqueCorrections.length} câu đã lưu
                  </span>
                </div>
                <p className="text-xs text-purple-900 dark:text-purple-200 leading-relaxed font-medium">
                  Các câu sửa lỗi và mẫu câu tự nhiên đã được tự động đưa vào hàng đợi ôn tập ngắt quãng (SM-2).
                </p>
                <Link
                  href="/review"
                  className="w-full py-1.5 px-2.5 rounded-lg border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-white/80 dark:bg-slate-900/80 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                >
                  <span>Mở Phòng Ôn Tập SM-2</span> ➔
                </Link>
              </div>
            )}
          </div>

          {/* Action Buttons (3-Tier Structure: Rule 18 - Duy nhất 1 Primary button) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {/* Primary Action (Rule 18): Luyện lại cùng chủ đề để cải thiện điểm số */}
            <button
              type="button"
              onClick={onRestartNewSession}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.2]" />
              <span>Luyện Lại Chủ Đề Này</span>
            </button>

            {/* Secondary Action: Chia sẻ thành tích hội thoại */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 hover:border-purple-500 text-purple-900 dark:text-purple-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all active:scale-[0.98] hover:bg-purple-100/60 dark:hover:bg-purple-900/40"
            >
              <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[2.2]" />
              <span>Chia Sẻ Thành Tích</span>
            </button>

            {/* Secondary Action: Chọn kịch bản mới trực tiếp */}
            {allTopics && allTopics.length > 0 && onSelectTopic && (
              <button
                type="button"
                onClick={() => setIsTopicModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#0059bb] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all hover:bg-blue-50/50 dark:hover:bg-blue-950/30"
              >
                <Compass className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <span>Chọn Kịch Bản Khác</span>
              </button>
            )}

            {/* Tertiary / Ghost Action */}
            <Link
              href="/dashboard"
              className="w-full py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors block text-center"
            >
              <span>Về Bảng Điều Khiển</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. In-Place Topic Selector Modal */}
      {isTopicModalOpen && allTopics && onSelectTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  Chọn Kịch Bản Hội Thoại Tiếp Theo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTopicModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                title="Đóng modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 scrollbar-thin">
              {allTopics.map((topic) => {
                const isSelected = topic.id === currentTopic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setIsTopicModalOpen(false);
                      onSelectTopic(topic);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800/80 shadow-2xs"
                        : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:border-[#0059bb]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shrink-0">
                        {TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {topic.name} <span className="text-slate-400 font-normal">({topic.nameEn})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {topic.description}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 shrink-0">
                      {topic.level}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* 5. Share Certified Score Card Modal */}
      <AiConversationShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentTopic={currentTopic}
        sessionEvaluation={sessionEvaluation}
        completedGoalsCount={completedGoalsCount}
        userTurnsCount={userTurnsCount}
        elapsedTime={elapsedTime}
        formatElapsedTime={formatElapsedTime}
        currentPersona={currentPersona}
        difficulty={difficulty}
        userName={userName}
      />
    </motion.div>
  );
}
