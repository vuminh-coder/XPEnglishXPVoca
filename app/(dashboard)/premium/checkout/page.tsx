"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Crown, Sparkles } from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  PageEntranceWrapper,
  MotionItem,
} from "@/shared/components/feedback/PageEntranceAnimation";
import {
  useCheckoutPayment,
  CheckoutOrderSummary,
  CheckoutQrTerminal,
  CheckoutSuccessReceipt,
} from "@/features/premium";

function CheckoutContent() {
  const {
    selectedKey,
    setSelectedKey,
    plan,
    timeLeft,
    formatTimer,
    transferContent,
    vietQrUrl,
    copiedField,
    handleCopy,
    isVerifying,
    isSuccess,
    handleConfirmTransfer,
  } = useCheckoutPayment();

  return (
    <div
      className="min-h-screen bg-slate-50/60 dark:bg-slate-950 space-y-6 pb-28 font-sans antialiased text-slate-800 dark:text-slate-200"
      suppressHydrationWarning
    >
      {/* ─── 1. TOP HEADER (56px Baseline with Standard Gamification Stats) ─── */}
      <AppTopHeader
        showGamificationStats={true}
        leftContent={
          <Link
            href="/premium"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Quay lại gói cước</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Thanh toán VIP Pro"
            icon={<Crown className="w-4 h-4 text-amber-500 stroke-[2.2]" />}
            active
          />
          <HeaderPillItem
            label="Bảng gói cước"
            icon={<Sparkles className="w-4 h-4 text-slate-500 stroke-[2.2]" />}
            href="/premium"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── 2. MAIN ENTRANCE WRAPPER (Fluid Max 1760px Canvas matching Dashboard) ─── */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-6">
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link
            href="/dashboard"
            className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            href="/premium"
            className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Nâng cấp Premium
          </Link>
          <span>/</span>
          <span className="text-[#0059bb] dark:text-sky-400 font-bold">
            Thanh toán VietQR Napas
          </span>
        </div>

        {isSuccess ? (
          /* ─── SUCCESS INVOICE & RECEIPT VIEW ─── */
          <MotionItem>
            <CheckoutSuccessReceipt plan={plan} />
          </MotionItem>
        ) : (
          /* ─── FINTECH SPLIT VIEW (5/12 & 7/12) ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* ─── LEFT COLUMN (5/12): ORDER SUMMARY & GIFTS ─── */}
            <div className="lg:col-span-5">
              <MotionItem>
                <CheckoutOrderSummary
                  selectedKey={selectedKey}
                  onSelectPlan={setSelectedKey}
                  plan={plan}
                />
              </MotionItem>
            </div>

            {/* ─── RIGHT COLUMN (7/12): SMART PAYMENT TERMINAL ─── */}
            <div className="lg:col-span-7">
              <MotionItem>
                <CheckoutQrTerminal
                  plan={plan}
                  timeLeft={timeLeft}
                  formatTimer={formatTimer}
                  vietQrUrl={vietQrUrl}
                  transferContent={transferContent}
                  copiedField={copiedField}
                  onCopy={handleCopy}
                  isVerifying={isVerifying}
                  onConfirmTransfer={handleConfirmTransfer}
                />
              </MotionItem>
            </div>
          </div>
        )}
      </PageEntranceWrapper>
    </div>
  );
}

export default function PremiumCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-400 font-medium">
          Đang tải cổng thanh toán bảo mật VietQR...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
