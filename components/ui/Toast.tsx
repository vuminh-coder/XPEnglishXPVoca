"use client";
import React from "react";
import { useNotificationStore, type ToastType } from "@/lib/store/notificationStore";
import { CheckCircle, Info, AlertTriangle, XCircle, Zap, X } from "lucide-react";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  info: <Info className="h-5 w-5 text-sky-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  error: <XCircle className="h-5 w-5 text-rose-500" />,
  xp: <Zap className="h-5 w-5 text-yellow-500" />,
};

const bgMap: Record<ToastType, string> = {
  success: "border-emerald-200/50 dark:border-emerald-800/30 bg-emerald-50/90 dark:bg-emerald-950/40",
  info: "border-sky-200/50 dark:border-sky-800/30 bg-sky-50/90 dark:bg-sky-950/40",
  warning: "border-amber-200/50 dark:border-amber-800/30 bg-amber-50/90 dark:bg-amber-950/40",
  error: "border-rose-200/50 dark:border-rose-800/30 bg-rose-50/90 dark:bg-rose-950/40",
  xp: "border-yellow-200/50 dark:border-yellow-800/30 bg-yellow-50/90 dark:bg-yellow-950/40",
};

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-fade-in-down"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-xl transition-all ${bgMap[toast.type]}`}
          >
            <div className="shrink-0 mt-0.5">{iconMap[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-black text-slate-900 dark:text-white">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
