"use client";
import React from "react";
import { Play, Star, Trash2, Clock } from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";

export interface VideoCardItemProps {
  video: YouTubeVideoItem;
  isActive?: boolean;
  variant?: "grid" | "playlist";
  onSelectVideo: (video: YouTubeVideoItem) => void;
  onToggleFavorite?: (id: string) => void;
  onRemoveVideo?: (id: string) => void;
}

export function VideoCardItem({
  video,
  isActive = false,
  variant = "grid",
  onSelectVideo,
  onToggleFavorite,
  onRemoveVideo,
}: VideoCardItemProps) {
  if (variant === "playlist") {
    return (
      <button
        type="button"
        onClick={() => onSelectVideo(video)}
        className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5 ${
          isActive
            ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] text-[#0059bb] dark:text-sky-400 shadow-sm"
            : "bg-slate-50 dark:bg-slate-950 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200"
        }`}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-16 aspect-video object-cover rounded-lg shrink-0 border border-slate-200/50 dark:border-slate-700/50"
        />
        <div className="min-w-0 flex-1 space-y-1">
          <h4 className="text-xs font-bold truncate font-display leading-tight">
            {video.title}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3 text-slate-400" /> {video.duration}
            </span>
            <span>• {video.progressPercent}%</span>
          </div>
        </div>
        {isActive && (
          <Play className="w-4 h-4 fill-current text-[#0059bb] dark:text-sky-400 shrink-0" />
        )}
      </button>
    );
  }

  // Default: Grid Variant
  return (
    <div
      className={`rounded-xl bg-white dark:bg-slate-900 border transition-all duration-200 overflow-hidden flex flex-col group hover:shadow-lg ${
        isActive
          ? "border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md shadow-[#0059bb]/10"
          : "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
      }`}
    >
      {/* Thumbnail & Badges */}
      <div
        className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => onSelectVideo(video)}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-all flex items-center justify-center">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
              isActive
                ? "bg-[#0059bb] scale-110"
                : "bg-black/60 group-hover:bg-[#0059bb] group-hover:scale-110"
            }`}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
          {video.duration}
        </span>

        {/* Category & Level Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-[#0059bb]/90 backdrop-blur-xs text-white text-[10px] font-bold">
            {video.category}
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-white text-[10px] font-bold backdrop-blur-xs ${
              video.level === "Easy"
                ? "bg-emerald-600/90"
                : video.level === "Hard"
                ? "bg-rose-600/90"
                : "bg-amber-600/90"
            }`}
          >
            {video.level}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-1.5">
          <h4
            onClick={() => onSelectVideo(video)}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-[#0059bb] cursor-pointer font-display leading-snug"
          >
            {video.title}
          </h4>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
            {video.authorName}
          </p>
        </div>

        {/* Progress Bar & Actions */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
            <span>Tiến độ học</span>
            <span
              className={
                video.progressPercent === 100
                  ? "text-emerald-600 font-bold"
                  : "text-[#0059bb] font-bold"
              }
            >
              {video.progressPercent}%
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                video.progressPercent === 100
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-[#0059bb] to-sky-400"
              }`}
              style={{ width: `${video.progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[10px] text-slate-400 font-mono">
              {video.subtitles.length} câu phụ đề
            </span>

            <div className="flex items-center gap-1">
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={() => onToggleFavorite(video.id)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    video.isFavorite
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500"
                  }`}
                  title={video.isFavorite ? "Bỏ yêu thích" : "Yêu thích video này"}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      video.isFavorite ? "fill-amber-400 text-amber-400" : ""
                    }`}
                  />
                </button>
              )}

              {onRemoveVideo && (
                <button
                  type="button"
                  onClick={() => onRemoveVideo(video.id)}
                  className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                  title="Xóa video khỏi danh sách"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
