"use client";
import React from "react";

export interface ChatInterfaceProps {
  onSendMessage?: (text: string) => void;
  isLoading?: boolean;
}

export default function ChatInterface({ onSendMessage, isLoading }: ChatInterfaceProps) {
  return (
    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
        Trình mô phỏng giao tiếp AI thời gian thực
      </p>
    </div>
  );
}