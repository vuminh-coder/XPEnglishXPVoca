"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

export const JAGGED_ACOUSTIC_SPEECH_SPIKES_95 = [
  // 1. Far Left Flat Tail (1-8)
  4, 3, 4, 3, 5, 4, 6, 8,
  // 2. Cluster 1 - Jagged Sharp Spikes (9-22)
  14, 32, 18, 58, 26, 85, 38, 92, 22, 65, 30, 48, 16, 8,
  // 3. Low Trough with minor jitter (23-28)
  6, 10, 7, 14, 9, 7,
  // 4. Cluster 2 - Irregular Jagged Bursts (29-42)
  20, 52, 28, 76, 40, 84, 26, 68, 36, 55, 22, 38, 14, 8,
  // 5. Low Valley (43-47)
  6, 12, 8, 15, 10,
  // 6. Center Monster Burst - Extreme Peaks & Valleys (48-64)
  28, 65, 35, 96, 24, 100, 50, 94, 28, 88, 42, 78, 22, 54, 18, 12, 8,
  // 7. Low Valley (65-69)
  6, 14, 9, 16, 10,
  // 8. Cluster 3 - Sharp Asymmetric Bursts (70-80)
  24, 60, 30, 74, 38, 58, 24, 46, 18, 12, 7,
  // 9. Valley (81-84)
  5, 10, 7, 12,
  // 10. Cluster 4 - Right Sharp Spikes (85-95)
  26, 80, 32, 92, 20, 78, 38, 86, 18, 10, 6,
  // 11. Far Right Tail (96-103)
  5, 4, 4, 3, 3, 2, 2, 2,
];

// Backwards compatibility aliases
export const ACOUSTIC_SPEECH_ENVELOPE_95 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const ACOUSTIC_SPEECH_ENVELOPE_71 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_PINNED_CAPS_41 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_NATURAL_SPECTRUM_42 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_DIAMOND_37 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_NATURAL_44 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_AMPLITUDES_84 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_AMPLITUDES_56 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_AMPLITUDES_48 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;
export const SPEECH_WAVE_AMPLITUDES_44 = JAGGED_ACOUSTIC_SPEECH_SPIKES_95;

interface StudioWaveformCardProps {
  segmentIndex?: number;
  totalSegments?: number;
  playbackTime: number;
  duration?: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRewind5s: () => void;
  onForward5s: () => void;
  onSeek?: (seconds: number) => void;
  onSpeedChange: (speed: number) => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  className?: string;
}

