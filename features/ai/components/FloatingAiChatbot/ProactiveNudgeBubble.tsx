"use client";
import React from "react";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProactiveNudgeBubble() {
  const { nudge, dismissNudge, setIsOpen, sendMessage, isOpen } = useAiChatbotStore();

  if (!nudge || isOpen) return null;

  const handleClick = () => {
    setIsOpen(true);
    if (nudge.actionPrompt) {
      sendMessage(nudge.actionPrompt);
    } else if (nudge.actionPath) {
      window.location.href = nudge.actionPath;
    }
    dismissNudge();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute bottom-16 right-0 w-64 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 space-y-2 z-50 pointer-events-auto"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>AI Mentor Gợi Ý</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismissNudge();
            }}
            className="w-4 h-4 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng gợi ý"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          {nudge.text}
        </p>

        {nudge.actionText && (
          <button
            type="button"
            onClick={handleClick}
            className="w-full h-7 px-2.5 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-xs"
          >
            <span>{nudge.actionText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
