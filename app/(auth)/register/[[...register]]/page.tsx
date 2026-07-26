"use client";
import React from "react";
import Link from "next/link";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
import "../../auth.css";
import { Smartphone, Sparkles, Zap, Trophy, PenLine } from "lucide-react";

const RegisterSkeleton = () => (
  <div className="mx-auto w-full max-w-[400px] h-[550px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-lg p-6 flex flex-col justify-between animate-pulse shadow-xs">
    <div className="flex flex-col items-center text-center mt-2">
      <div className="h-6 w-36 bg-slate-200/80 dark:bg-slate-800 rounded-md mb-2"></div>
      <div className="h-4 w-44 bg-slate-100/80 dark:bg-slate-800/60 rounded-md"></div>
    </div>
    
    <div className="space-y-3 mt-6">
      <div className="h-11 w-full bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/30 dark:border-white/5 rounded-md"></div>
      <div className="h-11 w-full bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/30 dark:border-white/5 rounded-md"></div>
    </div>

    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-slate-200/40 dark:bg-white/5"></div>
      <div className="h-3 w-6 bg-slate-200/40 dark:bg-white/5 rounded-full"></div>
      <div className="h-px flex-1 bg-slate-200/40 dark:bg-white/5"></div>
    </div>

    <div className="space-y-3">
      <div>
        <div className="h-3 w-24 bg-slate-200/80 dark:bg-slate-800 rounded-md mb-2"></div>
        <div className="h-11 w-full bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/30 dark:border-white/5 rounded-md"></div>
      </div>
      <div>
        <div className="h-3 w-16 bg-slate-200/80 dark:bg-slate-800 rounded-md mb-2"></div>
        <div className="h-11 w-full bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/30 dark:border-white/5 rounded-md"></div>
      </div>
    </div>

    <div className="h-11 w-full bg-slate-200/80 dark:bg-slate-800 rounded-md mt-6 mb-2"></div>
  </div>
);

export default function RegisterPage() {
  // Case 84: Tap on container background blurs active input, closing the virtual keyboard on mobile
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only blur if the user clicked the layout background directly
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "MAIN") {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <div
      className="mobile-locked-container min-h-[100dvh] lg:h-screen lg:max-h-screen lg:overflow-hidden text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-white dark:bg-[#050505] relative w-full font-sans antialiased pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] lg:select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Case 5: Orientation Warning Overlay for Landscape Mode on Mobile */}
      <div className="hidden max-lg:landscape:flex fixed inset-0 bg-white dark:bg-[#050505] z-50 flex-col items-center justify-center p-6 text-center select-none" aria-hidden="true">
        <Smartphone className="h-10 w-10 text-[#0059bb] dark:text-blue-400 animate-bounce mb-3 rotate-90" />
        <h3 className="text-sm font-black text-slate-900 dark:text-white font-display">Vui lòng xoay dọc điện thoại</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">XP English hoạt động tốt nhất ở chế độ màn hình dọc.</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 pb-16 md:p-6 lg:pt-1 lg:pb-1 w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-0">
          {/* Left Column: Branding & Benefits */}
          <div className="brand-container lg:col-span-7 flex flex-col items-center lg:items-start gap-4 lg:gap-6 animate-fade-in-up text-center lg:text-left px-6 lg:px-0 select-none">
            {/* Premium Branding */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 w-full">
              <h1 className="text-lg lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
                <span className="text-amber-500 font-normal">|</span>
                <span className="text-amber-500">XP Voca</span>
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-1 lg:space-y-2">
              <h2 className="text-xl lg:text-5xl font-black leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                <span className="lg:hidden">Tạo tài khoản mới! 🚀</span>
                <span className="hidden lg:inline">
                  Tạo tài khoản mới! 🚀
                  <br />
                  <span className="text-[#0059bb] dark:text-blue-400">Khám phá ngay</span>
                </span>
              </h2>
              <p className="hidden lg:block text-sm md:text-[16px] text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-semibold">
                Tham gia cộng đồng học tiếng Anh thông minh và bắt đầu hành trình nâng cao vốn từ vựng ngay hôm nay.
              </p>
            </div>

            {/* Value Props Grid — Dashboard Micro-Sharp Style */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2 max-w-xl">
              <div className="benefit-card rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs">
                  <Sparkles className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    Miễn phí 100%
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    Không giới hạn tính năng
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
                  <Zap className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    Spaced Repetition
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ghi nhớ x3 hiệu quả
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-2xs">
                  <Trophy className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    Bảng Xếp Hạng
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    Đua TOP cùng cộng đồng
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-2xs">
                  <PenLine className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    Writing AI
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                    Chấm bài IELTS/TOEIC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="lg:col-span-5 w-full mx-auto animate-fade-in-right flex justify-center items-center px-0 lg:px-0">
            <ClerkLoading>
              <RegisterSkeleton />
            </ClerkLoading>
            <ClerkLoaded>
            <SignUp
              path="/register"
              routing="path"
              signInUrl="/login"
              forceRedirectUrl="/onboarding"
              appearance={{
                variables: {
                  colorPrimary: "#0059bb",
                  colorBackground: "#ffffff",
                  colorForeground: "#0f172a",
                  colorMutedForeground: "#475569",
                  colorPrimaryForeground: "#ffffff",
                  borderRadius: "0.5rem",
                },
                elements: {
                  cardBox: "mx-auto w-full max-w-[400px]",
                  card: "shadow-none border-none rounded-lg overflow-hidden bg-white dark:bg-slate-900",
                  formButtonPrimary: "h-11 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 hover:opacity-95 transition-opacity font-bold rounded-md py-0 text-sm shadow-xs flex items-center justify-center text-white border border-blue-400/20",
                  formFieldLabel: "text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5",
                  formFieldInput: "h-11 px-4 rounded-md border border-slate-200 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-semibold text-base",
                  formFieldErrorText: "text-xs font-bold text-rose-500 mt-1",
                  socialButtonsBlockButton: "h-11 border border-slate-200 dark:border-white/10 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-bold flex items-center justify-center gap-2",
                  socialButtonsBlockButtonText: "font-bold text-slate-700 dark:text-slate-300 text-xs",
                },
              }}
            />
            </ClerkLoaded>
          </div>
        </div>
      </main>

      {/* Website Footer (Desktop Only) — No mascot image */}
      <footer className="hidden lg:flex w-full justify-between items-center px-12 py-4 border-t border-slate-200/80 dark:border-white/8 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
            <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-blue-400 font-bold transition-colors"
            href="/about"
          >
            Giới thiệu
          </Link>
          <Link
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-blue-400 font-bold transition-colors"
            href="/methodology"
          >
            Phương pháp
          </Link>
          <Link
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-blue-400 font-bold transition-colors"
            href="/privacy"
          >
            Bảo mật
          </Link>
          <Link
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-blue-400 font-bold transition-colors"
            href="/support"
          >
            Hỗ trợ
          </Link>
        </nav>
        <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold">
          © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
        </div>
      </footer>

      {/* Sticky Mobile App-style Footer Bottom Bar (Mobile Only) */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 w-full border-t border-slate-200/80 dark:border-white/8 bg-white/98 dark:bg-[#050505]/98 backdrop-blur-md pt-3.5 pb-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-center z-30 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-[#0059bb] dark:text-blue-400 font-bold hover:underline py-1 px-1.5 inline-block">
            Đăng nhập.
          </Link>
        </p>
      </div>
    </div>
  );
}
