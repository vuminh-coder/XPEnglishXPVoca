"use client";
import React, { useEffect } from "react";
import { Button, Card } from "@/components/ui";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StudyGroupError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Study module routing error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center select-none animate-fade-in">
      <div className="p-2 bg-slate-100/40 dark:bg-neutral-950/40 border border-slate-200/25 dark:border-neutral-800/20 rounded-[2.5rem] max-w-md w-full">
        <Card variant="bezel" className="p-8 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2.5rem-0.5rem)] shadow-lg flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-500 shadow-sm animate-bounce" style={{ animationDuration: "3s" }}>
            <AlertCircle className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">Không tải được học phần!</h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              Hệ thống không thể tải dữ liệu bài học hoặc bài thi. Có thể đường truyền internet không ổn định hoặc cơ sở dữ liệu quá tải.
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
              <span>Thử lại</span>
            </Button>
            <Link href="/study/practice" className="flex-1">
              <Button
                variant="secondary"
                className="w-full rounded-xl py-3 font-black text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
