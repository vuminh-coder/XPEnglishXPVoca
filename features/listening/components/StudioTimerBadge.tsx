"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

export interface StudioTimerBadgeProps {
  isActive?: boolean;
  initialSeconds?: number;
  onSecondsUpdate?: (seconds: number) => void;
  className?: string;
}

export function formatStudioElapsedTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Self-contained practice timer badge.
 * Runs its own 1000ms tick interval so that parent page and studio workspaces
 * are completely isolated from 1Hz re-render overhead.
 */
export const StudioTimerBadge: React.FC<StudioTimerBadgeProps> = React.memo(
  function StudioTimerBadge({
    isActive = true,
    initialSeconds = 0,
    onSecondsUpdate,
    className = "",
  }) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const onSecondsUpdateRef = useRef(onSecondsUpdate);

    useEffect(() => {
      onSecondsUpdateRef.current = onSecondsUpdate;
    }, [onSecondsUpdate]);

    useEffect(() => {
      if (initialSeconds > 0) {
        setSeconds(initialSeconds);
      }
    }, [initialSeconds]);

    useEffect(() => {
      if (!isActive) return;

      const timer = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          onSecondsUpdateRef.current?.(next);
          return next;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [isActive]);

    return (
      <span
        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap ${className}`}
        title="Thời gian thực hành bài học này"
      >
        <Clock className="w-3.5 h-3.5" />
        <span className="font-mono tabular-nums">{formatStudioElapsedTime(seconds)}</span>
      </span>
    );
  }
);
