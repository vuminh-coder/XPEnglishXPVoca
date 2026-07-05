"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import "./Register.css";
import styles from "./Register.module.css";
import {
  Rocket,
  Gift,
  Gamepad2,
  Bot,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

export default function RegisterPage() {
  const clerkEnabled = checkIsClerkEnabled();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");

  const localLogin = useAuthStore((state) => state.localLogin);
  const router = useRouter();

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (!agreeTerms) {
      setError("Bạn cần đồng ý với các điều khoản dịch vụ.");
      return;
    }
    const username =
      fullName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "user";
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
      {/* Floating Background Blobs */}
      <div className="bg-blob-1 pointer-events-none"></div>
      <div className="bg-blob-2 pointer-events-none"></div>

      {/* Main Content - Giới hạn và ép co giãn vừa vặn trục dọc */}
      <main className="flex-1 min-h-0 flex items-center justify-center p-6 md:p-12 lg:py-4 w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding & Benefits */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6 animate-fade-in-up">
            {/* Premium Branding */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-premium flex items-center justify-center text-white shadow-glow transform hover:scale-105 transition-transform duration-300">
                <Rocket className="w-5 h-5 fill-white/10" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                XP English <span className="text-blue-600 font-normal">|</span>{" "}
                XP Voca
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-slate-900 tracking-tight">
                Bắt đầu hành trình <br />
                <span className="text-[#0059bb]">đỉnh cao ngôn ngữ</span>
              </h2>
              <p className="text-sm md:text-[16px] text-slate-600 max-w-lg leading-relaxed">
                Tham gia cộng đồng hàng ngàn người học tiếng Anh thông qua trải
                nghiệm gamification đầy hứng khởi. Nâng cấp vốn từ vựng của bạn
                ngay hôm nay!
              </p>
            </div>

            {/* Staggered Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-w-xl">
              <div className="benefit-card rounded-xl p-4 flex flex-col gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    Miễn phí trọn đời
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Truy cập không giới hạn kho từ vựng khổng lồ và các bài học
                    cơ bản.
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex flex-col gap-2">
                <div className="w-9 h-9 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    Học như chơi game
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Hệ thống nhiệm vụ, bảng xếp hạng và phần thưởng độc quyền
                    siêu hấp dẫn.
                  </p>
                </div>
              </div>

              <div className="benefit-card rounded-xl p-4 flex flex-col gap-2 md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                      AI trò chuyện
                    </h4>
                    <p className="text-[12px] text-slate-500 leading-relaxed">
                      Luyện tập giao tiếp thực tế với trí tuệ nhân tạo thông
                      minh, phản hồi tức thì.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="lg:col-span-5 w-full mx-auto animate-fade-in-right flex justify-center items-center">
            {clerkEnabled ? (
              <SignUp
                path="/register"
                signInUrl="/login"
                forceRedirectUrl="/dashboard"
                routing="path"
                appearance={{
                  elements: {
                    cardBox: "w-full",
                    card: "w-full shadow-none p-0 border-none bg-transparent",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "w-full flex items-center justify-center gap-2 bg-white/90 border border-slate-200/80 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm",
                    formButtonPrimary:
                      "w-full mt-3 bg-gradient-premium text-white py-3 rounded-xl font-bold text-xs tracking-wide",
                    formFieldInput:
                      "w-full bg-white/90 border border-slate-200/80 rounded-xl py-2 px-3 text-sm focus:ring-0",
                    footerActionLink:
                      "text-blue-600 font-bold hover:underline ml-1",
                    dividerRow: "my-4",
                    footer: "bg-transparent shadow-none border-none p-0 mt-3",
                  },
                }}
              />
            ) : (
              /* Fallback Local Database Registration Flow */
              <div className="w-full">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Tạo tài khoản
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Nhanh chóng &amp; dễ dàng
                  </p>
                </div>

                {error && (
                  <div className="mb-3 p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold text-center transition-all duration-300">
                    {error}
                  </div>
                )}

                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleLocalSubmit}
                >
                  <div className="space-y-1 group">
                    <label
                      className="text-xs text-slate-600 font-bold block pl-1"
                      htmlFor="name"
                    >
                      Họ và tên
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        className="input-premium pl-11"
                        id="name"
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label
                      className="text-xs text-slate-600 font-bold block pl-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        className="input-premium pl-11"
                        id="email"
                        placeholder="bạn@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="type"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label
                      className="text-xs text-slate-600 font-bold block pl-1"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        className="input-premium pl-11"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-1">
                    <input
                      className="mt-[3px] w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      id="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label
                      className="text-[11px] text-slate-500 leading-snug select-none cursor-pointer"
                      htmlFor="terms"
                    >
                      Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo
                      mật.
                    </label>
                  </div>

                  <button
                    className="w-full mt-2 bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-glow flex items-center justify-center gap-2"
                    type="submit"
                  >
                    Đăng ký <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Hoặc
                  </span>
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                </div>

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
                    Đăng ký nhanh qua Google
                  </span>
                </button>

                <div className="text-center mt-4">
                  <p className="text-xs text-slate-500">
                    Đã có tài khoản?
                    <Link
                      className="text-blue-600 font-bold hover:text-blue-700 ml-1"
                      href="/login"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Component - Thu nhỏ nhẹ padding dọc */}
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
