"use client";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import "./Login.css";
import { Rocket, BookOpen, Gamepad2, Bot, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden text-slate-800 flex flex-col justify-between bg-[#f0f4f8] relative w-full font-sans antialiased"
      suppressHydrationWarning
    >
      {/* Floating Background Blobs */}
      <div className="bg-blob-1 pointer-events-none"></div>
      <div className="bg-blob-2 pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex items-center justify-center p-6 md:p-12 lg:py-4 w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding & Content */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6 animate-fade-in-up">
            {/* Brand Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 bg-blue-700 h-11 rounded-xl bg-gradient-premium flex items-center justify-center text-white shadow-glow transform hover:scale-105 transition-transform duration-300">
                <Rocket className="w-5 h-5 fill-white/10" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                XP English <span className="text-blue-600 font-normal">|</span>{" "}
                XP Voca
              </h1>
            </div>

            {/* Hero Text */}
            <div className="hidden lg:block space-y-2">
              <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-slate-900 tracking-tight">
                Chào mừng bạn quay lại! 👋
                <br />
                <span className="text-[#0059bb]">Học mỗi ngày</span>
              </h2>
              <p className="text-sm md:text-[16px] text-slate-600 max-w-lg leading-relaxed">
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
          <div className="lg:col-span-5 w-full mx-auto animate-fade-in-right flex justify-center items-center">
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
                  borderRadius: "0.5rem",
                },
                elements: {
                  cardBox: "mx-auto w-full",
                },
              }}
            />
          </div>
        </div>
      </main>

      {/* Scoped and Optimized Footer Component */}
      <footer className="glass-panel w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-4 border-t border-white/40 mt-auto z-10">
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