export function StudioWaveformCard({
  segmentIndex = 0,
  totalSegments = 1,
  playbackTime,
  duration = 6,
  isPlaying,
  playbackSpeed,
  onTogglePlay,
  onPrev,
  onNext,
  onRewind5s,
  onForward5s,
  onSeek,
  onSpeedChange,
  isPrevDisabled = false,
  isNextDisabled = false,
  className = "",
}: StudioWaveformCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const effectiveDuration = Math.max(3, duration || 6);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = clickX / rect.width;
    const targetTime = Math.max(0, Math.min(effectiveDuration, Math.round(percent * effectiveDuration)));
    if (onSeek) {
      onSeek(targetTime);
    } else {
      onTogglePlay();
    }
  };

  return (
    <div
      className={`p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/60 dark:shadow-black/40 space-y-2 sm:space-y-2.5 font-sans ${className}`}
    >
      {/* 1. TOP HEADER: Status Indicator with Larger Bold Typography + Digital Timer */}
      <div className="flex items-center justify-between">
        {/* Khối biểu tượng âm thanh cao cấp đối xứng với đồng hồ số */}
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
          <Volume2
            className={`w-4 h-4 transition-colors ${
              isPlaying
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-600 dark:text-slate-400"
            }`}
          />
        </div>

        {/* Integrated Digital Timer & Total Duration in Top-Right Corner */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white tabular-nums">
            {formatTime(playbackTime)}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-xs font-bold">/</span>
          <span className="font-mono text-xs sm:text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
            {formatTime(effectiveDuration)}
          </span>
        </div>
      </div>

      {/* 2. CENTER JAGGED ACOUSTIC SPEECH WAVEFORM (UNPREDICTABLE SPIKES & DENSE SPACING) */}
      <div className="w-full flex justify-center items-center py-0.5 sm:py-1">
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          title={
            isPlaying
              ? "Nhấp để tạm dừng âm thanh (Space)"
              : "Nhấp để phát âm thanh câu (Space)"
          }
          className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-14 sm:h-16 lg:h-18 flex items-center justify-center px-1 bg-transparent cursor-pointer transition-all group select-none overflow-hidden"
        >
          {/* Dense Jagged Vector Spectrum Bars with High-Contrast Spikes */}
          <div className="relative z-10 w-full flex items-center justify-center gap-[1px] sm:gap-[1.5px] h-full">
            {JAGGED_ACOUSTIC_SPEECH_SPIKES_95.map((amp, i) => {
              const animDuration = Math.max(
                0.65,
                (0.8 + ((i * 11) % 7) * 0.05) / Math.max(0.5, playbackSpeed || 1)
              );
              const animDelay = (i * 0.018) % 0.35;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={
                    isPlaying
                      ? {
                          scaleY: [
                            0.45 + (amp % 0.25),
                            1.15 + ((i % 7) * 0.04),
                          ],
                          opacity: [0.75, 1],
                        }
                      : {
                          scaleY: 1,
                          opacity: 0.85,
                        }
                  }
                  transition={
                    isPlaying
                      ? {
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: animDuration,
                          delay: animDelay,
                          ease: "easeInOut",
                        }
                      : { duration: 0.3, ease: "easeOut" }
                  }
                  style={{
                    height: `${Math.max(4, amp)}%`,
                    transformOrigin: "center center",
                  }}
                  className="w-[1.2px] sm:w-[1.5px] lg:w-[1.8px] rounded-[0.2px] shrink-0 bg-slate-500 dark:bg-slate-400"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM INTEGRATED AUDIO CONTROLS & SPEED DOCK */}
      <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pt-0.5">
        {/* Playback Transport Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 select-none">
          {/* Skip Back */}
          <button
            type="button"
            disabled={isPrevDisabled}
            onClick={onPrev}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-90"
            title="Câu trước (Shift + Left)"
          >
            <SkipBack className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Rewind 5s */}
          <button
            type="button"
            onClick={onRewind5s}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all active:scale-90 relative"
            title="Tua lùi 5s (←)"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="absolute text-[8px] sm:text-[9px] font-extrabold font-mono text-slate-800 dark:text-slate-200 pointer-events-none -translate-y-0.5">
              5
            </span>
          </button>

          {/* Center Master Play Button with Tactile Ring & Prominent Shadow */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-900/25 dark:shadow-white/10 ring-4 ring-slate-900/10 dark:ring-white/15 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 select-none group"
            title={isPlaying ? "Tạm dừng (Space)" : "Phát âm thanh câu (Space)"}
          >
            {isPlaying ? (
              <Pause className="w-5 sm:w-5.5 h-5 sm:h-5.5 fill-current" />
            ) : (
              <Play className="w-5 sm:w-5.5 h-5 sm:h-5.5 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Forward 5s */}
          <button
            type="button"
            onClick={onForward5s}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all active:scale-90 relative"
            title="Tua nhanh 5s (→)"
          >
            <RotateCw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="absolute text-[8px] sm:text-[9px] font-extrabold font-mono text-slate-800 dark:text-slate-200 pointer-events-none -translate-y-0.5">
              5
            </span>
          </button>

          {/* Skip Forward */}
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={onNext}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-90"
            title="Câu tiếp theo (Shift + Right)"
          >
            <SkipForward className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Speed Selector Pill Dock with Spring Sliding Indicator */}
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center p-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 gap-0.5 text-xs shadow-2xs relative">
            {[0.5, 0.75, 1.0, 1.25, 1.5].map((spd) => {
              const isActive = playbackSpeed === spd;
              return (
                <button
                  key={spd}
                  type="button"
                  onClick={() => onSpeedChange(spd)}
                  className={`relative px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-extrabold font-mono transition-colors cursor-pointer select-none z-10 ${
                    isActive
                      ? "text-white dark:text-slate-950"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSpeedPillIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="absolute inset-0 bg-slate-950 dark:bg-white rounded-full shadow-xs -z-10"
                    />
                  )}
                  <span>{spd === 1.0 ? "1x" : `${spd}x`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

