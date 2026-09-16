"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProactiveNudgeBubble() {
  const router = useRouter();
  const { nudge, dismissNudge, setIsOpen, sendMessage, isOpen, bubblePosition } =
    useAiChatbotStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [effectiveSide, setEffectiveSide] = useState<"left" | "right">("right");
  const [isTopHalf, setIsTopHalf] = useState(false);

  // Measure physical viewport position to guarantee card never clips screen boundary
  useEffect(() => {
    if (typeof window === "undefined") return;

    const computePlacement = () => {
      const parent = containerRef.current?.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const screenW = window.innerWidth;
        // If bubble center is on left half of screen, card opens to the right (left-0)
        const isLeft = rect.left + rect.width / 2 < screenW / 2;
        setEffectiveSide(isLeft ? "left" : "right");
        setIsTopHalf(rect.top < 190);
      } else {
        const isLeft =
          bubblePosition?.side === "left" ||
          (bubblePosition?.x > 0 && bubblePosition.x < window.innerWidth / 2);
        setEffectiveSide(isLeft ? "left" : "right");
        setIsTopHalf((bubblePosition?.y ?? 300) < 190);
      }
    };

    computePlacement();
    window.addEventListener("resize", computePlacement);
    return () => window.removeEventListener("resize", computePlacement);
  }, [bubblePosition]);

  if (!nudge || isOpen) return null;

  const handleClick = () => {
    if (nudge.actionPrompt) {
      setIsOpen(true);
      sendMessage(nudge.actionPrompt);
    } else if (nudge.actionPath) {
      setIsOpen(false);
      router.push(nudge.actionPath);
    } else {
      setIsOpen(true);
    }
    dismissNudge();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: isTopHalf ? -8 : 8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isTopHalf ? -8 : 8, scale: 0.94 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`absolute ${
          isTopHalf ? "top-14" : "bottom-14"
        } ${
          effectiveSide === "left" ? "left-0" : "right-0"
        } w-[calc(100vw-40px)] max-w-[275px] p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 space-y-2 z-50 pointer-events-auto select-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400">
            <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#0059bb] dark:text-sky-400 stroke-[2]" />
            </div>
            <span>XP Mentor gợi ý</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismissNudge();
            }}
            className="w-7 h-7 -mr-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng gợi ý"
            title="Đóng gợi ý"
          >
            <X className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>

        {/* Text */}
        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          {nudge.text}
        </p>

        {/* Action Button (Touch-Friendly >= 32px height) */}
        {nudge.actionText && (
          <button
            type="button"
            onClick={handleClick}
            className="w-full h-8 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm shadow-[#0059bb]/20"
          >
            <span>{nudge.actionText}</span>
            <ArrowRight className="w-3 h-3 stroke-[2.2]" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
