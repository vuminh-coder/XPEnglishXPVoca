"use client";
import React from "react";
import {
  Video,
  Clock,
  Layers,
  Star,
} from "lucide-react";

export interface VideoHeroMetricsBannerProps {
  savedVideosCount: number;
  totalMinutes: number;
  totalSubtitlesCount: number;
  favoriteCount: number;
  avgProgress: number;
  onOpenShortcuts?: () => void;
  onOpenSrtImport?: () => void;
  onOpenXpSubModal?: () => void;
  onOpenExportModal?: () => void;
  hasActiveVideo?: boolean;
  hasActiveSubtitleResult?: boolean;
}

function YouTubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function VideoHeroMetricsBanner({
  savedVideosCount,
  totalMinutes,
  totalSubtitlesCount,
  favoriteCount,
  avgProgress,
}: VideoHeroMetricsBannerProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-mono font-bold text-[11px] sm:text-xs border border-rose-200/60 dark:border-rose-800/40 flex items-center gap-1.5 shadow-2xs">
              <YouTubeIcon className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>YOUTUBE VIDEO STUDIO</span>
            </span>
          </div>
          <h1 className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
            <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
            <span>Thư Viện Video YouTube & Phòng Luyện Nghe Tương Tác</span>
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Kho video YouTube tích hợp phụ đề song ngữ, tra từ 1-click & luyện nói Shadowing AI.
          </p>
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
