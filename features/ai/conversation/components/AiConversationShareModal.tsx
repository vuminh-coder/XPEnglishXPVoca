"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Share2,
  Copy,
  Check,
  Trophy,
  Sparkles,
  Target,
  CheckCircle2,
  MessageSquare,
  Award,
  Link2,
} from "lucide-react";
import { Topic, SessionEvaluation, AiPersona } from "../types";
import { DEFAULT_AI_PERSONA } from "../data/aiPersonas";

interface AiConversationShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: Topic;
  sessionEvaluation: SessionEvaluation;
  completedGoalsCount: number;
  userTurnsCount: number;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  currentPersona?: AiPersona;
  difficulty?: string;
  userName?: string;
}

export function AiConversationShareModal({
  isOpen,
  onClose,
  currentTopic,
  sessionEvaluation,
  completedGoalsCount,
  userTurnsCount,
  elapsedTime,
  formatElapsedTime,
  currentPersona = DEFAULT_AI_PERSONA,
  difficulty = "Beginner",
  userName = "Học viên XP",
}: AiConversationShareModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const shareText = `🎉 Mình vừa hoàn thành buổi Hội Thoại Tiếng Anh AI tại XP English!
🏆 Xếp Hạng [ ${sessionEvaluation.grade} ] • Điểm Tổng Kết: ${sessionEvaluation.overallScore}/100 (+${sessionEvaluation.xpAward} XP)
💬 Chủ đề: ${currentTopic.name} (${currentTopic.nameEn})
🧢 Bạn học AI: ${currentPersona.name} (${currentPersona.roleTitle}) • Trình độ: ${difficulty}
🎯 Mục tiêu đạt được: ${completedGoalsCount}/${currentTopic.goals.length} | ✍️ Chuẩn ngữ pháp: ${sessionEvaluation.grammarScore}% | ⚡ Phản xạ: ${userTurnsCount} câu
👉 Tham gia luyện phản xạ tiếng Anh 1-1 miễn phí tại: https://xpenglishvoca.netlify.app/ai/conversation`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      /* fallback */
    }
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = typeof window !== "undefined" ? window.location.href : "https://xpenglishvoca.netlify.app/ai/conversation";
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      /* fallback */
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Thẻ Chứng Nhận Thành Tích Hội Thoại
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Chia sẻ thành quả luyện tập với bạn bè & cộng đồng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer transition-colors"
            title="Đóng modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Certificate Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Certificate Card Artwork */}
          <div
            id="shareable-certificate-card"
            className="p-5 rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-xl relative overflow-hidden space-y-4 border border-blue-400/30"
          >
            {/* Watermark brand element */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm tracking-tight text-white">
                  XP English | XP Voca
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>AI Certified</span>
              </span>
            </div>

            {/* Student & Topic info */}
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-200/80 tracking-wider block">
                Chứng nhận hoàn tất hội thoại
              </span>
              <h4 className="text-lg font-black font-display text-white mt-0.5">
                {userName}
              </h4>
              <p className="text-xs text-blue-100/90 font-medium mt-1">
                Chủ đề: <strong className="text-white">{currentTopic.name}</strong> ({currentTopic.nameEn})
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px] text-blue-200">
                <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 font-mono font-bold">
                  {difficulty}
                </span>
                <span>•</span>
                <span>Bạn học: {currentPersona.name} ({currentPersona.roleTitle})</span>
                <span>•</span>
                <span>{formatElapsedTime(elapsedTime)}</span>
              </div>
            </div>

            {/* Big Score & Grade Display */}
            <div className="p-3 rounded-xl bg-white/10 dark:bg-black/20 border border-white/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-200 block">Xếp hạng</span>
                  <div className="text-xl font-black font-display text-white flex items-center gap-1.5">
                    <span>Hạng {sessionEvaluation.grade}</span>
                    <span className="text-xs font-normal text-amber-300">({sessionEvaluation.label})</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-blue-200 block">Điểm số</span>
                <span className="text-2xl font-black font-display text-white tabular-nums">
                  {sessionEvaluation.overallScore}
                  <span className="text-sm font-normal text-blue-200">/100</span>
                </span>
                <span className="block text-[11px] font-bold text-emerald-300">
                  +{sessionEvaluation.xpAward} XP
                </span>
              </div>
            </div>

            {/* 4 Metrics Strip */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-white">
              <div className="p-2 rounded-lg bg-white/10 border border-white/15">
                <span className="text-[9px] uppercase font-bold text-blue-200 block truncate">Mục tiêu</span>
                <span className="text-xs font-black font-mono">{completedGoalsCount}/{currentTopic.goals.length}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/15">
                <span className="text-[9px] uppercase font-bold text-blue-200 block truncate">Ngữ pháp</span>
                <span className="text-xs font-black font-mono">{sessionEvaluation.grammarScore}%</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/15">
                <span className="text-[9px] uppercase font-bold text-blue-200 block truncate">Tương tác</span>
                <span className="text-xs font-black font-mono">{userTurnsCount} câu</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/15">
                <span className="text-[9px] uppercase font-bold text-blue-200 block truncate">Từ vựng</span>
                <span className="text-xs font-black font-mono">{sessionEvaluation.vocabScore}%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleCopyText}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Đã Sao Chép Lời Khoe Điểm! ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao Chép Bài Đăng Khoe Thành Tích</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Đã Sao Chép Liên Kết!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sao Chép Liên Kết Luyện Tập</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
