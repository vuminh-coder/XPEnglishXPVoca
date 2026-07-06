"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ForgotPassword.module.css";
import { Mail, ArrowLeft, CheckCircle2, Rocket, ArrowRight, Lock, KeyRound, AlertTriangle } from "lucide-react";

// Check if Clerk is enabled
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

const CLERK_ENABLED = checkIsClerkEnabled();

function ClerkForgotPassword() {
  const { signIn } = useSignIn();
  const { setActive } = useClerk();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter Code, 3 = Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    setLoading(true);

    try {
      if (!signIn) {
        setError("Clerk chưa được khởi tạo.");
        return;
      }

      const resCreate = await signIn.create({
        identifier: email,
      });
      if (resCreate.error) {
        setError(resCreate.error.message || "Không thể tìm thấy tài khoản với email này.");
        return;
      }

      const resSend = await signIn.resetPasswordEmailCode.sendCode();
      if (resSend.error) {
        setError(resSend.error.message || "Không thể gửi mã xác nhận.");
        return;
      }

      setStep(2);
    } catch (err: any) {
      console.error("Clerk reset password request error:", err);
      setError(err.message || "Không thể gửi mã khôi phục. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !newPassword) return;
    setError("");
    setLoading(true);

    try {
      if (!signIn || !setActive) {
        setError("Clerk chưa được khởi tạo.");
        return;
      }

      const resVerify = await signIn.resetPasswordEmailCode.verifyCode({
        code: code,
      });
      if (resVerify.error) {
        setError(resVerify.error.message || "Mã xác thực không hợp lệ.");
        return;
      }

      const resSubmit = await signIn.resetPasswordEmailCode.submitPassword({
        password: newPassword,
      });
      if (resSubmit.error) {
        setError(resSubmit.error.message || "Không thể đặt lại mật khẩu mới.");
        return;
      }

      if (signIn.status === "complete" && signIn.createdSessionId) {
        await setActive({ session: signIn.createdSessionId });
        setStep(3);
      } else {
        setError("Mã xác thực không hợp lệ hoặc đã hết hạn.");
      }
    } catch (err: any) {
      console.error("Clerk reset password submit error:", err);
      setError(err.message || "Không thể đặt lại mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.innerCore}>
      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold text-center transition-all duration-300">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          /* Step 1: Request Reset Form Screen */
          <motion.div
            key="reset-request"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                Quên mật khẩu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu cho bạn.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSendCode}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="email">
                  Email của bạn
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-required="true"
                    disabled={loading}
                    className={styles.inputField}
                    placeholder="nhập@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Gửi email khôi phục"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </form>

            <div className="text-center mt-4">
              <Link href="/login" className={styles.backLink}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại Đăng nhập
              </Link>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          /* Step 2: Enter Verification Code & Password Form Screen */
          <motion.div
            key="reset-verify"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                Xác nhận mật khẩu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Nhập mã xác thực vừa được gửi tới <strong className="text-slate-800 dark:text-slate-100">{email}</strong> và mật khẩu mới của bạn.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="code">
                  Mã xác thực
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="code"
                    type="text"
                    required
                    aria-required="true"
                    disabled={loading}
                    className={styles.inputField}
                    placeholder="Nhập mã 6 chữ số"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="new-password">
                  Mật khẩu mới
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="new-password"
                    type="password"
                    required
                    aria-required="true"
                    disabled={loading}
                    className={styles.inputField}
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </form>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={styles.backLink}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại nhập Email
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          /* Step 3: Success Screen */
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.successIconContainer}>
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className={styles.successTitle}>Đặt lại thành công!</h2>
            <p className={styles.successDescription}>
              Mật khẩu của bạn đã được cập nhật thành công. Bạn đã đăng nhập và có thể tiếp tục hành trình học tập.
            </p>

            <Link href="/dashboard" className="block w-full">
              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                Đi tới Bảng điều khiển
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocalForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className={styles.innerCore}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="reset-request"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                Quên mật khẩu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu cho bạn.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="email">
                  Email của bạn
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-required="true"
                    className={styles.inputField}
                    placeholder="nhập@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                type="submit"
                className="w-full mt-2 bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                Gửi email khôi phục
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </form>

            <div className="text-center mt-4">
              <Link href="/login" className={styles.backLink}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại Đăng nhập
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.successIconContainer}>
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className={styles.successTitle}>Đã gửi hướng dẫn!</h2>
            <p className={styles.successDescription}>
              Chúng tôi đã gửi email khôi phục mật khẩu đến <strong className="text-slate-900 dark:text-white">{email}</strong>. Hãy kiểm tra hộp thư đến hoặc mục thư rác của bạn.
            </p>

            <Link href="/login" className="block w-full">
              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full bg-gradient-premium text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại Đăng nhập
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className={styles.pageContainer} suppressHydrationWarning>
      {/* Film-grain overlay */}
      <div className={styles.noiseOverlay} />

      {/* Background Blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* Main Content container */}
      <main className="flex-grow min-h-0 flex items-center justify-center p-4 sm:p-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className={styles.outerBezel}
        >
          {CLERK_ENABLED ? <ClerkForgotPassword /> : <LocalForgotPassword />}
        </motion.div>
      </main>

      {/* Scoped and Optimized Footer Component */}
      <footer className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <Rocket className="text-blue-600 dark:text-blue-400 w-4 h-4 fill-blue-600/10" />
          <div className="text-sm font-bold text-slate-900 dark:text-white">XP Voca</div>
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