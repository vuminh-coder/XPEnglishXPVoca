"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import ChatbotHeader from "./ChatbotHeader";
import SmartChatConversation from "./SmartChatConversation";
import ProactiveNudgeBubble from "./ProactiveNudgeBubble";
import { Bot, Sparkles, X } from "lucide-react";

const BUBBLE_SIZE = 56;
const PADDING = 16;
const DRAG_THRESHOLD = 5;

export default function FloatingAiChatbot() {
  const {
    isOpen,
    toggleOpen,
    setIsOpen,
    isMinimized,
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

  const startPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Motion values for lag-free 60fps drag & snap
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 380, damping: 26 });
  const springY = useSpring(motionY, { stiffness: 380, damping: 26 });

  useEffect(() => {
    setMounted(true);
    initPositionFromStorage();
  }, [initPositionFromStorage]);

  // Set initial position once mounted
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let initX = bubblePosition.x;
    let initY = bubblePosition.y;

    if (initX === 0 && initY === 0) {
      initX = screenW - BUBBLE_SIZE - PADDING;
      initY = screenH - BUBBLE_SIZE - 90; // Above mobile bottom bar
    } else {
      initX = Math.max(PADDING, Math.min(initX, screenW - BUBBLE_SIZE - PADDING));
      initY = Math.max(PADDING, Math.min(initY, screenH - BUBBLE_SIZE - PADDING));
    }

    motionX.set(initX);
    motionY.set(initY);
  }, [mounted, motionX, motionY]);

  // Snap to edge handler
  const handleSnapToEdge = () => {
    if (typeof window === "undefined") return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const currentX = motionX.get();
    const currentY = motionY.get();

    // Clamp Y within bounds
    const boundedY = Math.max(PADDING + 40, Math.min(currentY, screenH - BUBBLE_SIZE - PADDING - 40));

    // Snap to left or right edge
    const midX = (screenW - BUBBLE_SIZE) / 2;
    const snapToRight = currentX >= midX;
    const targetX = snapToRight ? screenW - BUBBLE_SIZE - PADDING : PADDING;

    motionX.set(targetX);
    motionY.set(boundedY);

    setBubblePosition({
      x: targetX,
      y: boundedY,
      side: snapToRight ? "right" : "left",
    });
  };

  if (!mounted || isDismissed) return null;

  const questCount = dbData?.dailyQuests?.filter((q) => !q.isCompleted).length ?? 3;

  return (
    <>
      {/* 1. Messenger-Style Draggable Bubble */}
      <motion.div
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

          // Check if hovering over dismiss zone
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
            return;
          }

          handleSnapToEdge();
        }}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        {/* Proactive Nudge Cloud */}
        {!isOpen && !isDraggingLocal && <ProactiveNudgeBubble />}

        {/* The Chat Head Bubble */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            if (!hasDraggedRef.current) {
              toggleOpen();
            }
          }}
          className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
            isOpen
              ? "bg-[#0059bb] text-white ring-4 ring-blue-400/30"
              : "bg-gradient-to-tr from-[#0059bb] via-[#004ba0] to-indigo-600 text-white ring-2 ring-white/60 dark:ring-slate-800"
          }`}
          title="XP AI Mentor - Nhấn để trò chuyện"
        >
          {/* Animated Glow Halo */}
          <span className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping pointer-events-none opacity-40" />

          {/* AI Bot Icon */}
          <Bot className="w-7 h-7 drop-shadow-sm" />

          {/* Online Indicator Dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-pulse shadow-xs" />

          {/* Quest Counter Pill */}
          {questCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] bg-amber-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              {questCount}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* 2. Dismiss Target Drop Zone (Appears at bottom center when dragging) */}
      <AnimatePresence>
        {isDraggingLocal && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isOverDismiss ? 1.25 : 1,
            }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99998] flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
                isOverDismiss
                  ? "bg-rose-600 text-white ring-4 ring-rose-400/50 scale-110"
                  : "bg-slate-900/80 backdrop-blur-md text-white/80 border border-white/20"
              }`}
            >
              <X className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 shadow-sm">
              {isOverDismiss ? "Thả ra để ẩn" : "Kéo vào đây để ẩn"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Unified Conversational Chat Drawer (No Tabs) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "auto" : 580,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              position: "fixed",
              bottom: 84,
              right: bubblePosition.side === "right" ? PADDING : "auto",
              left: bubblePosition.side === "left" ? PADDING : "auto",
              zIndex: 99999,
            }}
            className="w-[94vw] sm:w-[420px] max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Unified Clean Header */}
            <ChatbotHeader />

            {/* Main Conversational Stream */}
            {!isMinimized && (
              <div className="flex-1 overflow-hidden">
                <SmartChatConversation />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
