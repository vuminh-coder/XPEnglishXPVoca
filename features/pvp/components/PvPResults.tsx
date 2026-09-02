"use client";

import React from "react";
import { Trophy, Swords, Sparkles, RotateCcw, ArrowRight, Award } from "lucide-react";
import { Opponent } from "../types";

interface PvPResultsProps {
  userScore: number;
  oppScore: number;
  opponent: Opponent | null;
  xpAwarded: number;
  coinsAwarded: number;
  levelUp: boolean;
  onRematch: () => void;
  onReturnLobby: () => void;
}

export function PvPResults({
  userScore,
  oppScore,
  opponent,
  xpAwarded,
  coinsAwarded,
  levelUp,
  onRematch,
  onReturnLobby,
}: PvPResultsProps) {
  const isWin = userScore > oppScore;
  const isDraw = userScore === oppScore;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-md">
      {/* Icon Trophy / Result */}
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-md ${
          isWin
            ? "bg-amber-100 text-amber-500 border-4 border-amber-300 dark:bg-amber-950/60"
            : isDraw
            ? "bg-blue-100 text-blue-500 border-4 border-blue-300 dark:bg-blue-950/60"
            : "bg-slate-100 text-slate-500 border-4 border-slate-300 dark:bg-slate-800"
        }`}
      >
        {isWin ? <Trophy className="w-10 h-10 animate-bounce" /> : <Swords className="w-10 h-10" />}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
          {isWin ? "CHIẾN THẮNG!" : isDraw ? "HÒA TRẬN!" : "THẤT BẠI!"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          {isWin
            ? `Xuất sắc! Bạn đã đánh bại ${opponent?.name || "đối thủ"}.`
            : isDraw
            ? "Một trận đấu kịch tính và cân tài cân sức!"
            : `Đừng nản lòng! Hãy tiếp tục rèn luyện vốn từ.`}
        </p>
      </div>

      {/* Score Summary Box */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-around">
        <div className="text-center">
          <span className="block text-xs font-bold text-slate-400 uppercase">Bạn</span>
          <span className="text-2xl font-display font-black text-[#0059bb] dark:text-sky-400 font-mono">
            {userScore}
          </span>
        </div>
        <span className="text-sm font-black text-slate-400">-</span>
        <div className="text-center">
          <span className="block text-xs font-bold text-slate-400 uppercase">{opponent?.name || "Đối thủ"}</span>
          <span className="text-2xl font-display font-black text-rose-500 font-mono">
            {oppScore}
          </span>
        </div>
      </div>

      {/* Reward Badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
            XP Thưởng
          </span>
          <span className="text-lg font-display font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +{xpAwarded} XP
          </span>
        </div>
        <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase">
            Vàng Thưởng
          </span>
          <span className="text-lg font-display font-black text-amber-600 dark:text-amber-400 font-mono">
            +{coinsAwarded} Vàng
          </span>
        </div>
      </div>

      {levelUp && (
        <div className="p-3 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300">
          <Award className="w-4 h-4" />
          <span>CHÚC MỪNG! BẠN ĐÃ THĂNG CẤP ĐỘ MỚI! 🎉</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onRematch}
          className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Đấu Lại Trận Mới</span>
        </button>
        <button
          onClick={onReturnLobby}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
        >
          Trở Về Sảnh Chờ
        </button>
      </div>
    </div>
  );
}
