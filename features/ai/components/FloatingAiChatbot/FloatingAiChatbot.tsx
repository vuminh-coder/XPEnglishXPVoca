"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { useNotificationStore } from "@/stores/notificationStore";
import ChatbotHeader from "./ChatbotHeader";
import SmartChatConversation from "./SmartChatConversation";
import ProactiveNudgeBubble from "./ProactiveNudgeBubble";
import { Bot, X } from "lucide-react";

const BUBBLE_SIZE = 48; // 48px standard floating bubble
const PADDING = 16;
const DRAG_THRESHOLD = 5;

export default function FloatingAiChatbot() {
  const pathname = usePathname();
  const {
    isOpen,
    toggleOpen,
    bubblePosition,
    setBubblePosition,
    isDismissed,
    setIsDismissed,
    initPositionFromStorage,
    dbData,
  } = useAiChatbotStore();

  const [mounted, setMounted] = useState(false);
  const [isOverDismiss, setIsOverDismiss] = useState(false);
  const [isDraggingLocal, setIsDraggingLocal] = useState(false);

  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const startPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Motion values for smooth 60fps drag & spring physics
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 400, damping: 28 });
  const springY = useSpring(motionY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    setMounted(true);
    initPositionFromStorage();
  }, [initPositionFromStorage]);

  // Global Keyboard Shortcut: Ctrl + / (or Cmd + / or Alt + C) to quickly toggle / restore chatbot
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing normally without modifier
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "/") ||
        (e.altKey && e.key.toLowerCase() === "c")
      ) {
        e.preventDefault();
        const store = useAiChatbotStore.getState();
        if (store.isDismissed) {
          store.resetDismissed();
        } else {
          store.toggleOpen();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Set initial position once mounted & clamp on window resize
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const clampPosition = () => {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      let initX = bubblePosition.x;
      let initY = bubblePosition.y;

      if (initX === 0 && initY === 0) {
        initX = screenW - BUBBLE_SIZE - PADDING;
        initY = screenH - BUBBLE_SIZE - 90;
      } else {
        initX = Math.max(PADDING, Math.min(initX, screenW - BUBBLE_SIZE - PADDING));
        initY = Math.max(PADDING + 40, Math.min(initY, screenH - BUBBLE_SIZE - PADDING - 40));
      }

      motionX.set(initX);
      motionY.set(initY);
    };

    clampPosition();
    window.addEventListener("resize", clampPosition);
    return () => window.removeEventListener("resize", clampPosition);
  }, [mounted, bubblePosition.x, bubblePosition.y, motionX, motionY]);

  // Snap to edge handler with live DOM bounding box detection
  const handleSnapToEdge = () => {
    if (typeof window === "undefined") return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let currentX = motionX.get();
    let currentY = motionY.get();

    if (bubbleContainerRef.current) {
      const rect = bubbleContainerRef.current.getBoundingClientRect();
      currentX = rect.left;
      currentY = rect.top;
    }

    const boundedY = Math.max(
      PADDING + 40,
      Math.min(currentY, screenH - BUBBLE_SIZE - PADDING - 50)
    );
    const midX = screenW / 2;
    const snapToRight = currentX + BUBBLE_SIZE / 2 >= midX;
    const targetX = snapToRight ? screenW - BUBBLE_SIZE - PADDING : PADDING;

    motionX.set(targetX);
    motionY.set(boundedY);

    setBubblePosition({
      x: targetX,
      y: boundedY,
      side: snapToRight ? "right" : "left",
    });
  };

  // Auto-hide when in Exam Prep testing room to avoid blocking the test timer, answer sheet & buttons
  const isExamMode =
    pathname?.startsWith("/study/exam-prep") || pathname?.startsWith("/study/exams");

  // When dismissed by user or in exam mode, render nothing on-screen (hotkey Ctrl + / will call it back)
  if (!mounted || isDismissed || isExamMode) return null;

  const questCount = dbData?.dailyQuests?.filter((q) => !q.isCompleted).length ?? 0;

  return (
    <>
      {/* 1. Messenger-Style Draggable Bubble (Refined 48px) */}
      <motion.div
        ref={bubbleContainerRef}
        style={{
          x: springX,
          y: springY,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          touchAction: "none",
        }}
        drag
        dragMomentum={false}
        onPointerDown={(e) => {
          startPointerPos.current = { x: e.clientX, y: e.clientY };
          hasDraggedRef.current = false;
        }}
        onDragStart={() => {
          setIsDraggingLocal(true);
        }}
        onDrag={(_, info) => {
          const dx = Math.abs(info.point.x - startPointerPos.current.x);
          const dy = Math.abs(info.point.y - startPointerPos.current.y);
          if (Math.hypot(dx, dy) > DRAG_THRESHOLD) {
            hasDraggedRef.current = true;
          }

          if (typeof window !== "undefined") {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const distFromDismiss = Math.hypot(
              info.point.x - screenW / 2,
              info.point.y - (screenH - 60)
            );
            setIsOverDismiss(distFromDismiss < 60);
          }
        }}
        onDragEnd={() => {
          setIsDraggingLocal(false);

          if (isOverDismiss) {
            setIsDismissed(true);
            setIsOverDismiss(false);
            useNotificationStore.getState().addToast({
              type: "info",
              title: "Đã tạm ẩn trợ lý XP Mentor",
              message: "Bạn có thể nhấn phím Ctrl + / (hoặc Cmd + /) để mở lại bất kỳ lúc nào.",
              duration: 4000,
            });
            return;
          }

          handleSnapToEdge();
        }}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        {/* Proactive Nudge Tooltip */}
        {!isOpen && !isDraggingLocal && <ProactiveNudgeBubble />}

        {/* The Chat Head Bubble with Accessibility */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Mở trợ lý học tập XP Mentor (Phím tắt: Ctrl + /)"
          aria-expanded={isOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleOpen();
            }
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            if (!hasDraggedRef.current) {
              toggleOpen();
            }
          }}
          className={`relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all cursor-pointer outline-none focus-visible:ring-3 focus-visible:ring-blue-500 ${
            isOpen
              ? "bg-[#0059bb] text-white ring-3 ring-blue-400/40 shadow-blue-500/25"
              : "bg-gradient-to-tr from-[#0059bb] to-[#004ba0] text-white ring-1 ring-white/30 dark:ring-slate-700 shadow-blue-600/20"
          }`}
          title="XP Mentor (Ctrl + /)"
        >
          {/* Bot Icon */}
          <Bot className="w-5 h-5 stroke-[1.8]" />

          {/* Online Indicator Dot */}
          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />

          {/* Subtle Quest Counter Dot */}
          {questCount > 0 && !isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              {questCount}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* 2. Dismiss Drop Target Zone with Refined, Harmonious Palette */}
      <AnimatePresence>
        {isDraggingLocal && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isOverDismiss ? 1.12 : 1,
            }}
            exit={{ opacity: 0, y: 25, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99998] flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
                isOverDismiss
                  ? "bg-rose-500 text-white ring-4 ring-rose-500/25 shadow-rose-500/30 scale-105"
                  : "bg-white/95 dark:bg-slate-800/95 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-slate-900/10 backdrop-blur-xl"
              }`}
            >
              <X className="w-5 h-5 stroke-[2]" />
            </div>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs transition-colors duration-200 ${
                isOverDismiss
                  ? "bg-rose-500 text-white shadow-rose-500/20"
                  : "bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
              }`}
            >
              {isOverDismiss ? "Thả để ẩn" : "Kéo vào đây để ẩn"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Compact & Sleek Chatbot Window with Safe Viewport Dimensions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "max(72px, calc(env(safe-area-inset-bottom, 0px) + 72px))",
              right: bubblePosition.side === "right" ? PADDING : "auto",
              left: bubblePosition.side === "left" ? PADDING : "auto",
              zIndex: 99999,
              height: "min(520px, calc(100dvh - 120px))",
            }}
            className="w-[94vw] sm:w-[380px] max-w-[calc(100vw-24px)] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/15 border border-slate-200/90 dark:border-slate-800 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Minimalist Agency Header */}
            <ChatbotHeader />

            {/* Conversational Stream */}
            <div className="flex-1 overflow-hidden">
              <SmartChatConversation />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
