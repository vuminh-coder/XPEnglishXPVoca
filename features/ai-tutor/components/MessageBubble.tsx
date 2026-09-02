"use client";
import React from "react";

export interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  score?: number;
}

export default function MessageBubble({ message, isUser, score }: MessageBubbleProps) {
  return (
    <div
      className={`p-3 rounded-xl text-xs sm:text-sm font-medium leading-relaxed max-w-sm shadow-2xs ${
        isUser
          ? "bg-gradient-to-r from-[#0059bb] to-blue-600 text-white self-end"
          : "bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white self-start"
      }`}
    >
      <p>{message}</p>
      {score !== undefined && (
        <span className="text-xs font-mono font-bold opacity-80 block mt-1">
          Điểm phát âm: {score}/100
        </span>
      )}
    </div>
  );
}