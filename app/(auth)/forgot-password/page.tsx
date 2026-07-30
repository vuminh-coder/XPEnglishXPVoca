"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../auth.css";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Headphones,
  KeyRound,
  RotateCcw,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentLang, setCurrentLang] = useState<"vi" | "en">("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        setErrorMsg(data.error || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsSubmitted(true);
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

  return (
    <div
      className="mobile-locked-container min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-[#f8fafc] dark:bg-[#09090b] relative w-full font-sans antialiased select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Mobile Orientation Overlay */}
      <div
        className="hidden max-lg:landscape:flex fixed inset-0 bg-white dark:bg-[#09090b] z-50 flex-col items-center justify-center p-6 text-center select-none"
        aria-hidden="true"
      >
        <Smartphone className="h-10 w-10 text-[#0059bb] dark:text-blue-400 animate-bounce mb-3 rotate-90" />
        <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">
          Vui lòng xoay dọc điện thoại
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">
          XP English hoạt động tốt nhất ở chế độ màn hình dọc.
        </p>
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
            className="h-8 px-2.5 rounded-lg border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-[#18191c] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#0059bb] dark:text-blue-400" />
            <span>{currentLang === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-lg shadow-lg py-1 z-50">
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
      <main className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-[1280px] mx-auto z-10">
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
                Khôi phục mật khẩu 🔑
                <br />
                <span className="text-[#0059bb] dark:text-blue-400">Nhanh chóng & bảo mật</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
                Nhập địa chỉ email đăng ký của bạn để nhận liên kết khôi phục tài khoản trong vài giây.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              <div className="rounded p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-900/40 flex items-center justify-center text-[#0059bb] dark:text-blue-400 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Bảo mật tuyệt đối
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Mã hóa liên kết xác thực
                  </p>
                </div>
              </div>

              <div className="rounded p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <KeyRound className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Khôi phục tức thì
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Nhận mail trong 30 giây
                  </p>
                </div>
              </div>

              <div className="rounded p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/50 dark:border-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Bảo toàn dữ liệu
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giữ nguyên streak & XP
                  </p>
                </div>
              </div>

              <div className="rounded p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Headphones className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Hỗ trợ 24/7
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giải đáp mọi thắc mắc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Card */}
          <div className="lg:col-span-5 w-full animate-fade-in-right flex justify-center items-center">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#121316] border border-slate-200/90 dark:border-white/10 rounded-md sm:rounded-lg p-6 sm:p-8 shadow-md shadow-slate-200/40 dark:shadow-none relative">
              {isSubmitted ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
                    Đã Gửi Yêu Cầu!
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    Hướng dẫn đặt lại mật khẩu đã được gửi đến email <span className="font-bold text-slate-800 dark:text-slate-200">{email}</span>. Vui lòng kiểm tra hộp thư của bạn.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-full h-10 mt-2 bg-[#0059bb] hover:bg-blue-700 text-white font-bold rounded text-xs transition-all shadow-sm"
                  >
                    Quay lại Đăng nhập
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="mb-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                      Quên Mật Khẩu
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Nhập email đăng ký để nhận liên kết khôi phục
                    </p>
                  </div>

                  {/* Error Banner */}
                  {errorMsg && (
                    <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                        Email đăng ký
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full h-10 pl-9 pr-3.5 rounded border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-[#18191c] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-10 mt-2 bg-[#0059bb] hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <span>Gửi yêu cầu khôi phục</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Bottom Link */}
                  <div className="mt-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Nhớ mật khẩu?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[#0059bb] dark:text-blue-400 hover:underline"
                    >
                      Quay lại Đăng nhập
                    </Link>
                  </div>
                </div>
              )}
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