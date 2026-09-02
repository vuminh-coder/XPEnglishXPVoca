"use client";

import React from "react";
import { Loader2, Swords, Bot, Copy, Check, ArrowLeft, Play } from "lucide-react";
import { Opponent } from "../types";

interface PvPMatchmakingProps {
  gameState: "searching" | "room_created" | "starting_count";
  searchTime: number;
  matchedOpponent: Opponent | null;
  onCancel: () => void;
  roomCode: string | null;
  copiedCode: boolean;
  onCopyRoomCode: () => void;
  isHost: boolean;
  onHostStartGame?: () => void;
  countdown: number;
}

export function PvPMatchmaking({
  gameState,
  searchTime,
  matchedOpponent,
  onCancel,
  roomCode,
  copiedCode,
  onCopyRoomCode,
  isHost,
  onHostStartGame,
  countdown,
}: PvPMatchmakingProps) {
  if (gameState === "starting_count") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-rose-500/20 text-rose-500 border-2 border-rose-500 flex items-center justify-center text-5xl font-display font-black animate-ping">
          {countdown}
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">
            Chuẩn bị sẵn sàng!
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Trận đấu PvP đang bắt đầu...
          </p>
        </div>
      </div>
    );
  }

  if (gameState === "room_created") {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800">
          <Swords className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
            Phòng Đấu Đã Sẵn Sàng
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Gửi mã PIN này cho bạn bè để cùng tham gia phòng đấu.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between">
          <span className="font-mono text-2xl font-black text-[#0059bb] dark:text-sky-400 tracking-widest">
            {roomCode || "----"}
          </span>
          <button
            onClick={onCopyRoomCode}
            className="flex items-center gap-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "Đã sao chép" : "Sao chép"}</span>
          </button>
        </div>

        {isHost && onHostStartGame && (
          <button
            onClick={onHostStartGame}
            className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Bắt Đầu Trận Đấu</span>
          </button>
        )}

        <button
          onClick={onCancel}
          className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hủy & Thoát Phòng</span>
        </button>
      </div>
    );
  }

  // Searching State
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-sm">
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
        <Bot className="w-8 h-8 text-rose-500" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
          Đang Tìm Kiếm Đối Thủ...
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Thời gian chờ: {searchTime}s
        </p>
      </div>

      {matchedOpponent && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          <span>Đã tìm thấy: {matchedOpponent.name} {matchedOpponent.avatarEmoji}</span>
        </div>
      )}

      <button
        onClick={onCancel}
        className="w-full h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
      >
        Hủy Tìm Trận
      </button>
    </div>
  );
}
