"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import "../auth.css";
import {
  BookOpen,
  Gamepad2,
  Bot,
  Headphones,
  Smartphone,
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const setUserPayload = useAuthStore((state) => state.setUserPayload);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentLang, setCurrentLang] = useState<"vi" | "en">("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Vui lòng nhập Họ và tên.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Vui lòng nhập địa chỉ Email hợp lệ.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Đăng ký thất bại. Email có thể đã được sử dụng.");
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
      className="mobile-locked-container min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-[#f8fafc] dark:bg-[#09090b] relative w-full font-sans antialiased select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Mobile Orientation Overlay */}
      <div className="hidden max-lg:landscape:flex fixed inset-0 bg-white dark:bg-[#09090b] z-50 flex-col items-center justify-center p-6 text-center select-none" aria-hidden="true">
        <Smartphone className="h-10 w-10 text-[#0059bb] dark:text-blue-400 animate-bounce mb-3 rotate-90" />
        <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">Vui lòng xoay dọc điện thoại</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">XP English hoạt động tốt nhất ở chế độ màn hình dọc.</p>
      </div>

      {/* Header Bar - Mobile Only (Top Left: Website Title, Top Right: Language Selector) */}
      <header className="lg:hidden w-full px-4 sm:px-8 py-3 flex justify-between items-center bg-white/80 dark:bg-[#09090b]/80 border-b border-slate-200/80 dark:border-white/10 backdrop-blur-md sticky top-0 z-30 select-none">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display tracking-tight hover:opacity-90 transition-opacity">
            <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </Link>
        </div>

        {/* Right: Language Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-8 px-2.5 rounded-xs border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-[#18191c] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#0059bb] dark:text-blue-400" />
            <span>{currentLang === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xs shadow-lg py-1 z-50">
              <button
                type="button"
                onClick={() => { setCurrentLang("vi"); setIsLangOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${currentLang === "vi" ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-blue-400" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              >
                <span>🇻🇳</span> Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => { setCurrentLang("en"); setIsLangOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${currentLang === "en" ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-blue-400" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              >
                <span>🇺🇸</span> English
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-[1280px] mx-auto z-10" suppressHydrationWarning>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding & Feature Cards (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6 animate-fade-in-up text-left select-none">
            {/* Desktop Brand Header */}
            <div className="flex items-center justify-start gap-2.5 w-full">
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-display">
                <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
                <span className="text-amber-500 font-normal">|</span>
                <span className="text-amber-500">XP Voca</span>
              </h1>
            </div>
            {/* Hero Text */}
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900 dark:text-white tracking-tight font-display">
                Tạo tài khoản miễn phí ✨
                <br />
                <span className="text-[#0059bb] dark:text-blue-400">Bắt đầu học ngay hôm nay</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
                Tham gia cộng đồng học viên thông minh, chinh phục 3,900+ từ vựng và luyện tập cùng AI Tutor.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              <div className="rounded-xs p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-xs bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-900/40 flex items-center justify-center text-[#0059bb] dark:text-blue-400 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Miễn phí 100%
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Không giới hạn tính năng
                  </p>
                </div>
              </div>

              <div className="rounded-xs p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-xs bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Gamepad2 className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    PvP Thách Đấu
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    So tài từ vựng 1v1
                  </p>
                </div>
              </div>

              <div className="rounded-xs p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-xs bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Headphones className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Bảng Xếp Hạng Tuần
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Thi đấu cùng học viên
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Register Card */}
          <div className="lg:col-span-5 w-full animate-fade-in-right flex justify-center items-center">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#121316] border border-slate-200/90 dark:border-white/10 rounded-xs p-6 sm:p-8 shadow-md shadow-slate-200/40 dark:shadow-none relative">
              <div className="mb-6 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  Đăng Ký
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Tạo tài khoản học tập miễn phí ngay hôm nay
                </p>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Social Login Buttons (Google & Facebook) */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="h-10 border border-slate-200/90 dark:border-white/10 rounded-xs bg-slate-50 dark:bg-[#18191c] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 shadow-2xs disabled:opacity-50 cursor-pointer"
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
                  className="h-10 border border-slate-200/90 dark:border-white/10 rounded-xs bg-slate-50 dark:bg-[#18191c] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 shadow-2xs disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Separator */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-slate-200/80 dark:bg-white/10"></div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Hoặc bằng email
                </span>
                <div className="h-px flex-1 bg-slate-200/80 dark:bg-white/10"></div>
              </div>

              {/* Register Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-10 pl-9 pr-3.5 rounded-xs border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-[#18191c] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Field 2: Email */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full h-10 pl-9 pr-3.5 rounded-xs border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-[#18191c] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Field 3: Password */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full h-10 pl-9 pr-9 rounded-xs border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-[#18191c] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Field 4: Confirm Password */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full h-10 pl-9 pr-3.5 rounded-xs border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-[#18191c] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 mt-2 bg-[#0059bb] hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xs text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Đăng ký tài khoản ngay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="mt-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                Đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#0059bb] dark:text-blue-400 hover:underline"
                >
                  Đăng nhập tại đây
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Website Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 border-t border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md z-10 text-center sm:text-left select-none">
        <div className="hidden sm:flex items-center gap-2">
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1 font-display tracking-tight">
            <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </div>
        </div>
        <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 w-full sm:w-auto text-center sm:text-right">
          © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
        </p>
      </footer>
    </div>
  );
}
