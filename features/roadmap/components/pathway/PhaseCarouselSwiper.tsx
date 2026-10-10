"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { TargetRoadmapPhase, RoadmapTask } from "../../types";
import { PhaseRoadmapCard } from "./PhaseRoadmapCard";

interface PhaseCarouselSwiperProps {
  phases: TargetRoadmapPhase[];
  selectedTaskId?: string;
  onSelectTask: (task: RoadmapTask) => void;
  onToggleComplete: (taskId: string) => void;
}

/**
 * PhaseCarouselSwiper
 * Component lướt chuyển các chặng lộ trình (Horizontal Carousel & Swipeable Track)
 * Thanh điều hướng gọn gàng: Hiển thị chữ "Chặng X" và icon chuyển chặng nhảy số trực quan.
 */
export const PhaseCarouselSwiper: React.FC<PhaseCarouselSwiperProps> = ({
  phases,
  selectedTaskId,
  onSelectTask,
  onToggleComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tự động lướt đến chặng chứa bài học được chọn nếu người dùng chọn từ ngoài
  useEffect(() => {
    if (!selectedTaskId) return;
    const phaseIdx = phases.findIndex((p) =>
      p.tasks.some((t) => t.id === selectedTaskId)
    );
    if (phaseIdx !== -1 && phaseIdx !== activeIndex) {
      scrollToPhase(phaseIdx);
    }
  }, [selectedTaskId, phases]);

  // Cuộn/lướt mượt mà tới chặng mục tiêu và nhảy số chặng ngay lập tức
  const scrollToPhase = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const targetIndex = Math.max(0, Math.min(index, phases.length - 1));
      const container = containerRef.current;
      const slideWidth = container.clientWidth;
      container.scrollTo({
        left: targetIndex * slideWidth,
        behavior: "smooth",
      });
      setActiveIndex(targetIndex);
    },
    [phases.length]
  );

  // Lắng nghe sự kiện scroll khi người dùng vuốt/lướt bằng ngón tay hoặc trackpad
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.clientWidth;
    if (slideWidth === 0) return;
    const newIndex = Math.round(container.scrollLeft / slideWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < phases.length) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, phases.length]);

  return (
    <div className="space-y-3">
      {/* 1. COMPACT TOP CAROUSEL CONTROLLER: Single-line Strip */}
      <div className="py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2.5">
        {/* Left: Compact Title với icon Compass chuẩn phong cách Lộ Trình của web */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/60 shadow-2xs">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
            Chặng Lộ Trình
          </span>
        </div>

        {/* Right: Phase Number Label & Next/Prev Switcher Icons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Chữ Chặng Mấy thuần túy, tăng cỡ chữ rõ nét */}
          <span className="text-sm sm:text-base font-bold text-[#0059bb] dark:text-sky-400 font-display select-none tracking-tight">
            Chặng {activeIndex + 1}
          </span>

          {/* Icon chuyển chặng sắc nét với stroke-[2.5] */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => scrollToPhase(activeIndex - 1)}
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Chặng trước"
              aria-label="Chặng trước"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              disabled={activeIndex === phases.length - 1}
              onClick={() => scrollToPhase(activeIndex + 1)}
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Chặng tiếp theo"
              aria-label="Chặng tiếp theo"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. SWIPEABLE TRACK: Horizontal Scroll Snap Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-4 pb-0.5"
      >
        {phases.map((phase) => (
          <div
            key={phase.phaseNum}
            className="w-full min-w-full shrink-0 snap-center"
          >
            <PhaseRoadmapCard
              phase={phase}
              selectedTaskId={selectedTaskId}
              onSelectTask={onSelectTask}
              onToggleComplete={onToggleComplete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
