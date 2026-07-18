"use client";
import React from "react";
import Link from "next/link";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
import "./Register.css";
import { Smartphone, Sparkles, Zap, ShieldCheck, Trophy } from "lucide-react";

const RegisterSkeleton = () => (
  <div className="mx-auto w-full max-w-[400px] h-[550px] bg-white/95 border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between animate-pulse shadow-2xl backdrop-blur-md">
    <div className="flex flex-col items-center text-center mt-2">
      <div className="h-6 w-36 bg-slate-200/80 rounded-md mb-2"></div>
      <div className="h-4 w-44 bg-slate-100/80 rounded-md"></div>
    </div>
    
    <div className="space-y-3 mt-6">
      <div className="h-12 w-full bg-slate-100/70 border border-slate-200/30 rounded-xl"></div>
      <div className="h-12 w-full bg-slate-100/70 border border-slate-200/30 rounded-xl"></div>
    </div>

    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-slate-200/40"></div>
      <div className="h-3 w-6 bg-slate-200/40 rounded-full"></div>
      <div className="h-px flex-1 bg-slate-200/40"></div>
    </div>

    <div className="space-y-3">
      <div>
        <div className="h-3 w-24 bg-slate-200/80 rounded-md mb-2"></div>
        <div className="h-12 w-full bg-slate-100/60 border border-slate-200/30 rounded-xl"></div>
      </div>
      <div>
        <div className="h-3 w-16 bg-slate-200/80 rounded-md mb-2"></div>
        <div className="h-12 w-full bg-slate-100/60 border border-slate-200/30 rounded-xl"></div>
      </div>
    </div>

    <div className="h-12 w-full bg-slate-200/80 rounded-xl mt-6 mb-2"></div>
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
      className="mobile-locked-container min-h-[100dvh] lg:h-screen lg:max-h-screen lg:overflow-hidden text-slate-800 flex flex-col justify-between bg-[#f0f4f8] relative w-full font-sans antialiased pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] lg:select-text"
      onClick={handleContainerClick}
      suppressHydrationWarning
    >
      {/* Case 5: Orientation Warning Overlay for Landscape Mode on Mobile */}
      <div className="hidden max-lg:landscape:flex fixed inset-0 bg-[#f0f4f8] z-50 flex-col items-center justify-center p-6 text-center select-none" aria-hidden="true">
        <Smartphone className="h-10 w-10 text-blue-600 animate-bounce mb-3 rotate-90" />
        <h3 className="text-sm font-black text-slate-900 font-display">Vui lòng xoay dọc điện thoại</h3>
        <p className="text-[11px] text-slate-500 font-bold mt-1">XP English hoạt động tốt nhất ở chế độ màn hình dọc.</p>
      </div>

      {/* Floating Background Blobs */}
      <div className="bg-blob-1 pointer-events-none" aria-hidden="true"></div>
      <div className="bg-blob-2 pointer-events-none" aria-hidden="true"></div>

      {/* Main Content - Natural layout flow on mobile (Case 8) */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 pb-16 md:p-6 lg:pt-1 lg:pb-1 w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-0">
          {/* Left Column: Branding & Benefits (Case 6 brand-container) */}
          <div className="brand-container lg:col-span-7 flex flex-col items-center lg:items-start gap-4 lg:gap-6 animate-fade-in-up text-center lg:text-left px-6 lg:px-0 select-none">
            {/* Premium Branding */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 w-full">
              <div className="w-9.5 h-9.5 lg:w-12 lg:h-12 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
              </div>
              <h1 className="text-lg lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span className="text-[#0059bb]">XP</span> English
                <span className="text-amber-500 font-normal">|</span>
                <span className="text-amber-500">XP Voca</span>
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-1 lg:space-y-2">
              <h2 className="text-xl lg:text-5xl font-black leading-[1.1] text-slate-900 tracking-tight">
                <span className="lg:hidden">Tạo tài khoản mới! 🚀</span>
                <span className="hidden lg:inline">
                  Tạo tài khoản mới! 🚀
                  <br />
                  <span className="text-[#0059bb]">Khám phá ngay</span>
                </span>
              </h2>
              <p className="hidden lg:block text-sm md:text-[16px] text-slate-650 max-w-lg leading-relaxed font-semibold">
                Tham gia cộng đồng học tiếng Anh thông minh và bắt đầu hành trình nâng cao vốn từ vựng ngay hôm nay.
              </p>
            </div>

            {/* Value Props Grid - Staggered Animations */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-w-xl">
              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                  <Sparkles className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                    Miễn phí 100%
                  </h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Đăng ký không tốn phí
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                  <Zap className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                    Học siêu tốc
                  </h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Ghi nhớ x3 hiệu quả
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-[#0059bb] shadow-sm shrink-0">
                  <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                    Bảo mật cao
                  </h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    An toàn dữ liệu
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                  <Trophy className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                    Đua TOP BXH
                  </h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Cạnh tranh cùng bạn bè
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
                  borderRadius: "0.75rem",
                },
                elements: {
                  cardBox: "mx-auto w-full max-w-[400px]",
                  card: "shadow-none border-none rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md",
                  formButtonPrimary: "h-12 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 hover:opacity-95 transition-opacity font-bold rounded-xl py-0 text-sm shadow-md flex items-center justify-center text-white border border-blue-400/20",
                  formFieldLabel: "text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5",
                  formFieldInput: "h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-semibold text-base",
                  formFieldErrorText: "text-xs font-bold text-rose-500 mt-1",
                  socialButtonsBlockButton: "h-12 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold flex items-center justify-center gap-2",
                  socialButtonsBlockButtonText: "font-bold text-slate-700 dark:text-slate-300 text-xs",
                },
              }}
            />
            </ClerkLoaded>
          </div>
        </div>
      </main>

      {/* Website Footer (Desktop Only) */}
      <footer className="hidden lg:flex glass-panel w-full justify-between items-center px-12 py-4 border-t border-slate-200/80 bg-white/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
          </div>
          <div className="text-sm font-black text-slate-900 flex items-center gap-1">
            <span className="text-[#0059bb]">XP</span> English
            <span className="text-amber-500 font-normal">|</span>
            <span className="text-amber-500">XP Voca</span>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link
            className="text-xs text-slate-600 hover:text-[#0059bb] font-bold transition-colors"
            href="/about"
          >
            Giới thiệu
          </Link>
          <Link
            className="text-xs text-slate-600 hover:text-[#0059bb] font-bold transition-colors"
            href="/methodology"
          >
            Phương pháp
          </Link>
          <Link
            className="text-xs text-slate-600 hover:text-[#0059bb] font-bold transition-colors"
            href="/privacy"
          >
            Bảo mật
          </Link>
          <Link
            className="text-xs text-slate-600 hover:text-[#0059bb] font-bold transition-colors"
            href="/support"
          >
            Hỗ trợ
          </Link>
        </nav>
        <div className="text-xs text-slate-500 font-semibold">
          © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
        </div>
      </footer>

      {/* Sticky Mobile App-style Footer Bottom Bar (Mobile Only - Cases 7 & 9) */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 w-full border-t border-slate-200/80 bg-white/98 backdrop-blur-md pt-3.5 pb-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-center z-30 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <p className="text-xs sm:text-sm font-semibold text-slate-600">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline py-1 px-1.5 inline-block">
            Đăng nhập.
          </Link>
        </p>
      </div>
    </div>
  );
}
