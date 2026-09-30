"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronDown, Check } from "lucide-react";
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
      {/* Left: 100% 7-day Money-back Guarantee Card (5/12) */}
      <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Cam Kết Hoàn Tiền 100% Trong 7 Ngày
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Nếu bạn trải nghiệm gói Pro trong 7 ngày đầu tiên mà không hoàn toàn hài lòng, bạn sẽ nhận lại 100% học phí nhanh chóng.
          </p>

          <div className="space-y-2 pt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
              <span>Không thủ tục phức tạp, phản hồi nhanh chóng</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
              <span>Chuyển khoản trực tiếp về tài khoản ngân hàng của bạn</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
              <span>Bảo lưu vĩnh viễn toàn bộ từ vựng và tiến độ học tập</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          An tâm trải nghiệm 100% không rủi ro
        </div>
      </div>

      {/* Right: FAQ Accordions (7/12) */}
      <div className="lg:col-span-7 space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-2">
          Câu Hỏi Thường Gặp
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
                className="w-full py-3 px-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors cursor-pointer select-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 stroke-[2.2] ${
                    isOpen ? "rotate-180 text-[#0059bb] dark:text-sky-400" : ""
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
                    className="px-4 pb-3.5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800"
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
