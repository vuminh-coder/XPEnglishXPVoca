"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, X, Flame, Bot } from "lucide-react";
import ChatbotHeader from "./ChatbotHeader";
import ChatMentorTab from "./tabs/ChatMentorTab";
import RoadmapMentorTab from "./tabs/RoadmapMentorTab";
import SmartSuggestionsTab from "./tabs/SmartSuggestionsTab";
import ProactiveNudgeBubble from "./ProactiveNudgeBubble";

export default function FloatingAiChatbot() {
  const {
    isOpen,
    setIsOpen,
    toggleOpen,
    activeTab,
    isMinimized,
    bubblePosition,
    setBubblePosition,
    isDismissed,
    setIsDismissed,
    isDragging,
    setIsDragging,
    initPositionFromStorage,
    setNudge,
  } = useAiChatbotStore();

  const [mounted, setMounted] = useState(false);
  const [isOverDismissZone, setIsOverDismissZone] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Motion values for smooth position
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 350, damping: 28 });
  const springY = useSpring(motionY, { stiffness: 350, damping: 28 });

  // 1. Initialize position on mount
  useEffect(() => {
    setMounted(true);
    initPositionFromStorage();

    if (typeof window !== "undefined") {
      const defaultX = window.innerWidth - 72;
      const defaultY = window.innerHeight - 100;
      motionX.set(bubblePosition.x || defaultX);
      motionY.set(bubblePosition.y || defaultY);
    }

    // Trigger an initial study nudge after 4s
    const timer = setTimeout(() => {
      setNudge({
        id: "daily_quest_nudge",
        text: "Bạn có 3 nhiệm vụ lộ trình hôm nay! Hoàn thành sớm để duy trì Streak nhé 🔥",
        actionText: "Xem Lộ Trình ➔",
        actionTab: "roadmap",
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [initPositionFromStorage, setNudge]);

  // 2. Global hotkey listener (Cmd+K / Ctrl+/ to open, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "/")) {
        e.preventDefault();
        toggleOpen();
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, toggleOpen]);

  // Handle drag mechanics (Messenger Snap-to-Edge)
  const handleDragStart = (_: any, info: any) => {
    setIsDragging(true);
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDrag = (_: any, info: any) => {
    if (typeof window === "undefined") return;

    // Check if near bottom center dismiss zone (X)
    const dismissTargetX = window.innerWidth / 2;
    const dismissTargetY = window.innerHeight - 50;
    const distToDismiss = Math.hypot(
      info.point.x - dismissTargetX,
      info.point.y - dismissTargetY
    );

    setIsOverDismissZone(distToDismiss < 65);
  };

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);

    if (typeof window === "undefined") return;

    // Check if dismissed
    const dismissTargetX = window.innerWidth / 2;
    const dismissTargetY = window.innerHeight - 50;
    const distToDismiss = Math.hypot(
      info.point.x - dismissTargetX,
      info.point.y - dismissTargetY
    );

    if (distToDismiss < 65) {
      setIsDismissed(true);
      setIsOverDismissZone(false);
      return;
    }

    setIsOverDismissZone(false);

    // Calculate drag distance
    const distMoved = Math.hypot(
      info.point.x - dragStartPos.current.x,
      info.point.y - dragStartPos.current.y
    );

    // If practically didn't move (< 6px), treat as CLICK
    if (distMoved < 6) {
      toggleOpen();
      return;
    }

    // Snap to nearest horizontal edge (Messenger physics)
    const bubbleSize = 56;
    const margin = 16;
    const currentX = info.point.x;
    const currentY = info.point.y;

    const isLeft = currentX < window.innerWidth / 2;
    const targetX = isLeft ? margin : window.innerWidth - bubbleSize - margin;

    // Constrain Y within viewport
    const minY = 70; // below top header
    const maxY = window.innerHeight - bubbleSize - 30;
    const targetY = Math.max(minY, Math.min(maxY, currentY - bubbleSize / 2));

    // Animate smoothly to snapped position
    motionX.set(targetX);
    motionY.set(targetY);

    setBubblePosition({
      x: targetX,
      y: targetY,
      side: isLeft ? "left" : "right",
    });
  };

  if (!mounted || isDismissed) return null;

  return (
    <>
      {/* 1. DISMISS DROP ZONE (Appears at bottom center only while dragging) */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl ${
                isOverDismissZone
                  ? "bg-rose-600 text-white scale-125 shadow-rose-600/40 ring-4 ring-rose-400/40"
                  : "bg-slate-900/90 text-white/80 border border-white/20 backdrop-blur-md"
              }`}
            >
              <X className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-full backdrop-blur-md">
              Kéo vào đây để ẩn
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DRAGGABLE CHAT HEAD BUBBLE (Messenger Style) */}
      {!isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x: springX, y: springY }}
          className="fixed top-0 left-0 z-40 cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* Proactive Nudge Tooltip */}
          <ProactiveNudgeBubble />

          {/* Messenger Bubble Trigger Button */}
          <div className="relative group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0059bb] via-[#2563eb] to-[#8b5cf6] p-0.5 shadow-xl shadow-[#0059bb]/30 group-hover:shadow-2xl group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-slate-900/20 backdrop-blur-xs flex items-center justify-center text-white relative overflow-hidden">
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Bot className="w-7 h-7 drop-shadow-md" />
              </div>
            </div>

            {/* Notification Quest Badge (3 daily quests) */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm font-mono">
              3
            </span>

            {/* Online Pulse Dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </div>
        </motion.div>
      )}

      {/* 3. EXPANDED CHAT DRAWER WINDOW (Desktop Docked or Mobile Bottom Sheet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={`fixed z-50 ${
              // Mobile: Full width bottom sheet
              "inset-x-0 bottom-0 sm:inset-auto " +
              // Desktop: Floating Glassmorphism card docked
              (bubblePosition.side === "left"
                ? "sm:left-6 sm:bottom-6"
                : "sm:right-6 sm:bottom-6")
            }`}
          >
            <div
              className={`w-full sm:w-[430px] rounded-t-3xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
                isMinimized ? "h-16" : "h-[85vh] sm:h-[630px] sm:max-h-[85vh]"
              }`}
            >
              {/* Header with 3 Tabs */}
              <ChatbotHeader />

              {/* Body Content based on Active Tab */}
              {!isMinimized && (
                <div className="flex-1 flex flex-col min-h-0">
                  {activeTab === "chat" && <ChatMentorTab />}
                  {activeTab === "roadmap" && <RoadmapMentorTab />}
                  {activeTab === "suggestions" && <SmartSuggestionsTab />}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
