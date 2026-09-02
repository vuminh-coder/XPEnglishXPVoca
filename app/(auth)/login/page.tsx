"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { VietnamFlag, USFlag } from "@/shared/components/ui";
import "../auth.css";
import {
  BookOpen,
  Gamepad2,
  Bot,
  Headphones,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowLeft,
  X,
  Loader2,
  Star,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const setUserPayload = useAuthStore((state) => state.setUserPayload);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentLang, setCurrentLang] = useState<"vi" | "en">("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close language dropdown on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Google OAuth error parameters
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      if (errorParam) {
        if (errorParam === "google_denied") {
          setErrorMsg("Bạn đã hủy yêu cầu đăng nhập bằng Google.");
        } else if (errorParam === "google_token_failed") {
          setErrorMsg("Không thể xác thực token Google. Vui lòng thử lại.");
        } else if (errorParam === "google_no_email") {
          setErrorMsg("Tài khoản Google không cung cấp thông tin Email.");
        } else {
          setErrorMsg(`Lỗi đăng nhập Google (${errorParam}). Vui lòng thử lại sau.`);
        }
      }
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!emailOrUsername.trim()) {
      setErrorMsg("Vui lòng nhập Email hoặc Tên đăng nhập.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        setIsLoading(false);
        return;
      }

      setUserPayload(data.user);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg("Đã xảy ra lỗi kết nối máy chủ. Vui lòng thử lại sau.");
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

  const handleGoogleAuth = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/google";
  };

  const handleFacebookAuth = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/facebook";
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
          {/* Left Column: Branding & Feature Showcase (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6 text-left select-none">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-[#0059bb] dark:text-sky-400 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Nền Tảng Học Từ Vựng Thông Minh</span>
            </div>

            {/* Headline */}
            <div className="space-y-2.5">
              <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-black leading-tight text-slate-900 dark:text-white tracking-tight font-display">
                Chào mừng bạn quay lại! 👋
                <br />
                <span className="bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  Chinh phục tiếng Anh mỗi ngày
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed">
                Phương pháp Spaced Repetition khoa học kết hợp thi đấu PvP thời gian thực & gia sư AI kèm cặp 24/7.
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {/* Card 1: Từ vựng */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    8,900+ Từ vựng
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    155 chủ đề chuẩn
                  </p>
                </div>
              </div>

              {/* Card 2: Gamification & PvP */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-amber-300 dark:hover:border-amber-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Gamification & PvP
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Thi đấu thời gian thực
                  </p>
                </div>
              </div>

              {/* Card 3: AI Tutor */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Bot className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    AI Tutor 24/7
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Sửa lỗi & chấm bài
                  </p>
                </div>
              </div>

              {/* Card 4: 4 Kỹ Năng */}
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Headphones className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Listening & Speaking
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Dictation + Shadowing
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

          {/* Right Column: High-End Auth Card (Agency Tier) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[440px] bg-white dark:bg-[#0c0c10] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40 relative backdrop-blur-md">
              {/* Card Title */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  Đăng Nhập
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Nhập tài khoản để tiếp tục hành trình học tập
                </p>
              </div>

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

              {/* Social Login Buttons (Google & Facebook) */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  title="Đăng nhập bằng Google"
                  aria-label="Đăng nhập bằng Google"
                  className="h-11 border border-slate-200/90 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebookAuth}
                  disabled={isLoading}
                  title="Đăng nhập bằng Facebook"
                  aria-label="Đăng nhập bằng Facebook"
                  className="h-11 border border-slate-200/90 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Separator */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-slate-200/90 dark:bg-slate-800"></div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Hoặc bằng email
                </span>
                <div className="h-px flex-1 bg-slate-200/90 dark:bg-slate-800"></div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Field 1: Email / Username */}
                <div>
                  <label
                    htmlFor="login-username-input"
                    className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Email / Tên đăng nhập
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <input
                      id="login-username-input"
                      type="text"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder="user@example.com"
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      className="w-full h-11 pl-10 pr-9 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                      required
                    />
                    {emailOrUsername && (
                      <button
                        type="button"
                        onClick={() => setEmailOrUsername("")}
                        aria-label="Xóa nội dung nhập"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Field 2: Password */}
                <div>
                  <label
                    htmlFor="login-password-input"
                    className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <input
                      id="login-password-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyEvent}
                      onKeyUp={handleKeyEvent}
                      placeholder="••••••••"
                      autoComplete="current-password"
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

                {/* Auxiliary Row: Remember Me Checkbox & Forgot Password Link */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#0059bb] focus:ring-[#0059bb]/20 focus:ring-2 accent-[#0059bb] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Single Primary Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 sm:h-12 mt-2 bg-[#0059bb] hover:bg-[#004ba0] active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm hover:shadow-md hover:shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switch to Register Link */}
              <div className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#0059bb] dark:text-sky-400 hover:underline ml-1"
                >
                  Đăng ký tài khoản ngay
                </Link>
              </div>

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
