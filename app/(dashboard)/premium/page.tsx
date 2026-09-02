"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Sparkles,
  Check,
  Zap,
  ShieldCheck,
  Flame,
  Coins,
  Bot,
  FileText,
  Star,
  ArrowRight,
  Gift,
  ShoppingBag,
  User,
  Shield,
  CheckCircle,
  GraduationCap,
  Compass,
  ChevronDown,
  Clock,
  TrendingUp,
  Award,
  Layers,
  BookOpen,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
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

interface PlanConfig {
  key: PlanKey;
  name: string;
  badge: string;
  badgeType: "hot" | "flex" | "vip";
  pricePerMonthFormatted: string;
  pricePerMonthNum: number;
  totalPriceFormatted: string;
  totalPriceNum: number;
  durationLabel: string;
  dailyCostNote: string;
  savingsLabel?: string;
  gifts: GiftItem[];
  keyHighlights: string[];
}

const PLANS: Record<PlanKey, PlanConfig> = {
  yearly: {
    key: "yearly",
    name: "Gói 1 Năm (Pro VIP Pass)",
    badge: "TIẾT KIỆM 45% • LỰA CHỌN PHỔ BIẾN NHẤT",
    badgeType: "hot",
    pricePerMonthFormatted: "69.000 đ",
    pricePerMonthNum: 69000,
    totalPriceFormatted: "828.000 đ",
    totalPriceNum: 828000,
    durationLabel: "Thanh toán 1 năm (12 tháng + 3 tháng tặng kèm)",
    dailyCostNote: "Chỉ ~2.300 đ / ngày cho toàn bộ lộ trình",
    savingsLabel: "Tiết kiệm ngay 360.000 đ so với thanh toán từng tháng",
    gifts: [
      { icon: Gift, text: "Tặng thêm 3 tháng học miễn phí toàn diện (Trị giá 297.000 đ)" },
      { icon: ShieldCheck, text: "Tặng 3 Khiên Kim Cương bảo vệ ngọn lửa Streak" },
      { icon: GraduationCap, text: "Trang bị Nón Cử Nhân Cú Vàng độc quyền cho Avatar" },
    ],
    keyHighlights: [
      "Mở khóa toàn bộ 100+ chủ đề từ vựng Oxford, TOEIC & IELTS",
      "Ngân hàng 37+ đề thi thử có giải thích chi tiết đáp án và bẫy đề",
      "Gia sư AI Speaking & Writing sửa phát âm IPA và ngữ điệu 24/7",
      "Thuật toán ghi nhớ ngắt quãng SM-2 không giới hạn số lượng từ",
      "Tự động kích hoạt khiên bảo vệ chuỗi học tập Streak vĩnh viễn",
      "Hệ số nhân đôi X2 XP ở tất cả bài học, minigame & đấu trường PvP",
    ],
  },
  monthly: {
    key: "monthly",
    name: "Gói 1 Tháng (Linh Hoạt)",
    badge: "LINH HOẠT TỪNG THÁNG",
    badgeType: "flex",
    pricePerMonthFormatted: "99.000 đ",
    pricePerMonthNum: 99000,
    totalPriceFormatted: "99.000 đ",
    totalPriceNum: 99000,
    durationLabel: "Thanh toán từng tháng linh hoạt, hủy bất cứ lúc nào",
    dailyCostNote: "Chỉ ~3.300 đ / ngày trải nghiệm không ràng buộc",
    gifts: [
      { icon: ShieldCheck, text: "Tặng 1 Khiên Bảo Hộ Lửa Streak" },
      { icon: Zap, text: "Tặng Thẻ Nhân Đôi XP trong 7 ngày" },
    ],
    keyHighlights: [
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
    badgeType: "vip",
    pricePerMonthFormatted: "1.490.000 đ",
    pricePerMonthNum: 1490000,
    totalPriceFormatted: "1.490.000 đ",
    totalPriceNum: 1490000,
    durationLabel: "Sở hữu vĩnh viễn trọn đời, không bao giờ phải gia hạn",
    dailyCostNote: "Đầu tư 1 lần duy nhất cho tương lai sự nghiệp",
    savingsLabel: "Đặc quyền nhận mọi bản cập nhật bài học và đề thi mới vĩnh viễn",
    gifts: [
      { icon: Crown, text: "Huy hiệu Vương Miện Vàng Golden Crown độc quyền" },
      { icon: ShieldCheck, text: "Bảo hộ Streak Vĩnh Viễn Không Bao Giờ Mất Chuỗi" },
      { icon: Zap, text: "Ưu tiên máy chủ AI tốc độ cao nhất (Ultra Low Latency)" },
      { icon: Compass, text: "1 buổi định hướng lộ trình học 1-on-1 cùng Mentor" },
    ],
    keyHighlights: [
      "Toàn bộ quyền lợi của gói Pro VIP trọn đời vĩnh viễn",
      "Tự động nhận tất cả bộ đề TOEIC/IELTS cập nhật mới",
      "Truy cập sớm các tính năng AI thế hệ mới nhất",
      "Quyền truy cập phòng học VIP Master Class",
    ],
  },
};

const SUCCESS_STORIES = [
  {
    name: "Nguyễn Hoàng Nam",
    role: "Sinh viên ĐH Bách Khoa Hà Nội",
    badge: "Tăng 280 điểm TOEIC sau 2 tháng",
    initials: "HN",
    quote: "Tính năng Dictation chép chính tả kết hợp 37+ đề thi chuẩn có AI giải thích chi tiết từng câu bẫy giúp mình đạt 890 TOEIC ngay lần thi đầu tiên.",
  },
  {
    name: "Trần Thu Trang",
    role: "Chuyên viên Marketing",
    badge: "Speaking 6.0 ➔ 7.5 IELTS",
    initials: "TT",
    quote: "Gia sư AI Speaking thực sự giúp mình vượt qua nỗi sợ nói tiếng Anh. AI chấm điểm IPA từng âm tiết và sửa ngữ điệu tự nhiên như người bản xứ.",
  },
  {
    name: "Lê Minh Đức",
    role: "Học sinh THPT Chuyên",
    badge: "Nhớ 2.400+ từ vựng SM-2",
    initials: "MĐ",
    quote: "Gói Pro có X2 XP và thuật toán SM-2 giúp mình ghi nhớ hơn 2.400 từ vựng học thuật mà không hề bị quên, luôn duy trì Top 1 Bảng Vàng vinh danh.",
  },
];

const FAQS = [
  {
    q: "Sau khi quét mã VietQR, tài khoản của tôi được nâng cấp trong bao lâu?",
    a: "Hệ thống tích hợp cổng thanh toán VietQR Napas 24/7 tự động. Ngay sau khi chuyển khoản thành công (thường từ 10 - 30 giây), tài khoản của bạn sẽ tự động chuyển sang trạng thái VIP Pro ngay lập tức mà không cần chờ duyệt thủ công.",
  },
  {
    q: "Chính sách hoàn tiền 100% trong 7 ngày hoạt động như thế nào?",
    a: "Chúng tôi cam kết hoàn tiền 100% học phí nếu bạn cảm thấy chương trình không phù hợp trong 7 ngày đầu tiên trải nghiệm, không cần điều kiện phức tạp.",
  },
  {
    q: "Tôi có thể dùng tài khoản Premium trên bao nhiêu thiết bị?",
    a: "Bạn có thể đăng nhập đồng bộ toàn bộ tiến độ học tập trên không giới hạn thiết bị: Điện thoại iOS, Android, Máy tính bảng, Laptop và PC cùng lúc.",
  },
  {
    q: "Gói Trọn Đời (Lifetime) có phát sinh thêm chi phí nào khi có đề thi mới không?",
    a: "Hoàn toàn KHÔNG. Bạn thanh toán 1 lần duy nhất để sở hữu vĩnh viễn và tự động nhận mọi bản cập nhật bài học, đề thi TOEIC/IELTS mới nhất trong tương lai.",
  },
  {
    q: "Tiến độ từ vựng và số Vàng hiện tại của tôi có được bảo lưu không?",
    a: "Toàn bộ chuỗi Streak, số điểm Vàng, danh sách từ vựng và lịch sử thi thử của bạn đều được giữ nguyên 100% và nhận thêm quà tặng khi kích hoạt gói VIP.",
  },
];

export default function PremiumPage() {
  const { user } = useAuthStore();
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>("yearly");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Score simulator state
  const [targetExam, setTargetExam] = useState<"toeic" | "ielts">("toeic");
  const [currentScore, setCurrentScore] = useState<number>(600);

  const selectedPlan = PLANS[selectedPlanKey];

  const estimatedProScore = useMemo(() => {
    if (targetExam === "toeic") {
      return Math.min(990, currentScore + 260);
    }
    return Math.min(9.0, Number((currentScore + 1.5).toFixed(1)));
  }, [targetExam, currentScore]);

  return (
    <div className="space-y-8 pb-28 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── 1. TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
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
            label="Nâng cấp Premium"
            icon={<Crown className="w-4 h-4 text-amber-500" strokeWidth={1.8} />}
            active
          />
          <HeaderPillItem
            label="Cửa hàng vật phẩm"
            icon={<ShoppingBag className="w-4 h-4 text-purple-500" strokeWidth={1.8} />}
            href="/shop"
          />
          <HeaderPillItem
            label="Hồ sơ"
            icon={<User className="w-4 h-4 text-slate-500" strokeWidth={1.8} />}
            href="/profile"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="space-y-10 sm:space-y-12 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* ─── 2. HERO SPOTLIGHT STAGE ─── */}
        <MotionItem>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#0a2342] text-white p-6 sm:p-9 lg:p-10 border border-amber-400/30 shadow-2xl shadow-blue-950/20">
            {/* Ambient Radial Lights */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-sky-400/20 to-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Pitch Block (7/12) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[11px] font-black tracking-wider uppercase backdrop-blur-md shadow-inner">
                  <Crown className="w-4 h-4 text-amber-300" strokeWidth={2} />
                  <span>XP English PRO VIP Pass</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display leading-[1.2]">
                  Bứt Phá Điểm Số <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">TOEIC & IELTS</span> Cùng Trợ Lý AI Toàn Diện
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-medium max-w-xl">
                  Mở khóa không giới hạn hơn 100+ chủ đề từ vựng Oxford chuẩn quốc tế, ngân hàng 37+ đề thi bấm giờ thực tế và gia sư AI sửa phát âm IPA từng câu 24/7.
                </p>

                {/* Realtime Live Learners & Rating */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-blue-200/90">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>3.420+ học viên đang học PRO hôm nay</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" strokeWidth={1.5} />
                    <span>4.9 / 5.0 (12.500+ đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Right VIP Membership Card (5/12 Holographic Frame) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl p-1 bg-gradient-to-br from-amber-400/60 via-yellow-500/20 to-amber-600/60 shadow-2xl shadow-amber-500/15">
                  <div className="rounded-xl bg-gradient-to-b from-slate-900 via-[#0a1124] to-slate-950 p-6 space-y-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 border border-amber-400/30">
                          <Crown className="w-5 h-5 text-amber-400" strokeWidth={1.8} />
                        </div>
                        <div>
                          <div className="text-xs font-black text-white uppercase tracking-wider">Hội Viên Vàng</div>
                          <div className="text-[10px] text-amber-300/80 font-mono">VIP PRO PASS</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                        UNLIMITED
                      </span>
                    </div>

                    <div className="space-y-2 py-2 border-y border-white/10 text-xs font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>Gia Sư AI Speaking & Writing 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>Kho 37+ Đề Thi Thử TOEIC & IELTS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>Bảo Hộ Ngọn Lửa Streak Tự Động</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>Nhân Đôi Hệ Số Thưởng X2 XP</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-slate-400">Đặc quyền trọn gói chỉ:</span>
                      <span className="text-base font-black text-amber-300 font-display">69.000 đ/tháng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ─── 3. THE INTERACTIVE PLAN DECK & SPOTLIGHT POWER HERO ─── */}
        <MotionItem>
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <Badge variant="primary" size="sm">Bảng Điều Khiển Gói Hội Viên</Badge>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                Chọn Lộ Trình Phù Hợp Với Bạn
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Chạm để chọn gói — Toàn bộ ưu đãi và quà tặng sẽ hiển thị trực quan ngay lập tức
              </p>
            </div>

            {/* 3 Interactive Plan Selector Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {(Object.keys(PLANS) as PlanKey[]).map((key) => {
                const plan = PLANS[key];
                const isSelected = selectedPlanKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlanKey(key)}
                    className={`relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3.5 ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb] dark:border-sky-400 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/10 -translate-y-1"
                        : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
                    }`}
                  >
                    {/* Floating Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider ${
                        plan.badgeType === "hot"
                          ? "bg-amber-500 text-white shadow-xs"
                          : plan.badgeType === "vip"
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}>
                        {plan.badge}
                      </span>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#0059bb] dark:border-sky-400 bg-[#0059bb] dark:bg-sky-400 text-white"
                          : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                        {plan.name}
                      </h3>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                          {plan.pricePerMonthFormatted}
                        </span>
                        {key !== "lifetime" && (
                          <span className="text-xs font-semibold text-slate-500">/ tháng</span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                        {plan.dailyCostNote}
                      </p>
                    </div>

                    {plan.savingsLabel && (
                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{plan.savingsLabel}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Spotlight Power Card for Selected Plan */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlanKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-blue-200/80 dark:border-blue-900/40 shadow-lg space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left (7/12): Plan Perks & Gifts */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-md">
                        <Crown className="w-5 h-5 text-amber-300" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                          Đặc Quyền Của Bạn Khi Kích Hoạt {selectedPlan.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Bắt đầu ngay hôm nay để bứt phá trình độ tiếng Anh vượt trội
                        </p>
                      </div>
                    </div>

                    {/* Gifts Bundle */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1.5">
                      <div className="text-[11px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5" strokeWidth={2} />
                        <span>Gói quà tặng kèm miễn phí hôm nay:</span>
                      </div>
                      <div className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {selectedPlan.gifts.map((gift, gIdx) => {
                          const IconComp = gift.icon;
                          return (
                            <div key={gIdx} className="flex items-center gap-2">
                              <IconComp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" strokeWidth={1.8} />
                              <span>{gift.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      {selectedPlan.keyHighlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right (5/12): Final Pricing Box & Direct Link to Checkout */}
                  <div className="lg:col-span-5 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Tổng thanh toán:
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                          {selectedPlan.totalPriceFormatted}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {selectedPlan.durationLabel}
                      </div>
                    </div>

                    {/* Direct Link to Dedicated Checkout Page */}
                    <Link
                      href={`/premium/checkout?plan=${selectedPlanKey}`}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                    >
                      <Crown className="w-4 h-4 text-amber-300" strokeWidth={1.8} />
                      <span>KÍCH HOẠT {selectedPlan.name.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" strokeWidth={1.8} /> Hoàn tiền 7 ngày
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.8} /> Quét mã VietQR 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </MotionItem>

        {/* ─── 4. INTERACTIVE BENTO FEATURE SHOWCASES (5 VISUAL TEASERS) ─── */}
        <MotionItem>
          <div className="space-y-6 pt-2">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <Badge variant="primary" size="sm">Trực Quan Hóa Tính Năng</Badge>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                Trải Nghiệm Công Nghệ Học Độc Quyền
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Khám phá sức mạnh thực tế của các công cụ AI và phương pháp học thông minh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Teaser 1: AI Voice Waveform & IPA Accuracy */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Bot className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <Badge variant="legendary" size="sm">Gemini AI 2.0</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Gia Sư AI Speaking Đo Chuẩn IPA
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Phân tích sóng âm thời gian thực, đối chiếu phát âm với người bản xứ và sửa lỗi ngữ điệu từng từ.
                  </p>
                </div>

                {/* Visual Waveform Simulation Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Độ chuẩn xác IPA</span>
                    <span className="text-emerald-500 font-black">98.4% NATIVE MATCH</span>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-8 px-1">
                    {[40, 75, 95, 60, 85, 100, 70, 90, 65, 80, 100, 85, 60, 90, 75, 50].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-gradient-to-t from-purple-500 to-indigo-400"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold text-center">
                    /ɪkˈstrɔːrdəneri/ • Nhấn đúng trọng âm 2
                  </div>
                </div>
              </div>

              {/* Teaser 2: Score Improvement Gauge Simulator */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <Badge variant="danger" size="sm">37+ Đề Thi Thử</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Mô Phỏng Tăng Điểm Thi Chuẩn
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Bộ đề sát format đề thật đi kèm ma trận phân tích điểm yếu giúp bứt phá band điểm rõ rệt.
                  </p>
                </div>

                {/* Interactive Simulator Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Mục tiêu thi:</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => { setTargetExam("toeic"); setCurrentScore(600); }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${targetExam === "toeic" ? "bg-rose-600 text-white" : "bg-slate-200 dark:bg-slate-700"}`}
                      >
                        TOEIC
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTargetExam("ielts"); setCurrentScore(5.5); }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${targetExam === "ielts" ? "bg-rose-600 text-white" : "bg-slate-200 dark:bg-slate-700"}`}
                      >
                        IELTS
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1 font-display">
                    <div>
                      <div className="text-[10px] text-slate-400">Điểm hiện tại</div>
                      <div className="text-lg font-black text-slate-700 dark:text-slate-300">{currentScore}</div>
                    </div>
                    <span className="text-rose-500 font-black text-base">➔</span>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-500 font-bold">Dự kiến với PRO</div>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{estimatedProScore} +</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teaser 3: SM-2 Spaced Repetition Memory Curve */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <Badge variant="warning" size="sm">Thuật Toán SM-2</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Đập Tan Đường Cong Quên Lãng
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Hệ thống tự động nhắc nhở ôn tập từ vựng đúng thời điểm vàng, đưa từ vựng vào trí nhớ vĩnh viễn.
                  </p>
                </div>

                {/* Graph Graphic Simulation */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Độ lưu giữ trí nhớ:</span>
                    <span className="text-amber-600 dark:text-amber-400 font-black">95% sau 6 tháng</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 w-[95%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Học vẹt: Quên 80% (3 ngày)</span>
                    <span className="text-emerald-500 font-bold">SM-2: Nhớ 95%</span>
                  </div>
                </div>
              </div>

              {/* Teaser 4: Immortal Streak Shield */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                      <Flame className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <Badge variant="success" size="sm">Streak Bất Tử</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Bảo Vệ Ngọn Lửa Streak Tự Động
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Không bao giờ lo đứt chuỗi ngọn lửa học tập khi bạn lỡ bận việc đột xuất 1-2 ngày.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-6 h-6 text-orange-500" strokeWidth={2} />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Khiên Kim Cương PRO</div>
                      <div className="text-[10px] text-emerald-500 font-semibold">Tự động kích hoạt khi vắng mặt</div>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-500" strokeWidth={1.8} />
                </div>
              </div>

              {/* Teaser 5: X2 Speed Multiplier for XP & Rank */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between md:col-span-2 lg:col-span-2">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                      <Zap className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <Badge variant="primary" size="sm">2X XP Boost</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Nhân Đôi Tốc Độ Tích Lũy XP & Thống Lĩnh Bảng Vàng
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Tăng gấp đôi toàn bộ số điểm kinh nghiệm nhận được từ Dictation, Shadowing, Reading và Đấu trường 1v1 PvP.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-black">
                      2X
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Hệ số kinh nghiệm nhân đôi</div>
                      <div className="text-[10px] text-slate-400">Áp dụng cho mọi bài học và minigame</div>
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-3">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Luyện 15 phút = +120 XP (thay vì +60 XP)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ─── 5. REAL STUDENT SUCCESS STORIES & SCORECARDS ─── */}
        <MotionItem>
          <div className="space-y-6 pt-2">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <Badge variant="primary" size="sm">Bảng Vàng Thành Tích</Badge>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                Học Viên Đã Bứt Phá Như Thế Nào?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Kết quả thực tế từ những người đã tin chọn đồng hành cùng gói Pro VIP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SUCCESS_STORIES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        {item.badge}
                      </span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed font-medium">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionItem>

        {/* ─── 6. GUARANTEE SHIELD & ACCORDION FAQS ─── */}
        <MotionItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left Guarantee Card (5/12) */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Shield className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  Cam Kết Hoàn Tiền 100% Trong 7 Ngày
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Chúng tôi cam kết chất lượng tuyệt đối. Nếu bạn trải nghiệm gói Pro trong 7 ngày đầu tiên mà không cảm thấy hài lòng vì bất kỳ lý do gì, hãy thông báo cho chúng tôi để nhận lại 100% số tiền đã thanh toán.
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900/40 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4" strokeWidth={2} />
                <span>Bảo hiểm quyền lợi học viên an tâm 100%</span>
              </div>
            </div>

            {/* Right FAQ Accordion (7/12) */}
            <div className="lg:col-span-7 space-y-2.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-3">
                Giải Đáp Thắc Mắc Thường Gặp (FAQ)
              </h3>

              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                          isOpen ? "rotate-180 text-[#0059bb]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-3.5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </MotionItem>
      </PageEntranceWrapper>
    </div>
  );
}
