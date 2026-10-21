"use client";
import React from "react";
import {
  Video,
  Clock,
  Layers,
  Star,
  Sparkles,
  Keyboard,
  Upload,
} from "lucide-react";

export interface VideoHeroMetricsBannerProps {
  savedVideosCount: number;
  totalMinutes: number;
  totalSubtitlesCount: number;
  favoriteCount: number;
  avgProgress: number;
  onOpenShortcuts: () => void;
  onOpenSrtImport: () => void;
  onOpenXpSubModal?: () => void;
  onOpenExportModal?: () => void;
  hasActiveVideo?: boolean;
  hasActiveSubtitleResult?: boolean;
}

export function VideoHeroMetricsBanner({
  savedVideosCount,
  totalMinutes,
  totalSubtitlesCount,
  favoriteCount,
  avgProgress,
  onOpenShortcuts,
  onOpenSrtImport,
  onOpenXpSubModal,
  onOpenExportModal,
  hasActiveVideo,
  hasActiveSubtitleResult,
}: VideoHeroMetricsBannerProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[11px] sm:text-xs border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>YOUTUBE VIDEO STUDIO</span>
            </span>
          </div>
          <h1 className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display">
            Thư Viện Video & Phòng Luyện Nghe Tương Tác
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Kho video YouTube tích hợp phụ đề song ngữ, tra từ 1-click & luyện nói Shadowing AI.
          </p>
        </div>

        {/* Quick Action Buttons (Universal across Mobile, Tablet, and Desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap pt-0.5">
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="px-2 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs active:scale-95 cursor-pointer transition-all"
            title="Xem danh sách phím tắt học nhanh (Phím ?)"
          >
            <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Phím tắt</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[9px]">
              ?
            </kbd>
            <span className="sm:hidden font-mono text-[11px] font-bold">?</span>
          </button>
          <button
            type="button"
            onClick={onOpenSrtImport}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs active:scale-95 cursor-pointer transition-all"
            title="Nhập file phụ đề .SRT hoặc .VTT"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Nhập SRT</span>
          </button>
          {hasActiveVideo && onOpenXpSubModal && (
            <button
              type="button"
              onClick={onOpenXpSubModal}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 border border-purple-500/25 shadow-2xs active:scale-95 cursor-pointer transition-all"
              title="Trích xuất phụ đề thông minh bằng XP-Sub AI Engine"
            >
              <Sparkles className="w-3.5 h-3.5 fill-purple-500/40 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">XP-Sub AI Engine</span>
              <span className="sm:hidden">XP-Sub AI</span>
            </button>
          )}
          {hasActiveSubtitleResult && onOpenExportModal && (
            <button
              type="button"
              onClick={onOpenExportModal}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/25 shadow-2xs active:scale-95 cursor-pointer transition-all"
              title="Xem báo cáo và tải file phụ đề song ngữ"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 rotate-180" />
              <span className="hidden sm:inline">Xuất Subtitles</span>
              <span className="sm:hidden">Xuất Sub</span>
            </button>
          )}
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

      {/* Slim Compact Metric Strip (High-Efficiency, Saves 80px+ Vertical Space) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="px-3 py-2 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-2.5 transition-all hover:border-amber-300 dark:hover:border-amber-800/60 shadow-2xs group">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Video className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white tabular-nums leading-tight">
              {savedVideosCount}{" "}
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">video</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400 truncate mt-0.5">
              Bài học đã lưu
            </div>
          </div>
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-2.5 transition-all hover:border-sky-300 dark:hover:border-sky-800/60 shadow-2xs group">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white tabular-nums leading-tight">
              {totalMinutes}{" "}
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">phút</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400 truncate mt-0.5">
              Tổng thời lượng
            </div>
          </div>
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-2.5 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/60 shadow-2xs group">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Layers className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white tabular-nums leading-tight">
              {totalSubtitlesCount}{" "}
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">câu</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400 truncate mt-0.5">
              Phụ đề tương tác
            </div>
          </div>
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-2.5 transition-all hover:border-blue-300 dark:hover:border-blue-800/60 shadow-2xs group">
          <div className="w-7 h-7 rounded-lg bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Star className="w-3.5 h-3.5 stroke-[2.2] fill-amber-400 text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1 leading-tight">
              <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white tabular-nums">
                {favoriteCount}{" "}
                <span className="text-[11px] font-semibold text-[#0059bb] dark:text-sky-400 font-sans">thích</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[9px] shrink-0">
                {avgProgress}%
              </span>
            </div>
            <div className="w-full mt-1">
              <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-sky-400 transition-all duration-500"
                  style={{ width: `${avgProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
