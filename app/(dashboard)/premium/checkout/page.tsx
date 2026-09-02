"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Crown,
  ShieldCheck,
  Zap,
  Check,
  Copy,
  QrCode,
  Clock,
  CheckCircle2,
  Gift,
  RefreshCw,
  ArrowRight,
  Coins,
  Flame,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Compass,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { Badge } from "@/shared/components/ui/Badge";

/* ─── TYPES & DATA ─── */
type PlanKey = "yearly" | "monthly" | "lifetime";

interface GiftItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}

interface PlanCheckoutInfo {
  key: PlanKey;
  name: string;
  badge: string;
  pricePerMonthFormatted: string;
  totalPriceNum: number;
  totalPriceFormatted: string;
  originalPriceFormatted?: string;
  savingsFormatted?: string;
  billingDuration: string;
  dailyCostNote: string;
  gifts: GiftItem[];
  features: string[];
}

const CHECKOUT_PLANS: Record<PlanKey, PlanCheckoutInfo> = {
  yearly: {
    key: "yearly",
    name: "Gói 1 Năm (Pro VIP Pass)",
    badge: "TIẾT KIỆM 45% • LỰA CHỌN PHỔ BIẾN NHẤT",
    pricePerMonthFormatted: "69.000 đ",
    totalPriceNum: 828000,
    totalPriceFormatted: "828.000 đ",
    originalPriceFormatted: "1.188.000 đ",
    savingsFormatted: "Tiết kiệm 360.000 đ (45%)",
    billingDuration: "12 tháng học + 3 tháng tặng kèm",
    dailyCostNote: "Chỉ ~2.300 đ / ngày",
    gifts: [
      { icon: Gift, text: "Tặng thêm 3 tháng học miễn phí toàn diện (Trị giá 297.000 đ)" },
      { icon: ShieldCheck, text: "Tặng 3 Khiên Kim Cương bảo vệ ngọn lửa Streak" },
      { icon: GraduationCap, text: "Trang bị Nón Cử Nhân Cú Vàng Avatar" },
    ],
    features: [
      "Mở khóa toàn bộ 100+ chủ đề từ vựng Oxford, TOEIC & IELTS",
      "Kho 37+ đề thi thử TOEIC & IELTS chuẩn format quốc tế",
      "Gia sư AI Speaking & Writing đối thoại 24/7",
      "Thuật toán SM-2 Spaced Repetition ghi nhớ vĩnh viễn",
      "Tự động kích hoạt khiên bảo vệ chuỗi học tập Streak vĩnh viễn",
      "Hệ số nhân đôi X2 XP mọi bài học & đấu trường PvP",
    ],
  },
  monthly: {
    key: "monthly",
    name: "Gói 1 Tháng (Linh Hoạt)",
    badge: "LINH HOẠT TỪNG THÁNG",
    pricePerMonthFormatted: "99.000 đ",
    totalPriceNum: 99000,
    totalPriceFormatted: "99.000 đ",
    billingDuration: "30 ngày học toàn diện",
    dailyCostNote: "Chỉ ~3.300 đ / ngày",
    gifts: [
      { icon: ShieldCheck, text: "Tặng 1 Khiên Bảo Hộ Lửa Streak" },
      { icon: Zap, text: "Tặng Thẻ Nhân Đôi XP 7 ngày" },
    ],
    features: [
      "Mở khóa toàn bộ tính năng Pro trong 30 ngày",
      "Luyện tập Gia sư AI Speaking & Writing không giới hạn",
      "Làm toàn bộ 37+ đề thi TOEIC/IELTS có giải thích",
      "Tự động bảo vệ chuỗi Streak trong tháng",
    ],
  },
  lifetime: {
    key: "lifetime",
    name: "Gói Trọn Đời (Master Lifetime)",
    badge: "ĐẶC QUYỀN 1 LẦN DUY NHẤT • TRỌN ĐỜI",
    pricePerMonthFormatted: "1.490.000 đ",
    totalPriceNum: 1490000,
    totalPriceFormatted: "1.490.000 đ",
    billingDuration: "Sở hữu vĩnh viễn trọn đời",
    dailyCostNote: "Đầu tư 1 lần duy nhất",
    gifts: [
      { icon: Crown, text: "Huy hiệu Vương Miện Vàng Golden Crown độc quyền" },
      { icon: ShieldCheck, text: "Bảo hộ Streak Vĩnh Viễn Không Bao Giờ Mất Chuỗi" },
      { icon: Zap, text: "Ưu tiên máy chủ AI tốc độ cao nhất (Ultra Low Latency)" },
      { icon: Compass, text: "1 buổi định hướng lộ trình học 1-on-1 cùng Mentor" },
    ],
    features: [
      "Toàn bộ quyền lợi của gói Pro VIP trọn đời vĩnh viễn",
      "Tự động nhận tất cả bộ đề TOEIC/IELTS cập nhật mới",
      "Truy cập sớm các tính năng AI thế hệ mới nhất",
      "Quyền truy cập phòng học VIP Master Class",
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  const initialPlanParam = searchParams.get("plan") as PlanKey;
  const [selectedKey, setSelectedKey] = useState<PlanKey>(
    initialPlanParam && CHECKOUT_PLANS[initialPlanParam] ? initialPlanParam : "yearly"
  );

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 15:00 countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const plan = CHECKOUT_PLANS[selectedKey];

  const transferContent = useMemo(() => {
    const userIdShort = user?.id ? user.id.slice(0, 8).toUpperCase() : "PROVIP";
    return `XP PRO ${userIdShort}`;
  }, [user]);

  const vietQrUrl = useMemo(() => {
    const bank = "MB";
    const acc = "0386766688";
    const name = encodeURIComponent("XP ENGLISH VIP");
    const desc = encodeURIComponent(transferContent);
    return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${plan.totalPriceNum}&addInfo=${desc}&accountName=${name}`;
  }, [plan.totalPriceNum, transferContent]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast({
      type: "success",
      title: "Đã sao chép!",
      message: `Đã sao chép ${fieldName} vào bộ nhớ tạm.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmTransfer = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      addToast({
        type: "success",
        title: "Kích hoạt Premium thành công!",
        message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
      });
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-28 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── 1. TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        leftContent={
          <Link
            href="/premium"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại gói cước</span>
          </Link>
        }
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <div className="h-9 px-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
              <Coins className="w-4 h-4 text-amber-500" strokeWidth={1.8} />
              <span>{user?.coins ?? 0} <span className="font-normal text-amber-600/80">Vàng</span></span>
            </div>
            <div className="h-9 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
              <Flame className="w-4 h-4 text-orange-500" strokeWidth={1.8} />
              <span>{user?.streakFreezes || 0} Khiên</span>
            </div>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Thanh toán VIP Pro"
            icon={<Crown className="w-4 h-4 text-amber-500" strokeWidth={1.8} />}
            active
          />
          <HeaderPillItem
            label="Bảng gói cước"
            icon={<Sparkles className="w-4 h-4 text-slate-500" strokeWidth={1.8} />}
            href="/premium"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-600 dark:hover:text-slate-200">Trang chủ</Link>
          <span>/</span>
          <Link href="/premium" className="hover:text-slate-600 dark:hover:text-slate-200">Nâng cấp Premium</Link>
          <span>/</span>
          <span className="text-[#0059bb] dark:text-sky-400 font-bold">Thanh toán VietQR Napas</span>
        </div>

        {isSuccess ? (
          /* ─── SUCCESS INVOICE & RECEIPT VIEW ─── */
          <MotionItem>
            <div className="max-w-2xl mx-auto p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div className="space-y-2">
                <Badge variant="success" size="sm">Giao Dịch Hoàn Tất</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                  Kích Hoạt Hội Viên {plan.name} Thành Công!
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-medium">
                  Chúc mừng bạn đã sở hữu đặc quyền VIP của XP English. Toàn bộ kho 37+ đề thi và gia sư AI đã sẵn sàng!
                </p>
              </div>

              {/* Electronic Receipt Summary */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-left text-xs space-y-2.5 font-medium">
                <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                  <span className="text-slate-400">Mã hóa đơn:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">INV-XP-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gói đăng ký:</span>
                  <span className="font-bold text-[#0059bb] dark:text-sky-400">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Số tiền thanh toán:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-display text-sm">{plan.totalPriceFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} /> Đã kích hoạt vĩnh viễn
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/dashboard"
                  className="py-3 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Bắt Đầu Luyện Tập Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/profile"
                  className="py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Xem Hồ Sơ & Quyền Lợi VIP</span>
                </Link>
              </div>
            </div>
          </MotionItem>
        ) : (
          /* ─── FINTECH SPLIT VIEW (5/12 & 7/12) ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ─── LEFT COLUMN (5/12): ORDER SUMMARY & GIFTS ─── */}
            <div className="lg:col-span-5 space-y-4">
              {/* Plan Switcher Pills */}
              <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 flex items-center gap-1 shadow-inner">
                {(Object.keys(CHECKOUT_PLANS) as PlanKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedKey(k)}
                    className={`flex-1 py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate ${
                      selectedKey === k
                        ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {k === "yearly" ? "Gói 1 Năm" : k === "monthly" ? "Gói 1 Tháng" : "Trọn Đời"}
                  </button>
                ))}
              </div>

              {/* Order Details Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {plan.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">{plan.billingDuration}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
                    {plan.badge}
                  </span>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs font-medium">
                  {plan.originalPriceFormatted && (
                    <div className="flex justify-between text-slate-400">
                      <span>Giá gốc:</span>
                      <span className="line-through">{plan.originalPriceFormatted}</span>
                    </div>
                  )}
                  {plan.savingsFormatted && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Ưu đãi áp dụng:</span>
                      <span>- {plan.savingsFormatted}</span>
                    </div>
                  )}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Tổng thanh toán:</span>
                      <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{plan.dailyCostNote}</div>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                      {plan.totalPriceFormatted}
                    </span>
                  </div>
                </div>

                {/* Bundled Gifts Box */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1.5">
                  <div className="text-[11px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Quà tặng đính kèm đơn hàng:</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {plan.gifts.map((g, idx) => {
                      const GiftIcon = g.icon;
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <GiftIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" strokeWidth={1.8} />
                          <span>{g.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quyền lợi mở khóa tức thì:
                  </div>
                  <div className="space-y-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                    {plan.features.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0 stroke-[3]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 100% 7-Day Money Back Guarantee Card */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.8} />
                <div>
                  <div className="font-bold text-emerald-900 dark:text-emerald-300">Cam kết hoàn tiền 100% trong 7 ngày</div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Bảo hiểm an tâm học tập tuyệt đối không rủi ro.</div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN (7/12): SMART PAYMENT TERMINAL ─── */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
                {/* Method Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                      <QrCode className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                        Cổng Quét Mã VietQR Napas 24/7
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">Kích hoạt tự động ngay sau khi chuyển khoản</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold border border-amber-200/60 dark:border-amber-900/40">
                    <Clock className="w-3.5 h-3.5 animate-spin" strokeWidth={1.8} />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                {/* QR Code Display */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center shadow-inner">
                  <div className="p-3 rounded-2xl bg-white shadow-md border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={vietQrUrl}
                      alt="Mã QR Chuyển Khoản VietQR Napas"
                      className="w-52 h-52 sm:w-60 sm:h-60 object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
                    Mở App Ngân hàng bất kỳ hoặc Ví MoMo quét mã QR trên để chuyển khoản tự động
                  </p>
                </div>

                {/* Transfer Info Form (Click to Copy) */}
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Ngân hàng thụ hưởng</div>
                      <div className="font-bold text-slate-900 dark:text-white">MB Bank (Ngân Hàng Quân Đội)</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("MB Bank", "Tên ngân hàng")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Số tài khoản</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">0386766688</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("0386766688", "Số tài khoản")}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[11px] font-bold cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {copiedField === "Số tài khoản" ? "Đã chép ✓" : "Sao chép"}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Số tiền chuyển chính xác</div>
                      <div className="font-bold text-[#0059bb] dark:text-sky-400 font-mono text-sm">{plan.totalPriceFormatted}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(String(plan.totalPriceNum), "Số tiền")}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[11px] font-bold cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {copiedField === "Số tiền" ? "Đã chép ✓" : "Sao chép"}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Nội dung chuyển khoản (Bắt buộc)</div>
                      <div className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">{transferContent}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(transferContent, "Nội dung chuyển khoản")}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[11px] font-bold cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                      {copiedField === "Nội dung chuyển khoản" ? "Đã chép ✓" : "Sao chép"}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmTransfer}
                    disabled={isVerifying}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={2} />
                        <span>Đang xác thực giao dịch trên ngân hàng...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                        <span>TÔI ĐÃ CHUYỂN KHOẢN XONG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageEntranceWrapper>
    </div>
  );
}

export default function PremiumCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Đang tải cổng thanh toán...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
