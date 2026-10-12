"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[XP English ErrorBoundary]:", error);
  }, [error]);

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
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-lg shadow-slate-200/40 dark:shadow-none space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/50 dark:border-amber-800/40 mx-auto flex items-center justify-center text-2xl shadow-sm">
          ⚡
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {isChunkError ? "Đang Đồng Bộ Lại Giao Diện" : "Đã Xảy Ra Lỗi Tải Trang"}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {isChunkError
              ? "Tài nguyên phiên bản mới đang được cập nhật. Vui lòng bấm làm mới trang để tiếp tục."
              : error?.message || "Đã xảy ra sự cố không mong muốn trong quá trình xử lý dữ liệu."}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="error-boundary-reload-btn"
            type="button"
            onClick={handleReload}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white transition-all shadow-sm shadow-[#0059bb]/20 cursor-pointer active:scale-95"
          >
            Tải lại trang
          </button>
          <button
            id="error-boundary-reset-btn"
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}
