"use client";
import React from "react";
import { Keyboard, Upload, Sparkles, FileCode } from "lucide-react";

export interface VideoTopHeaderActionsProps {
  onOpenShortcuts: () => void;
  onOpenSrtImport: () => void;
  onOpenXpSubModal: () => void;
  onOpenExportModal: () => void;
  hasActiveVideo: boolean;
  hasActiveSubtitleResult: boolean;
}

export function VideoTopHeaderActions({
  onOpenShortcuts,
  onOpenSrtImport,
  onOpenXpSubModal,
  onOpenExportModal,
  hasActiveVideo,
  hasActiveSubtitleResult,
}: VideoTopHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={onOpenShortcuts}
        className="h-8 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
        title="Xem danh sách phím tắt học nhanh (Phím ?)"
      >
        <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>Phím tắt</span>
        <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[9px]">
          ?
        </kbd>
      </button>

      <button
        type="button"
        onClick={onOpenSrtImport}
        className="h-8 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
        title="Nhập file phụ đề .SRT hoặc .VTT"
      >
        <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>Nhập SRT</span>
      </button>

      {hasActiveVideo && (
        <button
          type="button"
          onClick={onOpenXpSubModal}
          className="h-8 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/25 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Trích xuất phụ đề thông minh bằng XP-Sub AI Engine"
        >
          <Sparkles className="w-3.5 h-3.5 fill-purple-500/40 text-purple-600 dark:text-purple-400" />
          <span>XP-Sub AI Engine</span>
        </button>
      )}

      {hasActiveSubtitleResult && (
        <button
          type="button"
          onClick={onOpenExportModal}
          className="h-8 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Xem báo cáo và tải file phụ đề song ngữ"
        >
          <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Xuất Subtitles</span>
        </button>
      )}
    </div>
  );
}
