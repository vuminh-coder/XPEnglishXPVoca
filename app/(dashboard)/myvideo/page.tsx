"use client";
import React from "react";
import Link from "next/link";
import { Star, Video, Play, ArrowLeft } from "lucide-react";
import { Button, DoubleBezelCard } from "@/components/ui";

export default function MyVideoPage() {
  return (
    <div className="space-y-6 pb-24 md:pb-8 select-none">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="rounded-xl p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Video của tôi ⭐
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Danh sách video luyện nghe và ghi nhớ từ vựng đã lưu.
          </p>
        </div>
      </div>

      <DoubleBezelCard outerClassName="p-2 rounded-3xl max-w-2xl mx-auto" innerClassName="p-8 text-center space-y-4 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-neutral-900">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center text-3xl mx-auto shadow-xs">
          ⭐
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h2 className="text-lg font-black text-slate-900 dark:text-white font-display">
            Chưa có video nào được lưu
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            Nội dung kho video cá nhân đang được nâng cấp. Bạn có thể khám phá các bài học nghe Dictation & Shadowing ngay hôm nay!
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link href="/study/listening">
            <Button variant="primary" className="px-5 py-2.5 rounded-full text-xs font-black bg-blue-600 text-white shadow-md">
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Khám phá Dictation
            </Button>
          </Link>
        </div>
      </DoubleBezelCard>
    </div>
  );
}
