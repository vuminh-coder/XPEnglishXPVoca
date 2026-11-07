"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Hình học biểu đồ theo đơn vị pixel thật (1 đơn vị SVG = 1px).
 * Nhờ vậy chữ trục & nhãn nổi luôn đúng 12px+ trên cả Desktop lẫn Mobile,
 * không bị co nhỏ theo tỉ lệ viewBox như trước.
 */
export const CHART_HEIGHT = 220;
export const CHART_PAD_LEFT = 40;
export const CHART_PAD_RIGHT = 12;
export const CHART_PAD_TOP = 28;
export const CHART_PAD_BOTTOM = 10;
export const CHART_BASELINE_Y = CHART_HEIGHT - CHART_PAD_BOTTOM;
export const CHART_DEFAULT_WIDTH = 480;

/** 6 đường lưới ngang cách đều từ đỉnh xuống đường nền. */
export const CHART_Y_COORDS: number[] = Array.from(
  { length: 6 },
  (_, i) => CHART_PAD_TOP + (i * (CHART_BASELINE_Y - CHART_PAD_TOP)) / 5
);

/** Đo bề rộng khung biểu đồ để dựng viewBox 1:1 với pixel. */
export function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(CHART_DEFAULT_WIDTH);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      if (w > 0) setWidth(w);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
