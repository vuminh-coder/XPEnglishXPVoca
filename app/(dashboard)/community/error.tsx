"use client";
import React, { useEffect } from "react";
import { Button, Card } from "@/components/ui";
import { AlertCircle, RotateCcw, Users, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CommunityGroupError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Community routing error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center select-none animate-fade-in">
      <div className="p-2 bg-slate-100/40 dark:bg-neutral-950/40 border border-slate-200/25 dark:border-neutral-800/20 rounded-[2.5rem] max-w-md w-full">
        <Card variant="bezel" className="p-8 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2.5rem-0.5rem)] shadow-lg flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/30 flex items-center justify-center text-cyan-500 shadow-sm animate-bounce" style={{ animationDuration: "3s" }}>
            <Users className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">Không tải được Cộng đồng!</h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              Có lỗi xảy ra khi đồng bộ bài viết, danh sách nhóm học hoặc gợi ý bạn bè. Vui lòng kiểm tra lại.
            </p>
            {error.message && (
              <div className="text-[11px] font-mono p-2.5 bg-slate-50 dark:bg-neutral-950 rounded-xl text-slate-400 dark:text-neutral-500 max-h-24 overflow-y-auto break-all mt-3 border border-slate-100 dark:border-neutral-850">
                {error.message}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <Button
              onClick={() => reset()}
              variant="primary"
              className="flex-1 rounded-xl py-3 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tải lại</span>
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button
                variant="secondary"
                className="w-full rounded-xl py-3 font-black text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
              >
                <Home className="h-4 w-4" />
                <span>Trang chủ</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
