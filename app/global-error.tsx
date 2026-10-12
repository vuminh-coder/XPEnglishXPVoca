"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError =
    error?.message?.includes("ChunkLoadError") ||
    error?.message?.includes("Loading chunk") ||
    error?.message?.includes("Failed to fetch dynamically imported module");

  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-100 antialiased">
        <main className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/50 dark:border-amber-800/40 mx-auto flex items-center justify-center text-3xl shadow-sm">
            ⚡
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isChunkError ? "Cập Nhật Phiên Bản Ứng Dụng" : "Đã Xảy Ra Sự Cố Tải Trang"}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isChunkError
                ? "Tài nguyên hoặc phiên bản ứng dụng vừa được đồng bộ lại. Vui lòng nhấn nút bên dưới để tải lại trang."
                : "Ứng dụng gặp gián đoạn tạm thời khi tải giao diện chính. Vui lòng bấm thử lại để tiếp tục học tập."}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="global-error-reload-btn"
              type="button"
              onClick={handleReload}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white font-semibold text-sm transition-all shadow-sm shadow-[#0059bb]/20 cursor-pointer active:scale-95"
            >
              Tải lại trang
            </button>
            <button
              id="global-error-reset-btn"
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
