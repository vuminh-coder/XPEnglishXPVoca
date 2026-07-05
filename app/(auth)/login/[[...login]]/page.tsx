"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { motion } from "framer-motion";
import styles from "./Login.module.css";
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
  AlertTriangle,
} from "lucide-react";

// Evaluated once outside render for optimization
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

export default function LoginPage() {
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
    <div className={styles.pageContainer} suppressHydrationWarning>
      {/* Film-grain texture background */}
      <div className={styles.noiseOverlay} />

      {/* Floating Background Blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* Main Content */}
      <main className="flex-grow min-h-0 flex items-center justify-center p-4 sm:p-6 md:p-12 lg:py-8 w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          {/* Left Column: Branding & Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="flex flex-col gap-5 lg:gap-8 max-w-xl"
          >
            {/* Brand Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-11 rounded-xl bg-gradient-brand flex items-center bg-blue-700 justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Rocket className="text-white w-5 h-5 fill-white/20 bg-blue-700" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                XP English | XP Voca
              </h1>
            </div>

            {/* Hero Text */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight font-display">
                Chào mừng bạn quay lại! 👋
                <br />
                <span className="text-[#0059bb] dark:text-[#4ec5f1] font-extrabold">
                  Học mỗi ngày
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                Tiếp tục hành trình chinh phục tiếng Anh với phương pháp học tập
                kết hợp trò chơi đầy thú vị và hiệu quả.
              </p>
            </div>

            {/* Features Grid - Staggered Slide In */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.1,
                }}
                className={styles.featureCard}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 dark:text-white font-bold">
                    145 Chủ đề
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Từ vựng phong phú
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.15,
                }}
                className={styles.featureCard}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-600/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 dark:text-white font-bold">
                    Gamification
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Học như chơi
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                }}
                className={styles.featureCard}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-600/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 dark:text-white font-bold">
                    AI Assistant
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Sửa lỗi tức thì
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.25,
                }}
                className={styles.featureCard}
              >
                <div className="w-10 h-10 rounded-lg bg-rose-600/10 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-950 dark:text-white font-bold">
                    Cộng đồng
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Hỗ trợ 24/7
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Login Card with Double-Bezel nested architecture */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.1,
            }}
            className="flex justify-center lg:justify-end w-full"
          >
            <div className={styles.outerBezel}>
              <div className={styles.innerCore}>
                {CLERK_ENABLED ? (
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
                        header: "hidden",
                        socialButtonsBlockButton:
                          "w-full flex items-center justify-center gap-3 bg-white/90 border border-slate-200/80 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm",
                        formButtonPrimary:
                          "w-full mt-3 bg-gradient-premium text-white py-3 rounded-xl font-bold text-xs tracking-wide shadow-glow",
                        formFieldInput:
                          "w-full bg-white/90 border border-slate-200/80 rounded-xl py-2 px-3 text-sm focus:border-purple-500 focus:ring-0 transition-colors",
                        footerActionLink:
                          "text-purple-600 hover:text-purple-700 font-bold ml-1",
                        dividerRow: "my-4",
                        footer:
                          "bg-transparent shadow-none border-none p-0 mt-3",
                      },
                    }}
                  />
                ) : (
                  /* Fallback Local Database Authentication Flow */
                  <div className="w-full">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                        Đăng nhập
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Dùng tài khoản học viên để tiếp tục
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                      >
                        <div className={styles.errorAlert} role="alert">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      </motion.div>
                    )}

                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleLocalSubmit}
                    >
                      {/* Email/Username Input */}
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="email">
                          Email hoặc Tên tài khoản
                        </label>
                        <div className={styles.inputWrapper}>
                          <div className={styles.inputIcon}>
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            className={styles.inputField}
                            id="email"
                            placeholder="Nhập email hoặc tên tài khoản"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-required="true"
                            aria-invalid={!!error}
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className={styles.inputGroup}>
                        <div className="flex justify-between items-center px-1">
                          <label
                            className={styles.inputLabel}
                            htmlFor="password"
                          >
                            Mật khẩu
                          </label>
                          <Link
                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors"
                            href="/forgot-password"
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                        <div className={styles.inputWrapper}>
                          <div className={styles.inputIcon}>
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            className={`${styles.inputField} pr-10`}
                            id="password"
                            placeholder="Nhập mật khẩu"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-required="true"
                            aria-invalid={!!error}
                          />
                          <button
                            type="button"
                            className="absolute right-3 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                            }
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
                      <motion.button
                        whileHover={{ scale: 1.01, translateY: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="w-full mt-2 bg-gradient-premium text-white text-xs py-3 rounded-xl transition-all duration-200 font-bold shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none"
                        type="submit"
                      >
                        Đăng nhập
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </form>

                    {/* Divider */}
                    <div className={styles.divider}>
                      <div className={styles.dividerLine} />
                      <span className={styles.dividerText}>Hoặc</span>
                      <div className={styles.dividerLine} />
                    </div>

                    {/* Social Login */}
                    <motion.button
                      whileHover={{ scale: 1.01, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className={styles.googleButton}
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
                      <span className="text-xs text-slate-700 dark:text-slate-200 font-bold">
                        Dùng thử nhanh qua Google
                      </span>
                    </motion.button>

                    {/* Sign up link */}
                    <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
                      Chưa có tài khoản?
                      <Link
                        className="text-purple-600 dark:text-purple-400 font-bold hover:underline ml-1"
                        href="/register"
                      >
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Scoped and Optimized Footer Component */}
      <footer className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <Rocket className="text-blue-600 dark:text-blue-400 w-4 h-4 fill-blue-600/10" />
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            XP Voca
          </div>
        </div>
        <nav className={styles.footerNav} aria-label="Footer Navigation">
          <Link className={styles.footerLink} href="/about">
            About
          </Link>
          <Link className={styles.footerLink} href="/methodology">
            Methodology
          </Link>
          <Link className={styles.footerLink} href="/privacy">
            Privacy
          </Link>
          <Link className={styles.footerLink} href="/support">
            Support
          </Link>
        </nav>
        <div className={styles.footerCopyright}>
          © 2026 XP Voca. Keep climbing.
        </div>
      </footer>
    </div>
  );
}
