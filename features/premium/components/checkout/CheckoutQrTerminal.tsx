"use client";

import React from "react";
import { QrCode, Clock, Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { PlanConfig } from "../../types";

export interface CheckoutQrTerminalProps {
  plan: PlanConfig;
  timeLeft: number;
  formatTimer: (seconds: number) => string;
  vietQrUrl: string;
  transferContent: string;
  copiedField: string | null;
  onCopy: (text: string, fieldName: string) => void;
  isVerifying: boolean;
  onConfirmTransfer: () => void;
}

export function CheckoutQrTerminal({
  plan,
  timeLeft,
  formatTimer,
  vietQrUrl,
  transferContent,
  copiedField,
  onCopy,
  isVerifying,
  onConfirmTransfer,
}: CheckoutQrTerminalProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
      {/* Method Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs border border-blue-200/60 dark:border-blue-800/40 shrink-0">
            <QrCode className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Cổng Quét Mã VietQR Napas 24/7
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Kích hoạt tự động ngay sau khi chuyển khoản thành công
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold border border-amber-200/60 dark:border-amber-900/40 shrink-0 shadow-2xs">
          <Clock className="w-3.5 h-3.5 animate-spin stroke-[2.2]" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* QR Code Display Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center shadow-2xs">
        <div className="p-3.5 rounded-2xl bg-white shadow-md border border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vietQrUrl}
            alt="Mã QR Chuyển Khoản VietQR Napas"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
          />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
          Mở App Ngân hàng bất kỳ hoặc Ví điện tử quét mã QR trên để nạp tự động
        </p>
      </div>

      {/* 4 Transfer Details (Click-to-Copy) */}
      <div className="space-y-2 text-xs font-medium">
        {/* Bank */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Ngân hàng thụ hưởng
            </div>
            <div className="font-bold text-slate-900 dark:text-white mt-0.5">
              MB Bank (Ngân Hàng Quân Đội)
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCopy("MB Bank", "Tên ngân hàng")}
            className="px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1"
          >
            <Copy className="w-3 h-3 stroke-[2.2]" />
            <span>Sao chép</span>
          </button>
        </div>

        {/* Account Number */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Số tài khoản nhận
            </div>
            <div className="font-bold text-slate-900 dark:text-white font-mono text-sm mt-0.5">
              0386766688
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCopy("0386766688", "Số tài khoản")}
            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
              copiedField === "Số tài khoản"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 hover:bg-blue-100"
            }`}
          >
            {copiedField === "Số tài khoản" ? "Đã chép ✓" : "Sao chép"}
          </button>
        </div>

        {/* Amount */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Số tiền chuyển khoản
            </div>
            <div className="font-bold text-[#0059bb] dark:text-sky-400 font-mono text-sm mt-0.5">
              {plan.totalPriceFormatted}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCopy(String(plan.totalPriceNum), "Số tiền")}
            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
              copiedField === "Số tiền"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 hover:bg-blue-100"
            }`}
          >
            {copiedField === "Số tiền" ? "Đã chép ✓" : "Sao chép"}
          </button>
        </div>

        {/* Note / Transfer Content */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Nội dung chuyển khoản (Bắt buộc)
            </div>
            <div className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm mt-0.5">
              {transferContent}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCopy(transferContent, "Nội dung chuyển khoản")}
            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
              copiedField === "Nội dung chuyển khoản"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 hover:bg-amber-200"
            }`}
          >
            {copiedField === "Nội dung chuyển khoản" ? "Đã chép ✓" : "Sao chép"}
          </button>
        </div>
      </div>

      {/* Confirmation Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onConfirmTransfer}
          disabled={isVerifying}
          className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin stroke-[2.2]" />
              <span>Đang kiểm tra giao dịch từ hệ thống ngân hàng...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
              <span>Xác Nhận Tôi Đã Chuyển Khoản Xong</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
