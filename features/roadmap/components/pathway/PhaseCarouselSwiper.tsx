"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
 * Tích hợp trực tiếp thanh điều hướng vào tiêu đề PhaseRoadmapCard, triệt tiêu card thanh điều hướng trùng lặp bên trên.
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
    <div className="w-full min-w-0">
      {/* SWIPEABLE TRACK: Horizontal Scroll Snap Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-4 pb-0.5"
      >
        {phases.map((phase, idx) => (
          <div
            key={phase.phaseNum}
            className="w-full min-w-full shrink-0 snap-center"
          >
            <PhaseRoadmapCard
              phase={phase}
              selectedTaskId={selectedTaskId}
              onSelectTask={onSelectTask}
              onToggleComplete={onToggleComplete}
              phaseIndex={idx}
              totalPhases={phases.length}
              onPrevPhase={() => scrollToPhase(activeIndex - 1)}
              onNextPhase={() => scrollToPhase(activeIndex + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
