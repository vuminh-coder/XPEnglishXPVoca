"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { PlanConfig } from "../../types";

export interface CheckoutSuccessReceiptProps {
  plan: PlanConfig;
}

export function CheckoutSuccessReceipt({ plan }: CheckoutSuccessReceiptProps) {
  const invoiceId = useMemo(() => {
    return `INV-XP-${Date.now().toString().slice(-6)}`;
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl text-center space-y-5">
      <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
      </div>

      <div className="space-y-2">
        <Badge variant="success" size="sm">Giao Dịch Hoàn Tất</Badge>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Kích Hoạt Hội Viên {plan.name} Thành Công!
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
          Chúc mừng bạn đã sở hữu đặc quyền VIP của XP English. Toàn bộ kho 37+ đề thi và gia sư AI đã sẵn sàng phục vụ bạn 24/7!
        </p>
      </div>

      {/* Electronic Receipt Summary */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-left text-xs space-y-2.5 font-medium shadow-2xs">
        <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
          <span className="text-slate-400">Mã hóa đơn điện tử:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {invoiceId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Gói đăng ký:</span>
          <span className="font-bold text-[#0059bb] dark:text-sky-400">{plan.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Số tiền thanh toán:</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 font-display text-sm">
            {plan.totalPriceFormatted}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Trạng thái:</span>
          <span className="font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 stroke-[2.2]" /> Đã kích hoạt hoàn tất
          </span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/dashboard"
          className="py-2.5 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
        >
          <span>Bắt Đầu Luyện Tập Ngay</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </Link>
        <Link
          href="/profile"
          className="py-2.5 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all"
        >
          <span>Xem Hồ Sơ & Đặc Quyền VIP</span>
        </Link>
      </div>
    </div>
  );
}
