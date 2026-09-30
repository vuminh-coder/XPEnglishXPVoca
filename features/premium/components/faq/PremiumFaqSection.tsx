"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle, ChevronDown, Check, HelpCircle } from "lucide-react";
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
    <div className="space-y-6 pt-2">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-bold uppercase tracking-wider">
          <HelpCircle className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
          <span>Giải Đáp Thắc Mắc</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Câu Hỏi Thường Gặp & Cam Kết Quyền Lợi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Mọi thắc mắc được giải đáp minh bạch để bạn hoàn toàn an tâm trải nghiệm
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Guarantee Card (5/12) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              Cam Kết Hoàn Tiền 100% Trong 7 Ngày
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Chúng tôi cam kết chất lượng tuyệt đối. Nếu bạn trải nghiệm gói PRO trong 7 ngày đầu tiên mà không cảm thấy hài lòng, hãy thông báo để nhận lại 100% học phí nhanh chóng.
            </p>
          </div>

          {/* 3 Trust Assurance Items */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-medium">Không yêu cầu điều kiện phức tạp hay thủ tục rườm rà</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-medium">Hoàn về đúng tài khoản ngân hàng bạn đã chuyển khoản</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-medium">Bảo lưu vĩnh viễn tiến độ học tập và vốn từ đã tích lũy</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4 stroke-[2.2]" />
            <span>Bảo hiểm quyền lợi học viên an tâm 100%</span>
          </div>
        </div>

        {/* Right FAQ Accordion (7/12) */}
        <div className="lg:col-span-7 space-y-2.5">
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
                  className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors cursor-pointer select-none"
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
                      className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80"
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
    </div>
  );
}
