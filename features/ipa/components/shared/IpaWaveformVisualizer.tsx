"use client";

import React, { useMemo } from "react";

export interface IpaWaveformVisualizerProps {
  isActive: boolean;
  mode?: "playback" | "recording";
  barCount?: number;
  className?: string;
}

export const IpaWaveformVisualizer: React.FC<IpaWaveformVisualizerProps> = ({
  isActive,
  mode = "playback",
  barCount = 18,
  className = "",
}) => {
  // Deterministic seed heights for static / active state
  const baseHeights = useMemo(() => {
    return [24, 45, 75, 35, 90, 60, 40, 85, 95, 70, 50, 80, 65, 45, 90, 35, 55, 30];
  }, []);

  // Contextual theme colors (Rule 20: 60-30-10)
  const isRecording = mode === "recording";
  const activeColor = isRecording
    ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
    : "bg-[#0059bb] dark:bg-sky-400 shadow-[0_0_8px_rgba(0,89,187,0.3)]";
  const inactiveColor = "bg-slate-200 dark:bg-slate-800";

  return (
    <div
      className={`flex items-center justify-center gap-[3px] h-8 px-2 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const heightPercent = baseHeights[i % baseHeights.length];
        const animDelay = `${(i * 0.08).toFixed(2)}s`;
        const animDuration = `${(0.6 + (i % 3) * 0.2).toFixed(2)}s`;

        return (
          <span
            key={i}
            style={{
              height: isActive ? `${heightPercent}%` : "20%",
              animationDelay: animDelay,
              animationDuration: animDuration,
            }}
            className={`w-[3px] rounded-full transition-all duration-300 ${
              isActive ? `${activeColor} animate-pulse` : inactiveColor
            }`}
          />
        );
      })}
    </div>
  );
};
