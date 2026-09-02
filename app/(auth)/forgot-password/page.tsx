"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { VietnamFlag, USFlag } from "@/shared/components/ui";
import "../auth.css";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Headphones,
  KeyRound,
  RotateCcw,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  X,
  Loader2,
  Check,
  Star,
  ExternalLink,
  Key,
} from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070709]">
          <Loader2 className="w-8 h-8 text-[#0059bb] animate-spin" />
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordContent() {
  const router = useRouter();

  // Mode: "request" (enter email) | "sent" (email sent) | "reset" (enter new password)
  const [mode, setMode] = useState<"request" | "sent" | "reset">("request");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Language state
  const [currentLang, setCurrentLang] = useState<"vi" | "en">("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Check URL params for reset token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        setToken(urlToken);
        setMode("reset");
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Password Strength Calculation
  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, text: "", color: "bg-slate-200 dark:bg-slate-800" };
    let score = 0;
    if (newPassword.length >= 6) score += 1;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword) || /[^A-Za-z0-9]/.test(newPassword)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, text: "Yếu", color: "bg-rose-500", textColor: "text-rose-500" };
      case 2:
        return { score: 2, text: "Trung bình", color: "bg-amber-500", textColor: "text-amber-500" };
      case 3:
        return { score: 3, text: "Khá", color: "bg-sky-500", textColor: "text-sky-500" };
      case 4:
        return { score: 4, text: "Mạnh", color: "bg-emerald-500", textColor: "text-emerald-500" };
      default:
        return { score: 0, text: "Rất yếu", color: "bg-rose-400", textColor: "text-rose-400" };
    }
  };

  const strength = getPasswordStrength();
  const isPasswordMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const isPasswordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  // Handle Send Reset Link (Mode: request)
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Vui lòng nhập địa chỉ Email hợp lệ.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Gửi yêu cầu thất bại. Vui lòng thử lại sau.");
        setIsLoading(false);
        return;
      }

      // If token provided in dev environment, save for testing
      if (data.resetToken) {
        setToken(data.resetToken);
      }

      setIsLoading(false);
      setMode("sent");
      setResendCooldown(60);
    } catch (err: any) {
      setErrorMsg("Đã xảy ra lỗi kết nối máy chủ. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  // Handle Resend Email
  const handleResend = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Không thể gửi lại email vào lúc này.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setResendCooldown(60);
      setSuccessMsg("Đã gửi lại email hướng dẫn!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg("Lỗi kết nối khi gửi lại email.");
      setIsLoading(false);
    }
  };

  // Handle Reset Password Submit (Mode: reset)
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!token.trim()) {
      setErrorMsg("Vui lòng nhập mã xác nhận khôi phục.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg("Mật khẩu mới phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Đặt lại mật khẩu thất bại. Mã có thể đã hết hạn.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setSuccessMsg("Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setErrorMsg("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest("input") &&
      !e.target.closest("button") &&
      !e.target.closest("a")
    ) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(e.getModifierState("CapsLock"));
  };

  return (
    <div
      className="mobile-locked-container min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-slate-50 dark:bg-[#070709] relative w-full font-sans antialiased select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Ambient Radial Gradients */}
      <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#0059bb]/10 dark:bg-[#0059bb]/15 blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[15%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none z-0" />

      {/* Mobile Orientation Warning Overlay */}
      <div
        className="hidden max-lg:landscape:flex fixed inset-0 bg-white dark:bg-[#070709] z-50 flex-col items-center justify-center p-6 text-center select-none"
        aria-hidden="true"
      >
        <Smartphone className="h-10 w-10 text-[#0059bb] dark:text-sky-400 animate-bounce mb-3 rotate-90" />
        <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">
          Vui lòng xoay dọc điện thoại
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
          XP English hoạt động tốt nhất ở chế độ màn hình dọc.
        </p>
      </div>

      {/* Header Bar */}
      <header className="w-full h-14 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white/90 dark:bg-[#08080b]/90 border-b border-slate-200/90 dark:border-slate-800 backdrop-blur-md sticky top-0 z-30 select-none shadow-2xs">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display tracking-tight hover:opacity-90 transition-opacity"
            title="XP English | XP Voca Trang Chủ"
          >
            <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </Link>
        </div>

        {/* Right Header: Language Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              aria-label="Chọn ngôn ngữ giao diện"
              className="h-9 px-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0059bb]/30"
            >
              <span className="flex items-center gap-2">
                {currentLang === "vi" ? (
                  <>
                    <VietnamFlag className="w-5 h-3.5" />
                    <span>Tiếng Việt</span>
                  </>
                ) : (
                  <>
                    <USFlag className="w-5 h-3.5" />
                    <span>English</span>
                  </>
                )}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <div
                role="listbox"
                className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={currentLang === "vi"}
                  onClick={() => {
                    setCurrentLang("vi");
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                    currentLang === "vi"
                      ? "bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <VietnamFlag className="w-5 h-3.5" />
                    <span>Tiếng Việt</span>
                  </span>
                  {currentLang === "vi" && <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
                </button>
                <button
                  type="button"
                  role="option"
                  aria-selected={currentLang === "en"}
                  onClick={() => {
                    setCurrentLang("en");
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                    currentLang === "en"
                      ? "bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <USFlag className="w-5 h-3.5" />
                    <span>English</span>
                  </span>
                  {currentLang === "en" && <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <PageEntranceWrapper
        className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-7xl mx-auto z-10"
        suppressHydrationWarning
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding & Security Benefits (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6 text-left select-none">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-[#0059bb] dark:text-sky-400 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Khôi Phục Tài Khoản Tự Động & An Toàn</span>
            </div>

            {/* Headline */}
            <div className="space-y-2.5">
              <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-black leading-tight text-slate-900 dark:text-white tracking-tight font-display">
                Khôi phục mật khẩu 🔑
                <br />
                <span className="bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  Nhanh chóng & bảo mật cao
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed">
                Đừng lo lắng! XP English giúp bạn khôi phục quyền truy cập vào lộ trình học tập, bảo toàn toàn bộ Streak và điểm số XP chỉ trong vài thao tác.
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {/* Card 1: Bảo mật tuyệt đối */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Bảo mật tuyệt đối
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Mã hóa liên kết xác thực SSL
                  </p>
                </div>
              </div>

              {/* Card 2: Khôi phục tức thì */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-amber-300 dark:hover:border-amber-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <KeyRound className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Khôi phục tức thì
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Nhận mã trong 30 giây
                  </p>
                </div>
              </div>

              {/* Card 3: Bảo toàn dữ liệu */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <RotateCcw className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Bảo toàn dữ liệu
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giữ nguyên Streak & Điểm XP
                  </p>
                </div>
              </div>

              {/* Card 4: Hỗ trợ 24/7 */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Headphones className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Hỗ trợ kỹ thuật 24/7
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giải đáp mọi sự cố đăng nhập
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof / Active Learner Strip */}
            <div className="w-full max-w-lg p-3.5 rounded-2xl bg-white/80 dark:bg-[#0c0c0f]/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/80 dark:text-blue-200 font-black text-xs ring-2 ring-white dark:ring-[#0c0c0f]">
                    M
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/80 dark:text-amber-200 font-black text-xs ring-2 ring-white dark:ring-[#0c0c0f]">
                    H
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-200 font-black text-xs ring-2 ring-white dark:ring-[#0c0c0f]">
                    L
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/80 dark:text-purple-200 font-black text-xs ring-2 ring-white dark:ring-[#0c0c0f]">
                    K
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      12,450+ học viên
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Đang học tập và thi đấu hôm nay
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>4.9 / 5</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Interactive Forgot Card (Agency Tier) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[440px] bg-white dark:bg-[#0c0c10] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40 relative backdrop-blur-md">
              {/* Error Banner with Dismiss Button */}
              {errorMsg && (
                <div
                  role="alert"
                  className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-1"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMsg("")}
                    className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors cursor-pointer"
                    aria-label="Đóng thông báo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Success Banner */}
              {successMsg && (
                <div
                  role="status"
                  className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-top-1"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* ========================================================
                  MODE 1: REQUEST RESET LINK (ENTER EMAIL)
                  ======================================================== */}
              {mode === "request" && (
                <div>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                      Quên Mật Khẩu
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Nhập email đăng ký để nhận liên kết khôi phục an toàn
                    </p>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="forgot-email-input"
                        className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Email đăng ký tài khoản
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        <input
                          id="forgot-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          autoComplete="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          className="w-full h-11 pl-10 pr-9 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                          required
                        />
                        {email && (
                          <button
                            type="button"
                            onClick={() => setEmail("")}
                            aria-label="Xóa email"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 sm:h-12 mt-2 bg-[#0059bb] hover:bg-[#004ba0] active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang gửi yêu cầu...</span>
                        </div>
                      ) : (
                        <>
                          <span>Gửi liên kết khôi phục</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Manual Code Option Toggle */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setMode("reset")}
                      className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Đã có mã token? Nhập mã tại đây</span>
                    </button>
                  </div>

                  {/* Bottom Switch Link */}
                  <div className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                    Nhớ mật khẩu?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[#0059bb] dark:text-sky-400 hover:underline ml-1"
                    >
                      Quay lại Đăng nhập
                    </Link>
                  </div>
                </div>
              )}

              {/* ========================================================
                  MODE 2: EMAIL SENT CONFIRMATION STATE
                  ======================================================== */}
              {mode === "sent" && (
                <div className="text-center py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                      Đã Gửi Hướng Dẫn! 📬
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                      Chúng tôi đã gửi liên kết khôi phục mật khẩu đến:
                      <br />
                      <strong className="text-[#0059bb] dark:text-sky-400 font-bold break-all">
                        {email}
                      </strong>
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      Vui lòng kiểm tra cả hòm thư Spam nếu không nhận được sau 1-2 phút.
                    </p>
                  </div>

                  {/* Action 1: Open Gmail Shortcut */}
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98] gap-2 cursor-pointer"
                  >
                    <span>Mở hộp thư Gmail</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Action 2: Enter Token Code Direct */}
                  <button
                    type="button"
                    onClick={() => setMode("reset")}
                    className="inline-flex items-center justify-center w-full h-10 border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-all gap-1.5 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    <span>Nhập mã xác nhận để đổi mật khẩu</span>
                  </button>

                  {/* Action 3: Resend Counter */}
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Chưa nhận được email?</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || isLoading}
                      className="font-bold text-[#0059bb] dark:text-sky-400 hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer disabled:cursor-not-allowed"
                    >
                      {resendCooldown > 0 ? `Gửi lại sau (${resendCooldown}s)` : "Gửi lại ngay"}
                    </button>
                  </div>

                  {/* Back to Login */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại trang Đăng nhập</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* ========================================================
                  MODE 3: RESET PASSWORD FORM (TOKEN + NEW PASSWORD)
                  ======================================================== */}
              {mode === "reset" && (
                <div>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                      Đặt Lại Mật Khẩu
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Nhập mã xác nhận và thiết lập mật khẩu an toàn mới
                    </p>
                  </div>

                  <form onSubmit={handleResetSubmit} className="space-y-3.5">
                    {/* Field 1: Token */}
                    <div>
                      <label
                        htmlFor="reset-token-input"
                        className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Mã xác nhận (Token)
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        <input
                          id="reset-token-input"
                          type="text"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          placeholder="Dán mã nhận từ email..."
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-base sm:text-sm font-mono focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Field 2: New Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="reset-new-password-input"
                          className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                        >
                          Mật khẩu mới
                        </label>
                        {newPassword && (
                          <span className={`text-[10px] font-bold ${strength.textColor} uppercase tracking-wider`}>
                            {strength.text}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        <input
                          id="reset-new-password-input"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          onKeyDown={handleKeyEvent}
                          onKeyUp={handleKeyEvent}
                          placeholder="Tối thiểu 6 ký tự"
                          autoComplete="new-password"
                          className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Strength Progress Bar */}
                      {newPassword && (
                        <div className="mt-2 space-y-1 animate-in fade-in duration-200">
                          <div className="grid grid-cols-4 gap-1.5 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 1 ? strength.color : "bg-transparent"}`} />
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 2 ? strength.color : "bg-transparent"}`} />
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 3 ? strength.color : "bg-transparent"}`} />
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 4 ? strength.color : "bg-transparent"}`} />
                          </div>
                        </div>
                      )}

                      {/* Realtime Caps Lock Indicator */}
                      {isCapsLockOn && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 animate-in fade-in">
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono text-[10px]">
                            ⇪
                          </span>
                          <span>Caps Lock đang bật</span>
                        </div>
                      )}
                    </div>

                    {/* Field 3: Confirm New Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="reset-confirm-password-input"
                          className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                        >
                          Xác nhận mật khẩu mới
                        </label>
                        {confirmPassword && (
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                              isPasswordMatch ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                            }`}
                          >
                            {isPasswordMatch ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Khớp</span>
                              </>
                            ) : (
                              <span>Chưa khớp</span>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        <input
                          id="reset-confirm-password-input"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onKeyDown={handleKeyEvent}
                          onKeyUp={handleKeyEvent}
                          placeholder="Nhập lại mật khẩu mới"
                          autoComplete="new-password"
                          className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-base sm:text-sm font-medium focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:outline-none transition-all ${
                            isPasswordMismatch
                              ? "border-rose-300 dark:border-rose-800 focus:border-rose-500 focus:ring-rose-500/20"
                              : isPasswordMatch
                              ? "border-emerald-300 dark:border-emerald-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                              : "border-slate-200/90 dark:border-slate-800 focus:border-[#0059bb] focus:ring-[#0059bb]/20"
                          }`}
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 sm:h-12 mt-2 bg-[#0059bb] hover:bg-[#004ba0] active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang cập nhật mật khẩu...</span>
                        </div>
                      ) : (
                        <>
                          <span>Cập nhật mật khẩu mới</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch back to request */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setMode("request")}
                      className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Gửi lại yêu cầu với email khác</span>
                    </button>
                  </div>

                  {/* Bottom Switch to Login Link */}
                  <div className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                    Đã nhớ mật khẩu?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[#0059bb] dark:text-sky-400 hover:underline ml-1"
                    >
                      Quay lại Đăng nhập
                    </Link>
                  </div>
                </div>
              )}

              {/* Security Trust Badge */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bảo mật SSL 256-bit • Mã hóa tài khoản an toàn</span>
              </div>
            </div>
          </div>
        </div>
      </PageEntranceWrapper>

      {/* Website Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 sm:px-8 md:px-12 py-4 border-t border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#08080b]/90 backdrop-blur-md z-10 text-center sm:text-left select-none">
        <div className="hidden sm:flex items-center gap-2">
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1 font-display tracking-tight">
            <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </div>
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 w-full sm:w-auto text-center sm:text-right">
          © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
        </p>
      </footer>
    </div>
  );
}