"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ForgotPassword.module.css";
import { Mail, ArrowLeft, CheckCircle2, Rocket, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock reset email submission
    setSubmitted(true);
  };

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
          <div className={styles.innerCore}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                /* 1. Request Reset Form Screen */
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
                /* 2. Reset Email Sent Success Screen */
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