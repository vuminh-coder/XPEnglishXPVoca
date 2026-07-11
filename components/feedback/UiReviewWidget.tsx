"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, X, Sparkles, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { useNotificationStore } from "@/lib/store/notificationStore";

interface CritiqueResult {
  score: string;
  summary: string;
  pros: string[];
  cons: string[];
  recommendations: string[];
}

export default function UiReviewWidget() {
  const pathname = usePathname();
  const { addToast } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("Bố cục/Layout");
  const [comments, setComments] = useState<string>("");
  
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<CritiqueResult | null>(null);

  // Categories of feedback shown directly (Rule 14: no dropdowns for 2-4 items)
  const categories = ["Bố cục/Layout", "Màu sắc/Visuals", "Tốc độ/Performance", "Tính năng/Features"];

  useEffect(() => {
    // Reset state when route changes
    setCritique(null);
    setComments("");
    setRating(5);
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCritique(null);

    try {
      const res = await fetch("/api/ai/ui-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route: pathname,
          rating,
          category,
          comments,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setCritique(data);
      addToast({
        type: "success",
        title: "Đã gửi đánh giá!",
        message: "Cảm ơn đóng góp của bạn. AI đã phân tích phản hồi UI thành công.",
      });
    } catch (err) {
      console.error(err);
      addToast({
        type: "error",
        title: "Lỗi",
        message: "Không thể phân tích đánh giá UI bằng AI lúc này.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating CTA button on the bottom-right for easy thumb zone reach (Rule 13) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-650 to-violet-650 dark:from-indigo-600 dark:to-violet-600 text-white rounded-full shadow-lg font-black text-xs cursor-pointer select-none transition-all shadow-indigo-500/20"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Đánh giá UI</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-3xl shadow-2xl relative"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-neutral-850 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    🎨
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-800 dark:text-white">Đánh giá & Phân tích Giao diện AI</h2>
                    <p className="text-[10px] text-slate-500 font-semibold italic">Đang đánh giá trang: {pathname}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCritique(null);
                  }}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {!critique && !loading ? (
                  // Form State
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Star Rating Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        Độ hoàn thiện giao diện (Sao)
                      </label>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = hoverRating !== null ? star <= hoverRating : star <= rating;
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  active
                                    ? "text-yellow-450 fill-yellow-450 dark:text-yellow-400 dark:fill-yellow-400"
                                    : "text-slate-300 dark:text-neutral-800"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Category Selection (Direct Pill Choices - Rule 14) */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        Thành phần cần đánh giá
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                          const active = category === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border select-none ${
                                active
                                  ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800 text-indigo-650 dark:text-indigo-400"
                                  : "bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-850 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback Comments Box (Complete Box Border - Rule 15, External Label - Rule 6) */}
                    <div className="space-y-2">
                      <label htmlFor="ui-comments" className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        Nhận xét hoặc phản ánh lỗi giao diện
                      </label>
                      <textarea
                        id="ui-comments"
                        rows={4}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Hãy nêu rõ bố cục bị lệch thế nào, màu sắc hiển thị khó đọc ra sao..."
                        className="w-full p-3.5 text-xs font-bold bg-white dark:bg-neutral-950 text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-850 rounded-2xl focus:ring-1.5 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                      />
                    </div>

                    {/* Submit Buttons (Only 1 primary button - Rule 18, Action verbs - Rule 19) */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-neutral-850">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl font-bold cursor-pointer text-xs px-4"
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-xl font-bold cursor-pointer text-xs px-5 shadow-glow"
                      >
                        Gửi Đánh giá & Phân tích AI
                      </Button>
                    </div>
                  </form>
                ) : loading ? (
                  // Skeleton Loading State (Rule 1)
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-100 dark:bg-neutral-855 rounded-md w-1/3" />
                    <div className="h-20 bg-slate-100 dark:bg-neutral-855 rounded-2xl w-full" />
                    
                    <div className="h-4 bg-slate-100 dark:bg-neutral-855 rounded-md w-1/4 mt-6" />
                    <div className="space-y-2">
                      <div className="h-10 bg-slate-100 dark:bg-neutral-855 rounded-xl w-full" />
                      <div className="h-10 bg-slate-100 dark:bg-neutral-855 rounded-xl w-full" />
                      <div className="h-10 bg-slate-100 dark:bg-neutral-855 rounded-xl w-full" />
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-bold mt-4">
                      Companion AI đang đánh giá bố cục, màu sắc và áp dụng 19 luật UI/UX để đề xuất cải tiến...
                    </p>
                  </div>
                ) : (
                  // Critique Result Screen (Visual hierarchy & metrics - Rule 8/10)
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5"
                  >
                    {/* Score Card */}
                    <div className="p-5 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/5 dark:to-violet-500/5 rounded-3xl border border-indigo-100/50 dark:border-indigo-950/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">Điểm UI/UX ước tính</span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-350 leading-relaxed mt-0.5">{critique?.summary}</p>
                      </div>
                      <div className="text-4xl font-black text-indigo-650 dark:text-indigo-400 ml-4 font-display shrink-0">
                        {critique?.score}
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="space-y-4">
                      {/* Pros */}
                      {critique?.pros && critique.pros.length > 0 && (
                        <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-2xl">
                          <div className="px-4 py-2.5 bg-emerald-500/10 dark:from-emerald-500/5 border-b border-slate-100 dark:border-neutral-850 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <h3 className="text-xs font-black text-slate-800 dark:text-white">Điểm cộng Giao diện</h3>
                          </div>
                          <div className="p-4 space-y-2">
                            {critique.pros.map((pro, i) => (
                              <div key={i} className="flex gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                                <span className="text-emerald-500 font-bold">•</span>
                                <p>{pro}</p>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}

                      {/* Cons */}
                      {critique?.cons && critique.cons.length > 0 && (
                        <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-2xl">
                          <div className="px-4 py-2.5 bg-rose-500/10 dark:from-rose-500/5 border-b border-slate-100 dark:border-neutral-850 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                            <h3 className="text-xs font-black text-slate-800 dark:text-white">Điểm trừ / Điểm cần sửa</h3>
                          </div>
                          <div className="p-4 space-y-2">
                            {critique.cons.map((con, i) => (
                              <div key={i} className="flex gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400 leading-relaxed">
                                <span>❌</span>
                                <p>{con}</p>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}

                      {/* Recommendations */}
                      {critique?.recommendations && critique.recommendations.length > 0 && (
                        <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-2xl">
                          <div className="px-4 py-2.5 bg-amber-500/10 dark:from-amber-500/5 border-b border-slate-100 dark:border-neutral-850 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <h3 className="text-xs font-black text-slate-800 dark:text-white">Khuyến nghị Cải thiện (19 UX rules)</h3>
                          </div>
                          <div className="p-4 space-y-2">
                            {critique.recommendations.map((rec, i) => (
                              <div key={i} className="flex gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 leading-relaxed">
                                <span className="text-amber-500">💡</span>
                                <p>{rec}</p>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-neutral-850">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCritique(null)}
                        className="flex-1 rounded-xl font-bold cursor-pointer text-xs"
                      >
                        Đánh giá Lại / Viết tiếp
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          setIsOpen(false);
                          setCritique(null);
                        }}
                        className="flex-1 rounded-xl font-bold cursor-pointer text-xs shadow-glow"
                      >
                        Hoàn tất
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
