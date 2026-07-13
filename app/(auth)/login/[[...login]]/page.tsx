"use client";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import "./Login.css";
import { Rocket, BookOpen, Gamepad2, Bot, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden text-slate-800 flex flex-col justify-between bg-[#f0f4f8] relative w-full overflow-x-hidden font-sans antialiased"
      suppressHydrationWarning
    >
      {/* Floating Background Blobs */}
      <div className="bg-blob-1 pointer-events-none"></div>
      <div className="bg-blob-2 pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex items-center justify-center p-0 md:p-12 lg:py-4 w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding & Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-4 lg:gap-6 animate-fade-in-up text-center lg:text-left px-6 lg:px-0">
            {/* Brand Header */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 w-full">
              <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-gradient-premium flex items-center justify-center text-white shadow-glow transform hover:scale-105 transition-transform duration-300">
                <Rocket className="w-4 h-4 lg:w-5 lg:h-5 fill-white/10" />
              </div>
              <h1 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight">
                XP English <span className="text-blue-600 font-normal">|</span>{" "}
                XP Voca
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-1 lg:space-y-2">
              <h2 className="text-xl lg:text-5xl font-black leading-[1.1] text-slate-900 tracking-tight">
                <span className="lg:hidden">Chào mừng quay lại! 👋</span>
                <span className="hidden lg:inline">
                  Chào mừng bạn quay lại! 👋
                  <br />
                  <span className="text-[#0059bb]">Học mỗi ngày</span>
                </span>
              </h2>
              <p className="hidden lg:block text-sm md:text-[16px] text-slate-650 max-w-lg leading-relaxed font-semibold">
                Tiếp tục hành trình chinh phục tiếng Anh với phương pháp học tập
                kết hợp trò chơi đầy thú vị và hiệu quả.
              </p>
            </div>

            {/* Features Grid - Staggered Slide In */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-w-xl">
              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    145 Chủ đề
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Từ vựng phong phú
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    Gamification
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Học như chơi
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-600/10 flex items-center justify-center text-cyan-600 shadow-sm shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    AI Assistant
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Sửa lỗi tức thì
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-600/10 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    Cộng đồng
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Hỗ trợ 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="lg:col-span-5 w-full mx-auto animate-fade-in-right flex justify-center items-center px-4 lg:px-0">
            <SignIn
              path="/login"
              signInUrl="/login"
              signUpUrl="/register"
              forceRedirectUrl="/dashboard"
              routing="path"
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
                  card: "shadow-2xl border border-slate-200/50 rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md",
                  formButtonPrimary: "bg-gradient-to-r from-sky-400 to-indigo-500 hover:opacity-95 transition-opacity font-bold rounded-xl py-2.5",
                  formFieldInput: "rounded-xl border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all",
                  socialButtonsBlockButton: "border-slate-200 rounded-xl hover:bg-slate-50 transition-colors",
                },
              }}
            />
          </div>
        </div>
      </main>

      {/* Scoped and Optimized Footer Component */}
      <footer className="glass-panel w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-4 border-t border-white/40 mt-auto z-10">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Rocket className="text-blue-600 w-4 h-4 fill-blue-600/10" />
          <div className="text-sm font-bold text-slate-900">XP Voca</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 mb-2 md:mb-0">
          <Link
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
            href="/methodology"
          >
            Methodology
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
            href="/support"
          >
            Support
          </Link>
        </nav>
        <div className="text-[11px] text-slate-400 font-medium">
          © 2026 XP Voca. Keep climbing.
        </div>
      </footer>
    </div>
  );
}
