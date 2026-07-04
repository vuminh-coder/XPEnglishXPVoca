"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import "./Login.css";
import {
  Rocket,
  BookOpen,
  Gamepad2,
  Bot,
  Users,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

export default function LoginPage() {
  const clerkEnabled = checkIsClerkEnabled();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const localLogin = useAuthStore((state) => state.localLogin);
  const router = useRouter();

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    const username = email.includes("@") ? email.split("@")[0] : email;
    localLogin(username, email);
    router.push("/dashboard");
  };

  const handleGoogleMock = () => {
    localLogin("google_user", "google.user@xpenglish.com");
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden text-slate-800 flex flex-col justify-between bg-[#f0f4f8] relative w-full font-sans antialiased"
      suppressHydrationWarning
    >
      {/* Background Blobs */}
      <div className="bg-blob-1 pointer-events-none"></div>
      <div className="bg-blob-2 pointer-events-none"></div>

      {/* Main Content - Ép co giãn vừa vặn trục dọc */}
      <main className="flex-grow min-h-0 flex items-center justify-center p-6 md:p-12 lg:py-4 w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left Column: Branding & Content */}
          <div className="flex flex-col gap-4 lg:gap-6 animate-slide-in-left max-w-xl">
            {/* Brand Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-11 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Rocket className="text-white w-5 h-5 fill-white/20" />
              </div>
              <h1 className="text-[24px] font-black text-slate-900 tracking-tight">
                XP English | XP Voca
              </h1>
            </div>

            {/* Hero Text */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Chào mừng bạn quay lại! 👋
                <br />
                <span className="text-[#0059bb] font-bold">Học mỗi ngày</span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-md leading-relaxed">
                Tiếp tục hành trình chinh phục tiếng Anh với phương pháp học tập
                kết hợp trò chơi đầy thú vị và hiệu quả.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="glass-panel rounded-xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300 shadow-glass">
                <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 font-bold">
                    145 Chủ đề
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Từ vựng phong phú
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300 shadow-glass">
                <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 font-bold">
                    Gamification
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Học như chơi
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300 shadow-glass">
                <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center text-cyan-600 shadow-sm shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 font-bold">
                    AI Assistant
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Sửa lỗi tức thì
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300 shadow-glass">
                <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 font-bold">
                    Cộng đồng
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Hỗ trợ 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="animate-slide-in-right flex justify-center lg:justify-end w-full">
            {clerkEnabled ? (
              <SignIn
                path="/login"
                signInUrl="/login"
                signUpUrl="/register"
                forceRedirectUrl="/dashboard"
                routing="path"
                appearance={{
                  elements: {
                    cardBox: "w-full",
                    card: "w-full shadow-none p-0 border-none bg-transparent",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "w-full flex items-center justify-center gap-3 bg-white/90 border border-slate-200/80 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm",
                    formButtonPrimary:
                      "w-full mt-3 bg-gradient-premium text-white py-3 rounded-xl font-bold text-xs tracking-wide shadow-glow",
                    formFieldInput:
                      "w-full bg-white/90 border border-slate-200/80 rounded-xl py-2 px-3 text-sm focus:border-purple-500 focus:ring-0 transition-colors",
                    footerActionLink:
                      "text-purple-600 hover:text-purple-700 font-bold ml-1",
                    dividerRow: "my-4",
                    footer: "bg-transparent shadow-none border-none p-0 mt-3",
                  },
                }}
              />
            ) : (
              /* Fallback Local Database Authentication Flow */
              <div className="w-full">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Đăng nhập
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Dùng tài khoản học viên để tiếp tục
                  </p>
                </div>

                {error && (
                  <div className="mb-3 p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold text-center transition-all duration-300">
                    {error}
                  </div>
                )}

                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleLocalSubmit}
                >
                  {/* Email/Username Input */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-bold text-slate-600 ml-1"
                      htmlFor="email"
                    >
                      Email hoặc Tên tài khoản
                    </label>
                    <div className="relative flex items-center bg-white/90 border border-slate-200/80 rounded-xl transition-all duration-200 input-focus-ring shadow-sm">
                      <div className="pl-4 text-slate-400 flex items-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-800 py-2.5 px-3 placeholder:text-slate-400 rounded-r-xl"
                        id="email"
                        placeholder="Nhập email hoặc tên tài khoản"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center ml-1">
                      <label
                        className="text-xs font-bold text-slate-600"
                        htmlFor="password"
                      >
                        Mật khẩu
                      </label>
                      <Link
                        className="text-xs text-purple-600 hover:text-purple-700 font-bold"
                        href="/forgot-password"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className="relative flex items-center bg-white/90 border border-slate-200/80 rounded-xl transition-all duration-200 input-focus-ring shadow-sm">
                      <div className="pl-4 text-slate-400 flex items-center">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-800 py-2.5 px-3 placeholder:text-slate-400 rounded-r-xl pr-10"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 text-slate-400 hover:text-purple-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full mt-1 bg-gradient-premium text-white text-xs py-3 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-bold shadow-glow flex items-center justify-center gap-2"
                    type="submit"
                  >
                    Đăng nhập
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Hoặc
                  </span>
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                </div>

                {/* Social Login */}
                <button
                  className="w-full flex items-center justify-center gap-2 bg-white/90 border border-slate-200/80 py-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm"
                  type="button"
                  onClick={handleGoogleMock}
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-xs text-slate-700 font-bold">
                    Dùng thử nhanh qua Google
                  </span>
                </button>

                {/* Sign up link */}
                <p className="mt-4 text-center text-xs text-slate-500">
                  Chưa có tài khoản?
                  <Link
                    className="text-purple-600 font-bold hover:underline ml-1"
                    href="/register"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Added Fixed Footer Component */}
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
          © 2024 XP Voca. Keep climbing.
        </div>
      </footer>
    </div>
  );
}
