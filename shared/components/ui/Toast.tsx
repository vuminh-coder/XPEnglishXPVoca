"use client";
import React from "react";
import { useNotificationStore, type ToastType } from "@/stores/notificationStore";
import {
  Sparkles,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Zap,
  X,
  RotateCcw,
  RotateCw,
  Bookmark,
  Shuffle,
  Copy,
  Flag,
  MicOff,
  Bell,
  Headphones,
} from "lucide-react";

const cardStyleMap: Record<ToastType, string> = {
  success:
    "border-emerald-200/90 dark:border-emerald-800/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(16,185,129,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-emerald-500/15",
  info:
    "border-blue-200/90 dark:border-blue-900/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(0,89,187,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-blue-500/15",
  warning:
    "border-amber-200/90 dark:border-amber-800/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(245,158,11,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-amber-500/15",
  error:
    "border-rose-200/90 dark:border-rose-800/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(244,63,94,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-rose-500/15",
  xp:
    "border-amber-300/90 dark:border-amber-700/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(245,158,11,0.22)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-amber-400/25",
};

function getToastVisual(toast: { type: ToastType; title: string; message?: string }) {
  const lowerTitle = (toast.title || "").toLowerCase();
  const lowerMsg = (toast.message || "").toLowerCase();
  const combined = `${lowerTitle} ${lowerMsg}`;

  // 1. Context: Đã đạt / Hoàn thành bài / Xuất sắc
  if (
    combined.includes("đã đạt") ||
    combined.includes("hoàn thành") ||
    combined.includes("xuất sắc") ||
    combined.includes("chúc mừng")
  ) {
    return {
      bg: "bg-emerald-600 text-white shadow-xs",
      icon: <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 2. Context: Chưa đạt / Luyện lại / Thử lại
  if (
    combined.includes("chưa đạt") ||
    combined.includes("thử lại") ||
    combined.includes("luyện lại")
  ) {
    return {
      bg: "bg-rose-600 text-white shadow-xs",
      icon: <RotateCcw className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 3. Context: Tua lùi
  if (combined.includes("tua lùi") || combined.includes("lùi 5s")) {
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <RotateCcw className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 4. Context: Tua nhanh
  if (combined.includes("tua nhanh") || combined.includes("tiến 5s")) {
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <RotateCw className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 5. Context: Sổ tay / Lưu câu / Bookmark
  if (combined.includes("sổ tay") || combined.includes("lưu câu") || combined.includes("bookmark")) {
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <Bookmark className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 6. Context: Đổi bài ngẫu nhiên / Shuffle
  if (combined.includes("ngẫu nhiên") || combined.includes("đổi bài") || combined.includes("shuffle")) {
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <Shuffle className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 7. Context: Báo cáo câu / Flag
  if (combined.includes("báo cáo") || combined.includes("report")) {
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <Flag className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 8. Context: Copy / Clipboard
  if (combined.includes("copy") || combined.includes("sao chép") || combined.includes("clipboard")) {
    return {
      bg: "bg-emerald-600 text-white shadow-xs",
      icon: <Copy className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 9. Context: Micro / Ghi âm
  if (combined.includes("micro") || combined.includes("ghi âm") || combined.includes("thu âm")) {
    if (toast.type === "error" || toast.type === "warning") {
      return {
        bg: "bg-rose-600 text-white shadow-xs",
        icon: <MicOff className="w-4.5 h-4.5 stroke-[2.2]" />,
      };
    }
    return {
      bg: "bg-[#0059bb] text-white shadow-xs",
      icon: <Headphones className="w-4.5 h-4.5 stroke-[2.2]" />,
    };
  }

  // 10. Fallback theo ToastType chuẩn Design Tokens 60-30-10
  switch (toast.type) {
    case "success":
      return {
        bg: "bg-emerald-600 text-white shadow-xs",
        icon: <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />,
      };
    case "warning":
      return {
        bg: "bg-amber-500 text-white shadow-xs",
        icon: <AlertTriangle className="w-4.5 h-4.5 stroke-[2.2]" />,
      };
    case "error":
      return {
        bg: "bg-rose-600 text-white shadow-xs",
        icon: <XCircle className="w-4.5 h-4.5 stroke-[2.2]" />,
      };
    case "xp":
      return {
        bg: "bg-amber-500 text-white shadow-xs",
        icon: <Zap className="w-4.5 h-4.5 fill-white text-white" />,
      };
    case "info":
    default:
      return {
        bg: "bg-[#0059bb] text-white shadow-xs",
        icon: <Bell className="w-4.5 h-4.5 stroke-[2.2]" />,
      };
  }
}

function getToastCardStyle(toast: { type: ToastType; title: string }) {
  if (/^CHƯA ĐẠT\b/i.test(toast.title.replace(/[🎉⚠️↺🔖📌✨⭐🔥👍👏❌✅💡]/gu, "").trim())) {
    return "border-rose-200/90 dark:border-rose-800/60 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_36px_-6px_rgba(244,63,94,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] ring-1 ring-rose-500/15";
  }
  return cardStyleMap[toast.type];
}

function cleanEmoji(text: string): string {
  return text.replace(/[🎉⚠️↺🔖📌✨⭐🔥👍👏❌✅💡]/gu, "").trim();
}

function renderToastTitle(title: string) {
  const cleaned = cleanEmoji(title);

  if (/^(?:ĐÃ ĐẠT|Đã đạt)\b/i.test(cleaned)) {
    const cleanRemainder = cleaned
      .replace(/^(?:ĐÃ ĐẠT|Đã đạt)\s*(?:[-–:]\s*)?/i, "")
      .trim();
    return (
      <span className="inline-flex items-center gap-1.5 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11.5px] font-sans shadow-xs tracking-tight">
          ĐÃ ĐẠT
        </span>
        {cleanRemainder && (
          <span className="text-slate-900 dark:text-white font-bold font-sans">
            {cleanRemainder}
          </span>
        )}
      </span>
    );
  }

  if (/^(?:CHƯA ĐẠT|Chưa đạt)\b/i.test(cleaned)) {
    const cleanRemainder = cleaned
      .replace(/^(?:CHƯA ĐẠT|Chưa đạt)\s*(?:[-–:]\s*)?/i, "")
      .trim();
    return (
      <span className="inline-flex items-center gap-1.5 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[11.5px] font-sans shadow-xs tracking-tight">
          CHƯA ĐẠT
        </span>
        {cleanRemainder && (
          <span className="text-slate-900 dark:text-white font-bold font-sans">
            {cleanRemainder}
          </span>
        )}
      </span>
    );
  }

  if (/^HOÀN THÀNH\b/i.test(cleaned)) {
    const cleanRemainder = cleaned.replace(/^HOÀN THÀNH\s*(?:BÀI\s*)?/i, "").trim();
    return (
      <span className="inline-flex items-center gap-1.5 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11.5px] font-sans shadow-xs tracking-tight">
          HOÀN THÀNH
        </span>
        {cleanRemainder && (
          <span className="text-slate-900 dark:text-white font-bold font-sans">
            {cleanRemainder}
          </span>
        )}
      </span>
    );
  }

  return <span>{cleaned || title}</span>;
}

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 sm:top-20 right-3 sm:right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast, index) => {
        const visual = getToastVisual(toast);
        const cardStyle = getToastCardStyle(toast);

        return (
          <div
            key={toast.id}
            className="pointer-events-auto animate-fade-in-down transition-all"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div
              className={`flex items-start gap-3 rounded-2xl border p-3.5 sm:p-4 shadow-xl backdrop-blur-2xl transition-all relative overflow-hidden group ${cardStyle}`}
            >
              <div className="shrink-0 pt-0.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${visual.bg}`}
                >
                  {visual.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-[13.5px] sm:text-sm font-bold font-sans tracking-tight text-slate-900 dark:text-white leading-snug">
                  {renderToastTitle(toast.title)}
                </h4>
                {toast.message && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-normal font-sans">
                    {cleanEmoji(toast.message)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-center cursor-pointer shrink-0 -mr-1 -mt-0.5"
                title="Đóng thông báo"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
