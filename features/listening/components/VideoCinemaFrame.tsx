"use client";

import React from "react";
import { extractYouTubeVideoId } from "@/features/listening/services/videoIngestionService";
import { Headphones, ExternalLink, Play } from "lucide-react";

interface VideoCinemaFrameProps {
  sourceUrlOrId?: string;
  thumbnailUrl?: string;
  title?: string;
  onSwitchToAudioMode?: () => void;
  className?: string;
}

export const VideoCinemaFrame: React.FC<VideoCinemaFrameProps> = ({
  sourceUrlOrId,
  thumbnailUrl,
  title = "Video Lesson",
  onSwitchToAudioMode,
  className = "",
}) => {
  const youtubeId = sourceUrlOrId ? extractYouTubeVideoId(sourceUrlOrId) : null;
  const thumb =
    thumbnailUrl ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg ${className}`}
    >
      {/* Top Bar with Cinema Title & Mode Quick-Toggle */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-semibold text-white truncate max-w-[240px] sm:max-w-md">
            {title}
          </span>
        </div>
        {onSwitchToAudioMode && (
          <button
            type="button"
            onClick={onSwitchToAudioMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold cursor-pointer shrink-0"
            title="Chuyển sang Chế độ Audio (Ẩn video, tập trung thanh sóng âm)"
          >
            <Headphones className="w-3.5 h-3.5 text-sky-400" />
            <span>Chế độ Audio</span>
          </button>
        )}
      </div>

      {/* Video Content / Iframe */}
      <div className="relative aspect-video w-full max-h-[360px] sm:max-h-[420px] bg-black flex items-center justify-center">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : thumb ? (
          <div className="relative w-full h-full group flex items-center justify-center">
            <img
              src={thumb}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center text-white">
                <Play className="w-8 h-8 mx-auto mb-2 text-white fill-white" />
                <p className="text-xs font-medium">Video Stream Audio Player</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 text-slate-400 text-xs">
            <p>Không có video trực quan khả dụng cho bài học này.</p>
          </div>
        )}
      </div>
    </div>
  );
};
