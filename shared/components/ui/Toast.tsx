"use client";
import React from "react";
import { useNotificationStore, type ToastType } from "@/stores/notificationStore";
import { CheckCircle2, Info, AlertCircle, XCircle, Zap, X } from "lucide-react";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: (
    <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs">
      <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  info: (
    <div className="w-7 h-7 rounded-xl bg-[#0059bb]/15 border border-[#0059bb]/25 flex items-center justify-center text-[#0059bb] dark:text-sky-300 shrink-0 shadow-2xs">
      <Info className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  warning: (
    <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
      <AlertCircle className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  error: (
    <div className="w-7 h-7 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 shadow-2xs">
      <XCircle className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  xp: (
    <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
      <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
    </div>
  ),
};

const cardStyleMap: Record<ToastType, string> = {
  success: "border-emerald-500/30 bg-gradient-to-r from-emerald-50/90 via-white to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 shadow-emerald-500/10",
  info: "border-[#0059bb]/30 bg-gradient-to-r from-blue-50/90 via-white to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 shadow-blue-500/10",
  warning: "border-amber-500/30 bg-gradient-to-r from-amber-50/90 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 shadow-amber-500/10",
  error: "border-rose-500/30 bg-gradient-to-r from-rose-50/90 via-white to-white dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 shadow-rose-500/10",
  xp: "border-amber-400/40 bg-gradient-to-r from-amber-50/90 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 shadow-amber-500/15",
};

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 sm:top-20 right-3 sm:right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-fade-in-down transition-all"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border p-3.5 sm:p-4 shadow-xl backdrop-blur-2xl transition-all relative overflow-hidden group ${cardStyleMap[toast.type]}`}
          >
            <div className="shrink-0">{iconMap[toast.type]}</div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-snug">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed font-medium">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              title="Đóng thông báo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
