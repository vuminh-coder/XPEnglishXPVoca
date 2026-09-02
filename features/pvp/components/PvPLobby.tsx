"use client";

import React from "react";
import { Swords, Users, Bot, Zap, Headphones, PenTool, Brain, ArrowRight, Trophy, Flame } from "lucide-react";
import { PvPGameMode, PvPDifficulty, PvPMatchType } from "../types";

interface PvPLobbyProps {
  matchType: PvPMatchType;
  setMatchType: (type: PvPMatchType) => void;
  gameMode: PvPGameMode;
  setGameMode: (mode: PvPGameMode) => void;
  difficulty: PvPDifficulty;
  setDifficulty: (diff: PvPDifficulty) => void;
  onStartMatch: () => void;
  roomCodeInput: string;
  setRoomCodeInput: (code: string) => void;
  onJoinRoom: () => void;
  onCreateRoom: () => void;
  isRoomLoading: boolean;
  roomError: string | null;
}

export function PvPLobby({
  matchType,
  setMatchType,
  gameMode,
  setGameMode,
  difficulty,
  setDifficulty,
  onStartMatch,
  roomCodeInput,
  setRoomCodeInput,
  onJoinRoom,
  onCreateRoom,
  isRoomLoading,
  roomError,
}: PvPLobbyProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner Intro */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-blue-500/10 border border-rose-500/20 dark:border-rose-900/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide">
            <Swords className="w-3.5 h-3.5" />
            <span>Đấu Trường Đối Kháng 1v1 Realtime</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white">
            Thách Đấu Từ Vựng & <span className="text-rose-600 dark:text-rose-400">Bứt Phá XP</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-xl">
            So tài phản xạ từ vựng tiếng Anh theo thời gian thực cùng bạn bè hoặc AI thông minh.
            Giành chiến thắng để nhận cúp vinh danh và tích lũy XP thăng cấp.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="text-xs font-bold text-slate-400 block uppercase">Thắng</span>
            <span className="text-xl font-display font-black text-emerald-500">+20-50 XP</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="text-xs font-bold text-slate-400 block uppercase">Hòa</span>
            <span className="text-xl font-display font-black text-amber-500">+10 XP</span>
          </div>
        </div>
      </div>

      {/* Match Type Tabs: Quick Match vs Private Room */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 gap-1.5">
        <button
          onClick={() => setMatchType("quick")}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            matchType === "quick"
              ? "bg-[#0059bb] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Ghép Đấu Nhanh (Quick Match)</span>
        </button>
        <button
          onClick={() => setMatchType("room")}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            matchType === "room"
              ? "bg-[#0059bb] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Phòng Riêng 1v1 (Room PIN)</span>
        </button>
      </div>

      {/* Game Mode Selection */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          1. Chọn chế độ thi đấu
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setGameMode("quiz")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              gameMode === "quiz"
                ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-500 shadow-xs ring-1 ring-[#0059bb]"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mb-2.5">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Trắc Nghiệm Nghĩa</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chọn định nghĩa tiếng Việt đúng nhất cho từ vựng.</p>
          </div>

          <div
            onClick={() => setGameMode("spelling")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              gameMode === "spelling"
                ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 shadow-xs ring-1 ring-amber-500"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <PenTool className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Ghép Chữ Chính Tả</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sắp xếp các chữ cái xáo trộn thành từ hoàn chỉnh.</p>
          </div>

          <div
            onClick={() => setGameMode("listening")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              gameMode === "listening"
                ? "bg-purple-50/80 dark:bg-purple-950/40 border-purple-500 dark:border-purple-500 shadow-xs ring-1 ring-purple-500"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Nghe Âm Bắt Từ</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nghe phát âm chuẩn IPA và đoán từ vựng chính xác.</p>
          </div>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          2. Chọn cấp độ độ khó
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(["easy", "medium", "hard"] as PvPDifficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm capitalize transition-all cursor-pointer ${
                difficulty === diff
                  ? diff === "easy"
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                    : diff === "hard"
                    ? "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500"
                    : "bg-blue-50 dark:bg-blue-950/50 border-[#0059bb] text-[#0059bb] dark:text-sky-300 ring-1 ring-[#0059bb]"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              {diff === "easy" ? "Dễ (15s/câu - 5 câu)" : diff === "hard" ? "Khó (7s/câu - 15 câu)" : "Chuẩn (10s/câu - 10 câu)"}
            </button>
          ))}
        </div>
      </div>

      {/* Action CTA or Room Input */}
      {matchType === "quick" ? (
        <div className="pt-4">
          <button
            onClick={onStartMatch}
            className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
          >
            <Swords className="w-5 h-5" />
            <span>Tìm Trận Đấu Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span>Tạo phòng đấu hoặc tham gia bằng mã PIN</span>
          </h4>

          {roomError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400">
              {roomError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onCreateRoom}
              disabled={isRoomLoading}
              className="h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isRoomLoading ? "Đang tạo..." : "Tạo Phòng Mới (Sinh mã PIN)"}</span>
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã PIN 5 số..."
                maxLength={6}
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm font-mono font-bold text-center uppercase tracking-widest focus:outline-none focus:border-[#0059bb]"
              />
              <button
                onClick={onJoinRoom}
                disabled={!roomCodeInput.trim() || isRoomLoading}
                className="h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                Vào Phòng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
