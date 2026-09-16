"use client";
import React from "react";
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  ExternalLink,
  Star,
  Trash2,
} from "lucide-react";
import { YouTubeVideoItem, extractYouTubeStartTimestamp } from "@/stores/videoStore";

import { Toast } from "@/stores/notificationStore";

interface VideoPlayerStudioProps {
  activeVideo: YouTubeVideoItem;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  isPlaying: boolean;
  togglePlayPause: () => void;
  jumpToRandomSubtitle: () => void;
  jumpToPrevSubtitle: () => void;
  jumpToNextSubtitle: () => void;
  isLoopingSentence: boolean;
  toggleLoopSentence: () => void;
  subtitleSyncOffset: number;
  setSubtitleSyncOffset: (offset: number) => void;
  playbackSpeed: number;
  changePlaybackSpeed: (speed: number) => void;
  toggleFavorite: (id: string) => void;
  onDeleteVideo: (id: string) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
}

export const VideoPlayerStudio: React.FC<VideoPlayerStudioProps> = ({
  activeVideo,
  iframeRef,
  isPlaying,
  togglePlayPause,
  jumpToRandomSubtitle,
  jumpToPrevSubtitle,
  jumpToNextSubtitle,
  isLoopingSentence,
  toggleLoopSentence,
  subtitleSyncOffset,
  setSubtitleSyncOffset,
  playbackSpeed,
  changePlaybackSpeed,
  toggleFavorite,
  onDeleteVideo,
  addToast,
}) => {
  const startTimestamp = extractYouTubeStartTimestamp(activeVideo.youtubeUrl);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 overflow-hidden flex flex-col h-full">
        {/* Double-Bezel Hardware Tray */}
        <div className="p-2 bg-slate-900 dark:bg-slate-950 border-b border-slate-800">
          <div className="relative aspect-video w-full max-h-[300px] sm:max-h-[340px] lg:max-h-[380px] rounded-xl bg-black overflow-hidden group flex items-center justify-center border border-slate-800/80">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${activeVideo.id}?enablejsapi=1&controls=1&rel=0&playsinline=1${
                startTimestamp > 0 ? `&start=${startTimestamp}` : ""
              }&origin=${encodeURIComponent(origin)}`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />

            {/* Center Play Button Overlay on Video */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer transition-all hover:bg-slate-950/20 group/playbtn z-10"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0059bb] hover:bg-[#004899] text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/20"
                  title="Phát video (Play)"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Media Control Dock */}
        <div className="py-2 px-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 select-none">
          {/* Left: 5 Audio/Video Control Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Nút 1: Shuffle */}
            <button
              type="button"
              onClick={jumpToRandomSubtitle}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Tráo câu ngẫu nhiên (Shuffle Subtitle - Phím S)"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Nút 2: Skip Back */}
            <button
              type="button"
              onClick={jumpToPrevSubtitle}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Câu trước (Previous Cue - Phím ← / J)"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Nút 3: Central Main Play / Pause */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white shadow-md shadow-[#0059bb]/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 border border-blue-400/20"
              title={isPlaying ? "Tạm dừng video (Pause - Phím Space)" : "Phát video (Play - Phím Space)"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Nút 4: Skip Forward */}
            <button
              type="button"
              onClick={jumpToNextSubtitle}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Câu sau (Next Cue - Phím → / L)"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Nút 5: Loop Sentence */}
            <button
              type="button"
              onClick={toggleLoopSentence}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                isLoopingSentence
                  ? "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800"
              }`}
              title={isLoopingSentence ? "Đang bật Lặp Câu (Phím R)" : "Bật Lặp Câu (Phím R)"}
            >
              {isLoopingSentence ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Right: Micro-Sync Calibration & Speed Switcher Dock */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Micro-Sync Calibration */}
            <div
              className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/60 gap-0.5"
              title="Tinh chỉnh độ lệch phụ đề (Micro-Sync Subtitle Offset)"
            >
              <button
                type="button"
                onClick={() => {
                  const nextOffset = parseFloat((subtitleSyncOffset - 0.2).toFixed(2));
                  setSubtitleSyncOffset(nextOffset);
                  addToast({
                    type: "info",
                    title: "Chỉnh lệch phụ đề",
                    message: `Đã lùi phụ đề ${nextOffset}s so với video`,
                  });
                }}
                className="px-1.5 py-1 rounded text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title="Lùi 0.2 giây (-0.2s)"
              >
                -0.2s
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubtitleSyncOffset(0.0);
                  addToast({
                    type: "info",
                    title: "Đặt lại lệch phụ đề",
                    message: "Đã đưa độ lệch phụ đề về chuẩn 0.0s",
                  });
                }}
                className={`px-1.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  subtitleSyncOffset !== 0
                    ? "bg-amber-400 text-slate-950 font-black"
                    : "text-slate-500 dark:text-slate-400"
                }`}
                title="Đặt lại về 0.0s (Reset)"
              >
                {subtitleSyncOffset === 0 ? "Sync: 0s" : `${subtitleSyncOffset > 0 ? "+" : ""}${subtitleSyncOffset}s`}
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextOffset = parseFloat((subtitleSyncOffset + 0.2).toFixed(2));
                  setSubtitleSyncOffset(nextOffset);
                  addToast({
                    type: "info",
                    title: "Chỉnh lệch phụ đề",
                    message: `Đã tiến phụ đề +${nextOffset}s so với video`,
                  });
                }}
                className="px-1.5 py-1 rounded text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title="Tiến 0.2 giây (+0.2s)"
              >
                +0.2s
              </button>
            </div>

            {/* Speed Switcher Dock */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/60 gap-0.5 shrink-0">
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => changePlaybackSpeed(speed)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer ${
                    playbackSpeed === speed
                      ? "bg-[#0059bb] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Info Bar */}
        <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200 dark:border-blue-800">
                  {activeVideo.category}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {activeVideo.level}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold border border-slate-200/70 dark:border-slate-700/60"
                  title="Mở video trên YouTube gốc"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
                <button
                  type="button"
                  onClick={() => toggleFavorite(activeVideo.id)}
                  className={`p-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                    activeVideo.isFavorite
                      ? "bg-amber-50 dark:bg-amber-950 text-amber-600 border-amber-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 border-slate-200/70 dark:border-slate-700/60"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${activeVideo.isFavorite ? "fill-current text-amber-500" : ""}`} />
                  <span className="hidden sm:inline">Yêu thích</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteVideo(activeVideo.id)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer border border-slate-200/70 dark:border-slate-700/60"
                  title="Xóa video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white leading-snug">
              {activeVideo.title}
            </h2>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium truncate">Kênh: {activeVideo.authorName}</span>
              <span className="font-mono text-[#0059bb] dark:text-sky-400 font-bold">
                {activeVideo.progressPercent}% Hoàn thành
              </span>
            </div>

            {/* Animated Gradient Progress Bar */}
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-sky-400 transition-all duration-500 shadow-sm"
                style={{ width: `${activeVideo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
