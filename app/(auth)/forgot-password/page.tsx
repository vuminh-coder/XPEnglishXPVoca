"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
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
  Sparkles,
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
      className="mobile-locked-container min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-slate-50 dark:bg-[#070709] relative w-full font-sans antialiased select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Background Mesh Gradients */}
      <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#0059bb]/10 dark:bg-[#0059bb]/15 blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[15%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none z-0" />

      {/* Mobile Orientation Overlay */}
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

      {/* Header Bar - Mobile Only (Top Left: Website Title, Top Right: Language Selector) */}
      <header className="lg:hidden w-full h-14 px-4 sm:px-6 flex justify-between items-center bg-white/90 dark:bg-[#08080b]/90 border-b border-slate-200/90 dark:border-slate-800 backdrop-blur-md sticky top-0 z-30 select-none shadow-2xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display tracking-tight hover:opacity-90 transition-opacity">
            <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </Link>
        </div>

        {/* Right: Language Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-9 px-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span>{currentLang === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              <button
                type="button"
                onClick={() => { setCurrentLang("vi"); setIsLangOpen(false); }}
                className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center gap-2 transition-colors ${currentLang === "vi" ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}
              >
                <span>🇻🇳</span> Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => { setCurrentLang("en"); setIsLangOpen(false); }}
                className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center gap-2 transition-colors ${currentLang === "en" ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}
              >
                <span>🇺🇸</span> English
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <PageEntranceWrapper className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-7xl mx-auto z-10" suppressHydrationWarning>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Branding & Feature Cards (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6 text-left select-none">
            {/* Desktop Brand Header */}
            <div className="flex items-center justify-start gap-2.5 w-full">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <span className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-display">
                  <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
                  <span className="text-amber-500 font-normal">|</span>
                  <span className="text-amber-500">XP Voca</span>
                </span>
              </Link>
            </div>

            {/* Hero Text */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Khôi Phục Tài Khoản Tự Động</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900 dark:text-white tracking-tight font-display">
                Khôi phục mật khẩu 🔑
                <br />
                <span className="text-[#0059bb] dark:text-sky-400">Nhanh chóng & bảo mật</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md font-medium leading-relaxed">
                Nhập địa chỉ email đăng ký của bạn để nhận liên kết khôi phục tài khoản trong vài giây.
              </p>
            </div>

            {/* Features Grid - 4 Feature Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Bảo mật tuyệt đối
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Mã hóa liên kết xác thực
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
                  <KeyRound className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Khôi phục tức thì
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Nhận mail trong 30 giây
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 shadow-2xs">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Bảo toàn dữ liệu
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giữ nguyên streak & XP
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-2xs">
                  <Headphones className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Hỗ trợ 24/7
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Giải đáp mọi thắc mắc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Card (Agency Tier) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[440px] bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md shadow-slate-900/5 relative">
              {isSubmitted ? (
                <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                      Đã Gửi Yêu Cầu!
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                      Hướng dẫn đặt lại mật khẩu đã được gửi đến email <strong className="text-[#0059bb] dark:text-sky-400 font-bold">{email}</strong>. Vui lòng kiểm tra hộp thư của bạn.
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-full h-11 mt-3 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Quay lại Đăng nhập</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                      Quên Mật Khẩu
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Nhập email đăng ký để nhận liên kết khôi phục
                    </p>
                  </div>

                  {/* Error Banner */}
                  {errorMsg && (
                    <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Email đăng ký
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:border-[#0059bb] focus:bg-white dark:focus:bg-[#0c0d0e] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 mt-2 bg-[#0059bb] hover:bg-[#004ba0] active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
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
                  <div className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                    Nhớ mật khẩu?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[#0059bb] dark:text-sky-400 hover:underline"
                    >
                      Quay lại Đăng nhập
                    </Link>
                  </div>
                </div>
              )}
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