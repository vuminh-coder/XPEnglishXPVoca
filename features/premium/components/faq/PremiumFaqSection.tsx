"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, ChevronDown, Check } from "lucide-react";
import { FAQS } from "../../constants";

export interface PremiumFaqSectionProps {
  openFaqIdx: number | null;
  onToggleFaq: (idx: number) => void;
}

export function PremiumFaqSection({
  openFaqIdx,
  onToggleFaq,
}: PremiumFaqSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 pt-1">
      {/* Left Guarantee Card (5/12) - Clean white card with refined Emerald assurance accents */}
      <div className="lg:col-span-5 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3">
        <div className="space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
            <Shield className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Cam Kết Hoàn Tiền 100% Trong 7 Ngày
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Chúng tôi cam kết chất lượng tuyệt đối. Nếu bạn trải nghiệm gói Pro trong 7 ngày đầu tiên mà không cảm thấy hài lòng, hãy thông báo để nhận lại 100% học phí nhanh chóng.
          </p>

          {/* 3 Trust Assurance Items */}
          <div className="pt-1 space-y-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>Không yêu cầu điều kiện phức tạp hay thủ tục rườm rà</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>Hoàn về đúng tài khoản ngân hàng bạn đã chuyển khoản</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>Bảo lưu vĩnh viễn tiến độ học tập và vốn từ đã tích lũy</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-4 h-4 stroke-[2.2]" />
          <span>Bảo hiểm quyền lợi học viên an tâm 100%</span>
        </div>
      </div>

      {/* Right FAQ Accordion (7/12) */}
      <div className="lg:col-span-7 space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mb-2">
          Giải Đáp Thắc Mắc Thường Gặp (FAQ)
        </h3>

        {FAQS.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => onToggleFaq(idx)}
                className="w-full py-2.5 px-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] transition-colors cursor-pointer select-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 stroke-[2.2] ${
                    isOpen ? "rotate-180 text-[#0059bb]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="px-3.5 pb-3 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
